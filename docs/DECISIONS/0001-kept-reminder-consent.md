# ADR 0001 — Minimal Kept reminders for Vela Life (proposed)

**Date:** 2026-10-25  
**Status:** Data-class approval received; authentication, storage, cache/revocation policy and production deployment still under review.  
**Tracking:** [FRIDAY #3](https://github.com/vudh1/friday/issues/3) · [Kept PR #2](https://github.com/vudh1/kept/pull/2) · [event contract v1 draft](../../contracts/README.md)

## Owner decision and strict limits

The owner approved **opt-in server-side sharing of selected, harmless Kept maintenance reminder summaries** with Vela. This is consent to the data class, **not blanket consent for any particular task, TV profile, household member, credential, or service rollout**.

Kept is the sole owner of appliance/task data and completion state. Kept's browser continues to decrypt its own encrypted household state locally. **Neither Vela nor a future FRIDAY service may decrypt or access Kept's GitHub `runtime-state` branch.** The existing `SYNC_TOKEN`, decryption passphrase and Vela remote PIN must never become general ecosystem identity.

Allowlisted projection fields, matching `event-v1` draft:

- `schemaVersion`, opaque Kept task ID, source, stable revision;
- explicitly selected, short, non-sensitive task title;
- `category=life`, scheduled `status`, `visibility=authorized-profile`;
- due date as all-day `startDate` and exclusive `endDateExclusive`, plus IANA time zone;
- source update timestamp.

**Never send:** shopping items, appliance brand/model/room, addresses, receipts, manual URLs, instructions, activity/history, contacts, household data snapshots, private ICS links, passphrases, provider API keys or broad auth tokens. No Vela-to-Kept task completion write in v1. Unsafe titles need clear local preview/edit before permission is granted; source-side regex checks are additional protection, not a substitute for user review.

## Proposed independent flow

1. In an unlocked Kept session, the household owner selects specific tasks and previews their **exact** projected summary. Default is **nothing selected**. This selection is stored in Kept's own state or local settings using its normal update/sync semantics.
2. In a dedicated, reviewed authorization flow, a known household administrator signs in and approves a **named TV installation and named TV profile** for read-only `kept:reminders:read`, with an expiration time. A device-bound asymmetric key and short-lived challenge/QR can prove possession during pairing. A PIN or profile picker alone cannot authorize household data. Choose and test the account/recovery provider **before implementation**; neither passkey/OIDC nor a device association is deployed today.
3. After authorization, the Kept browser builds projections locally and publishes **only selected events** via a separately authenticated Kept-owned interface. It never uploads decrypted state. A small, isolated database holds only grant metadata and rebuildable summaries. D1 on Workers Free is one candidate, **not yet provisioned**.
4. Vela fetches through a grant scoped to **one device + one profile + read-only event summary**, never with Kept's shared sync token. Default Home/screensaver visibility is **off** until independently enabled for that profile. No plaintext task in lock-screen, guest or unselected profile.
5. Kept unselect, task delete, expiry or explicit device revoke stops further reads and deletes associated projections/grants. The TV drops protected in-memory/cache records on profile switch, logout, expiry and revoked response; **never show an offline cached protected summary beyond 5 minutes from last successful authorization** (proposed cap, hardware acceptance pending). Always degrade to normal Vela calendars/launcher.

## Candidate interface (design only)

- `POST /v1/friday/reminders`: Kept-origin authenticated publish of bounded, validated, selected event summaries. Store server-side revision and absolute expiry; idempotent updates only.
- `GET /v1/friday/reminders`: reader bound to a permitted TV-device key/profile and unexpired grant; return only allowlisted fields and `Cache-Control: no-store`.
- `DELETE /v1/friday/grants/{grantId}`: authenticated administrator revocation, remove projection access and queue expiry deletion; use privacy-safe audit events.
- `DELETE /v1/friday/reminders/{eventId}`: owner-side removal/tombstone to revoke a task from projection. Reject unknown schema versions, unregistered devices, expired grants, replayed challenges and mismatched profiles.

These are **not routes that exist**. Names, verbs and grant handshake need security review and implementation in Kept/Vela owner repos, not in the FRIDAY docs repository. No unauthenticated access, bearer credentials in URLs, permissive CORS, brute-forceable numeric pairing without rate limits, or secrets in GitHub Actions logs.

## Data retention, reliability, and cost gates

- Proposed projection TTL: at most **48 hours** after last authorized publish. Grants expire no later than **7 days** without renewal. Revocation is immediate for online reads; offline protected display must stop within the **5-minute cap**. DB cleanup and deletion verification are required.
- Kept is still fully usable offline. No Worker/FRIDAY dependency for local maintenance or shopping. A failed publish displays a clear error and leaves the last-known successful state without claiming a sync succeeded. Vela keeps its existing independent BallerWatch/Google ICS and launcher features.
- Verify provider price/account configuration before provisioning. Cloudflare's [D1 pricing documentation](https://developers.cloudflare.com/d1/platform/pricing/) currently shows a Workers Free tier with quotas and **operations failing at a free-plan limit instead of automatically billing**. Usage must be monitored and writes throttled. The architecture must remain functional on a zero-paid-services budget.
- No new resource, billing plan, cross-product service or secret has been created by this ADR.

## Acceptance before enabled production

- [ ] Review identity and administrative proof; bind each TV's key to a selected profile with key rotation/recovery.
- [ ] Implement per-task and per-profile consent UI; verify default-deny, preview and explicit disable/revoke.
- [ ] Add bounded server storage, least-privilege API, TTL purge, rate limits, negative tests, and privacy-safe logs.
- [ ] Validate JSON Schema v1, DST/all-day crossing, stale revisions, cancellations/tombstones, duplicates and max sizes.
- [ ] Test a revoked/offline TV can no longer display protected cached data beyond the agreed bound; profile switch clears it.
- [ ] Verify Kept encrypted sync and offline tasks unchanged; Vela existing calendar/launcher works if sharing service is unavailable.
- [ ] Check free-plan quota, deploy only through Kept/Vela release gates and document rollback.
- [ ] Confirm with a real Sony TV and phone, including pairing, grant expiry, revocation and guest screensaver.

**Current implementation evidence:** [Kept PR #2](https://github.com/vudh1/kept/pull/2) adds only a pure, local projection helper and tests. It has no UI, network, storage, access grant or deployed consumer. All production checkboxes remain unchecked.
