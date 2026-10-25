# FRIDAY integration inventory — read-only checkpoint

**Checked:** October 25, 2026 (UTC). **Scope:** public repository source and GitHub Actions history only. **Not checked:** live credentials, household data, phone sync, TV installation, physical remote pairing, or paid account configuration. This is a *snapshot*, not an implementation or a security certification.

## Ownership and verified source snapshots

| System | Checked `main` | Separate production ref | Domain owner / existing integration |
| --- | --- | --- | --- |
| [BallerWatch](https://github.com/vudh1/ballerwatch) | `82a8b03ca4cec0540347ae23fdd31011252c27f6` | `50a13c09cba42a570fa3a6a2f8607c91007632ed` | Sports and pickup/league records, match settings, calendar and notifications. [ICS generator](https://github.com/vudh1/ballerwatch/blob/main/backend/shared/ical-feed.mjs) is read-only and excludes private rosters/settings. |
| [Kept](https://github.com/vudh1/kept) | `87b9097d92a802fdae9e8827bde5731b36b20571` | No separate product production branch established | Household appliance maintenance and shopping. [Browser encryption](https://github.com/vudh1/kept/blob/main/lib/crypto.js) precedes optional [ciphertext Worker relay](https://github.com/vudh1/kept/blob/main/worker/index.js); [one-off ICS export](https://github.com/vudh1/kept/blob/main/lib/schedules.js) is not a live calendar subscription. |
| [Vela TV](https://github.com/vudh1/velatv) | `69df8a409b4bd2b9fbb7ba9c5cc2b217f327cfb5` | `5e188d8aa5d49b099b9763d8eb6fa13ee98df3ba` | Sony/Samsung launcher/display, local profiles, calendar/cache, Sony remote. [Remote setup](https://github.com/vudh1/velatv/blob/main/remote-worker/README.md) now describes TV-generated PIN in source; platform support and actual installation must be checked. |
| [FRIDAY](https://github.com/vudh1/friday) | Documentation-first coordination repository | No runtime service | Contracts, design, cross-repo grants and roadmap **proposed**, not authoritative source state. |

The upstream [Play RSVP source](https://github.com/nhcuong95/rsvp) independently owns its signup and spreadsheet backend. BallerWatch consumes published RSVP information; it does not own upstream records.

## Current versus proposed paths

- **Existing in source:** BallerWatch emits public-safe calendar ICS. Vela can subscribe directly to BallerWatch ICS and Google secret ICS, with local encrypted caching and per-platform limitations. Keep both subscriptions as a fallback.
- **Existing in source:** Kept works offline, supports a local one-off calendar export, and encrypts optional sync state in the browser. The Worker must not be assumed able to decrypt household tasks.
- **Deployed cloud + published binary (not device-tested):** Vela Sony web remote's Cloudflare relay was redeployed successfully from `main` ([run #5](https://github.com/vudh1/velatv/actions/runs/40187216573)) and the status endpoint responded over HTTPS with the TV currently offline. TV-generated PIN source is now in the `production` branch via [PR #19](https://github.com/vudh1/velatv/pull/19). [Vela 2.5.14.1](https://github.com/vudh1/velatv/releases/tag/v21401) is a successful signed APK publish, **not verified installed or paired on a physical Sony TV**.
- **Proposed only:** unified FRIDAY identity, live normalized event feed, cross-app notifications, automatic Kept→Vela updates and remote task completion. A **local Kept-only projection helper** is in [PR #2](https://github.com/vudh1/kept/pull/2), not wired to a user-facing sharing flow. No FRIDAY Core deployment was verified.

## Release and operational evidence

- BallerWatch has distinct `main` (beta validation) and `production` (user-facing release) branches. A docs-only commit is not a SemVer product release; preserve the manual promotion gate.
- Kept's latest GitHub Pages publish workflow succeeded after the documentation merge. A manual Worker deploy workflow also succeeded earlier on October 25; neither proves correct household two-device synchronization.
- Vela web remote Worker deploy [run #5](https://github.com/vudh1/velatv/actions/runs/40187216573) succeeded after the TV-generated PIN source merge; the Worker answered `/api/status` over HTTPS. Production PR #19 merged, and [production APK run](https://github.com/vudh1/velatv/actions/runs/40187552666) completed all signed-release steps for version **2.5.14.1**. Sony hardware pairing, protocol behavior and installation remain **unverified**, so issue #5 remains open.
- Samsung and Sony hardware acceptance, release signing continuity, account permissions, secure pairing and revocation remain unverified here.

## Open architectural/security decisions

1. The owner **approved the limited Kept reminder summary data class** and opt-in server-side retention. See [ADR 0001](DECISIONS/0001-kept-reminder-consent.md). A pure local projection implementation is under review in [Kept PR #2](https://github.com/vudh1/kept/pull/2); per-task selection, identity, grant TTL, secure transport, revocation, retention and deployment **remain unimplemented**.
2. Choose FRIDAY household/device identity and consent scopes. A shared sync token, PIN or TV profile selector alone is insufficient authorization for cross-app private data.
3. Review [draft event schema](../contracts/event-v1.draft.schema.json), all-day versus timed behavior, stable ID/revisioning, ICS deduplication, cancelled records and private details references before deployment.
4. Require TV and mobile accessibility/contrast/focus reviews before finalizing shared visual tokens.

## Acceptance tests before any cross-app production rollout

- FRIDAY unavailable → all three applications preserve their core functions and existing direct ICS paths.
- Opt-in only; unauthorized/expired/revoked profile sees no private record and cached projections are removed.
- Correct Pacific and other IANA timezone handling including DST gaps/folds, all-day dates, recurrence instances, cancelled and changed events.
- Idempotent retries, source-qualified deduplication across ICS/normalized feeds, bounded stale data, no notification amplification.
- Cloud or producer outage, multi-device state conflicts, safe error messages and no secrets/private URLs in public logs.
- Source implementation, CI, cloud deploy, signed binary and physical device checks must be reported separately.

Use [FRIDAY tracking issue #2](https://github.com/vudh1/friday/issues/2) for the remaining audit and [issue #1](https://github.com/vudh1/friday/issues/1) for the contract review. Do not treat this document as an authorization to transmit household data.
