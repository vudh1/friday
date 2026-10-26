# FRIDAY integration register

**Checkpoint:** 2026-10-25. This public, intentionally non-sensitive inventory
describes ownership and evidence; it is **not** a live service catalog. Recheck
the owning repository, workflows and real devices before interpreting status.

Status terms: **proposed** (design only), **implemented** (source exists),
**tested** (named automated/local checks), **deployed** (live endpoint or
published artifact evidenced), and **device-verified** (owner observed actual
operation on supported hardware). These milestones are independent.

| Connection | Producer → consumer | Contract/source owner | Status and evidence | Fallback / revocation |
| --- | --- | --- | --- | --- |
| Current sports ICS | BallerWatch → Vela TV | [BallerWatch iCal formatter](https://github.com/vudh1/ballerwatch/blob/main/backend/shared/ical-feed.mjs); [Vela Calendar](https://github.com/vudh1/velatv) | **Existing path** documented in both apps; not certified on the owner's installed TV at this checkpoint | Direct query-based `.ics`; user updates saved URL when selections change; existing Vela cache behavior |
| Stable accountless sports ICS | BallerWatch → one Vela display profile | [BallerWatch calendar profile v1](https://github.com/vudh1/ballerwatch/blob/main/docs/wiki/Calendar-Profile-Contract.md); [FRIDAY #12](https://github.com/vudh1/friday/issues/12) | Source implementation and tests recorded; producer optional API remains **disabled without dedicated D1/key configuration**; no live profile/device acceptance | Legacy `.ics` unchanged; rotating/deleting token invalidates old subscription; Vela must drop revoked cached data |
| Minimal maintenance reminders | Unlocked Kept browser → selected Vela profile | [Kept consent ADR](DECISIONS/0001-kept-reminder-consent.md); [FRIDAY #3](https://github.com/vudh1/friday/issues/3) | Local minimal projection helper **implemented/tested**; publication/grants/TV display **proposed only** | Kept offline/local task list; Vela hides by default; proposed protected cache maximum five minutes from last verified grant |
| Administrator identity for future Kept grants | GitHub OAuth → isolated Kept auth Worker | [Kept draft PR #11](https://github.com/vudh1/kept/pull/11); [FRIDAY #13](https://github.com/vudh1/friday/issues/13) | GitHub sign-in choice approved, local tests passed; draft, no hosted sign-in deployed | Auth fails closed; independent Kept sync; never a TV reader or household-data grant |
| FRIDAY normalized event v1 | BallerWatch/Kept → future authorized consumers | [Draft schema](../contracts/event-v1.draft.schema.json); [FRIDAY #1](https://github.com/vudh1/friday/issues/1) | Synthetic schema tests **passed**; runtime producers/consumer adapter **not deployed** | Direct ICS/local PWA; version mismatch rejects safely |
| Sony phone remote | Vela TV ↔ Vela phone web UI via Vela-owned relay | [Vela remote source](https://github.com/vudh1/velatv); [FRIDAY #5](https://github.com/vudh1/friday/issues/5) | Worker/signing release evidence exists; current source supports two TVs per phone and four paired controllers per TV; **device verification pending** | Native physical remote and TV launcher; no FRIDAY or Kept identity dependency |

## Required metadata when adding a connection

Record the producing owner, consuming owner, data classification, explicit
consent scope, stable IDs, version/schema, time zone and deletion behavior,
failure/offline fallback, cache/revocation bound, credentials **by name only**,
platform limitations, dated CI/deployment/device evidence and rollback owner.
Do not put tokens, household records, real private ICS links, TV addresses,
OAuth client values or any private credential into this repository.

This register is a **first manual snapshot**, not the completed drift monitor
or recovery drill in [FRIDAY #20](https://github.com/vudh1/friday/issues/20).
Update it from verified owner-app evidence after every contract deployment.
