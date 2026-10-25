# FRIDAY event projection v1 — draft

This directory contains a **proposal**, not a deployed endpoint, user grant or finalized cross-app protocol.

- [JSON Schema](event-v1.draft.schema.json)
- [Sanitized example](event-v1.synthetic-example.json)

## Draft contract checks

```sh
npm ci
npm test
```

The repository test suite compiles this Draft 2020-12 schema with Ajv and
full RFC 3339 format checks. Synthetic fixtures cover timed/all-day records,
missing and forbidden fields, DST calendar boundaries, invalid instants,
duplicate revisions and cancellation. Cross-field checks also reject unknown
IANA zones, an ID with the wrong source prefix, and reversed time intervals.
The suite runs in GitHub Actions when contracts/tests change.

**These are coordination tests, not deployed producer/consumer validation.**
The current JSON Schema cannot alone enforce cross-field date ordering, device
grants, title sensitivity, recurrence identity or revocation. Each producer
and consumer must implement equivalent checks before an integration ships.

## Semantics under review

- **Producer:** BallerWatch or Kept remains the source of truth. FRIDAY stores at most reconstructible, consented projections and grants when a service is separately authorized.
- **ID:** `source:id` is stable and opaque; never encode names, household IDs or tokens. `revision` supports idempotent updates, not necessarily lexical ordering between different producers.
- **Time:** `timed` uses RFC 3339 instants and IANA source zone; `all-day` uses calendar dates with exclusive end. The adapter validates that end is later than start. Recurring instances require distinct stable occurrence IDs.
- **Cancellation:** send a stable-ID record with `status=cancelled`, retaining only safe fields for a bounded tombstone interval. Deletion TTL and grant revocation are still to be decided.
- **Visibility:** `visibility` describes sensitivity, **not authentication**. An authorized-profile item must never be returned without external scope/profile authorization.
- **Details:** `detailsRef` is a token-free opaque reference, resolved by the owning app only after user authorization. No bearer URL or secret calendar subscription link in JSON.
- **Display:** optional labels must be verified and safe for the intended profile. Unknown fields are rejected here to force review; backward-compatible additive extensions need a deliberate version plan.
- **Fallback:** do not replace existing BallerWatch/Vela ICS or Kept local behavior. If FRIDAY is unavailable, reuse direct subscriptions/local last-good state with bounded staleness.

## Review gates before adoption

1. Approve consent, identity/provider, visibility scopes, grant TTL and revocation behavior.
2. Complete **app-level** producer/consumer fixtures for DST boundaries, all-day and recurrence, cancellation, duplicates and stale updates. Repository-only synthetic contract tests are present.
3. Implement schema and semantic validation on both sides; this synthetic test suite alone is **not** full compatibility testing.
4. Complete privacy threat model and compare against existing ICS output. No cross-app writes in v1.
5. Deploy only behind each owning repository's independent release workflow and user-approved rollout.

Track review in [FRIDAY issue #1](https://github.com/vudh1/friday/issues/1).
