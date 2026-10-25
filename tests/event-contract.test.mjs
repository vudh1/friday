import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schema = JSON.parse(readFileSync(new URL("../contracts/event-v1.draft.schema.json", import.meta.url), "utf8"));
const sample = JSON.parse(readFileSync(new URL("../contracts/event-v1.synthetic-example.json", import.meta.url), "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv, { mode: "full" });
const validate = ajv.compile(schema);
const clone = value => structuredClone(value);

// JSON Schema describes the transport shape; the consumer MUST also enforce
// time interval ordering, source ID consistency, valid IANA zones and grants.
function semanticErrors(event) {
  const errors = [];
  if (event.id && event.source && !event.id.startsWith(event.source + ":")) errors.push("source-qualified ID mismatch");
  try { new Intl.DateTimeFormat("en-US", { timeZone: event.time.timeZone }); }
  catch { errors.push("unknown IANA zone"); }
  if (event.time.kind === "timed" && event.time.endAt &&
      Date.parse(event.time.endAt) <= Date.parse(event.time.startAt)) errors.push("timed end must follow start");
  if (event.time.kind === "all-day" && event.time.endDateExclusive <= event.time.startDate)
    errors.push("all-day end must be exclusive and later");
  return errors;
}

test("synthetic timed event validates under full Draft 2020-12 plus RFC 3339 formats", () => {
  assert.equal(validate(sample), true, JSON.stringify(validate.errors));
  assert.deepEqual(semanticErrors(sample), []);
});

test("opt-in Kept all-day event can use same minimal contract", () => {
  const event = {
    schemaVersion: 1,
    id: "kept:task:123e4567-e89b-42d3-a456-426614174000",
    source: "kept",
    revision: "2026-10-25T10:00:00.000Z|2026-10-31",
    category: "life",
    title: "Replace filter",
    status: "confirmed",
    visibility: "authorized-profile",
    time: { kind: "all-day", startDate: "2026-10-31", endDateExclusive: "2026-11-01", timeZone: "America/Los_Angeles" },
    sourceUpdatedAt: "2026-10-25T10:00:00.000Z"
  };
  assert.equal(validate(event), true, JSON.stringify(validate.errors));
  assert.deepEqual(semanticErrors(event), []);
  assert.deepEqual(Object.keys(event).sort(), schema.required.slice().sort());
});

test("required fields, version, category, and unauthorized extra fields fail closed", () => {
  for (const changed of [
    { ...sample, schemaVersion: 2 },
    { ...sample, category: "shopping" },
    { ...sample, visibility: "all-profiles" },
    { ...sample, title: "" },
    { ...sample, householdShopping: [] },
    { ...sample, time: { ...sample.time, privateCalendarUrl: "https://hidden.invalid" } },
    (() => { const x = clone(sample); delete x.sourceUpdatedAt; return x; })()
  ]) assert.equal(validate(changed), false, JSON.stringify(changed));
});

test("invalid date/time formats are rejected, including a date that does not exist", () => {
  for (const changed of [
    { ...sample, sourceUpdatedAt: "2026-10-25" },
    { ...sample, time: { ...sample.time, startAt: "2026-10-31T20:00:00" } },
    { ...sample, time: { ...sample.time, startAt: "2026-02-30T20:00:00Z" } },
    { ...sample, time: { kind: "all-day", startDate: "2026-02-30", endDateExclusive: "2026-03-01", timeZone: "America/Los_Angeles" } }
  ]) assert.equal(validate(changed), false, JSON.stringify(changed));
});

test("cross-field checks reject inverted durations, unknown zones and ID mismatches", () => {
  const invalid = [
    { ...sample, id: "kept:task:wrong-owner" },
    { ...sample, time: { ...sample.time, endAt: sample.time.startAt } },
    { ...sample, time: { ...sample.time, timeZone: "Bad/Zone" } },
    { ...sample, time: { kind: "all-day", startDate: "2026-11-02", endDateExclusive: "2026-11-01", timeZone: "America/Los_Angeles" } }
  ];
  for (const event of invalid) {
    assert.equal(validate(event), true, JSON.stringify(validate.errors));
    assert.ok(semanticErrors(event).length > 0);
  }
});

test("DST all-day boundaries preserve calendar dates, not fixed 24-hour durations", () => {
  const event = {
    ...sample,
    time: { kind: "all-day", startDate: "2026-03-08", endDateExclusive: "2026-03-09", timeZone: "America/Los_Angeles" }
  };
  assert.equal(validate(event), true, JSON.stringify(validate.errors));
  assert.deepEqual(semanticErrors(event), []);
});

test("cancellation retains stable ID/revision semantics for idempotent consumer handling", () => {
  const cancelled = { ...sample, status: "cancelled", revision: "synthetic-r2" };
  assert.equal(validate(cancelled), true, JSON.stringify(validate.errors));
  assert.equal(cancelled.id, sample.id);
  assert.notEqual(cancelled.revision, sample.revision);
  const unique = new Map([sample, sample, cancelled].map(e => [`${e.id}:${e.revision}`, e]));
  assert.equal(unique.size, 2);
});
