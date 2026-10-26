# FRIDAY execution plan — 2026-10-25 checkpoint

This is a **coordination and acceptance plan**, not a claim that integrations are
deployed. Source in each owning application and its current CI/release workflow
is authoritative. The [roadmap](ROADMAP.md) carries priority; GitHub issues
carry decisions and evidence. Do not post private OAuth credentials, household
tasks, calendar URLs, TV PINs, device addresses or full handovers here.

## What is already established

| Work | Evidence-backed status | Still missing |
| --- | --- | --- |
| Shared agent guidance and Apache-2.0 licensing | Merged in all four repositories ([licensing policy](LICENSING.md)) | No product release is implied by docs-only merges |
| Event projection format | Draft JSON Schema and synthetic tests on FRIDAY `main` ([contract](../contracts/README.md)) | Approved security/compatibility semantics and app producer/consumer conformance |
| BallerWatch sports calendar | Existing parameterized ICS works independently; optional stable read-only profile implementation recorded in [#12](https://github.com/vudh1/friday/issues/12) | Dedicated D1/key activation, live profiles, Vela refresh/rotation/revocation tests |
| Kept minimal reminders | Owner approved **selected harmless summaries only**; browser-side projection helper merged ([ADR](DECISIONS/0001-kept-reminder-consent.md)) | Secure publication, named TV/profile grants, consent UI, retention and live/device tests |
| Kept administrator sign-in | GitHub OAuth selected; isolated auth candidate in [draft Kept PR #11](https://github.com/vudh1/kept/pull/11) with local mocked/Wrangler tests | Private Actions secrets, review/merge, separately approved preview dispatch, hosted browser sign-in tests; **no sharing yet** |
| Vela web remote | Sony relay and signed build have shipped; current source describes two TVs per phone and four independently paired controllers per TV | Physical Sony/phone acceptance, billing/quota observation and platform-specific regressions; Samsung is not equivalent |
| Visual system | [Design language v0.1](DESIGN_SYSTEM.md) is drafted | Actual mobile/TV contrast, focus, reduced-motion and screenshot checks before adoption |

## Your next actions — only things the owner can complete

1. **Kept preview credentials.** Confirm the dedicated GitHub OAuth App's exact callback from [Kept's auth README](https://github.com/vudh1/kept/blob/friday/cardless-github-auth-staged/worker/friday-auth/README.md), with no wildcard redirect. In **Kept → Settings → Secrets and variables → Actions**, add `FRIDAY_GITHUB_CLIENT_ID` and `FRIDAY_GITHUB_CLIENT_SECRET` privately. Do not paste their values into chats, issues or commits. This is for the **isolated admin-only preview**, not household sharing. Owner approval of the preview was recorded; review/merge and an explicit manual workflow dispatch still precede any live deployment.
2. **Cloudflare account-only cost check.** Confirm Workers is still **Free**, no paid usage switch or unexpected charges, and the existing D1 resource is available within free limits. Repo automation cannot inspect invoices or prove $0 billing. Do not add billing information, activate Zero Trust or upgrade a plan for FRIDAY.
3. **BallerWatch stable links (later gate).** When the BallerWatch project is ready, approve provision/binding of a dedicated `ballerwatch-calendar-profiles` D1 and `CALENDAR_SYNC_KEY` through private repository secrets, after reviewing the exact deployment and free-tier impact. No credentials belong in FRIDAY. Until then keep legacy `.ics` subscriptions.
4. **Physical Sony tests.** Install/update Vela using the owning repo's signed updater or documented ADB fallback **without uninstalling or clearing app data**. With phone and TV on the intended network, test initial/additional PIN pairing, switching between two TVs if available, four-controller capacity if devices are available, disconnect/revoke, Home/Back/navigation, leaving/returning to the iPhone web remote, TV restart and profile privacy. Report actual device results, not secrets or PINs. Samsung remains a separate test track.
5. **Future Kept sharing decision.** After the administrator preview is verified, explicitly choose the exact selected reminder(s), named TV installation and named display profile and expiry. Do not turn on household content merely because GitHub sign-in works.

No payment method, credential value or private data is requested in this document.

## Agent work queue — ordered, with owning repository

| Order | Owner | Work to implement/review | Must pass before done |
| --- | --- | --- | --- |
| 1 | FRIDAY | Finalize v1 event semantics for stable IDs, all-day/DST, updates, cancellation/tombstones, authorized visibility and stale/revoked behavior | Schema tests and explicit adoption decision, no private data fixtures ([#1](https://github.com/vudh1/friday/issues/1)) |
| 2 | Kept | Security-review draft admin OAuth PR #11; retain manual-only preview gate; once credentials privately exist, preview with fake/denied/expired/correct identities, revoke-all and D1 failure | No data endpoints, no Access bypass and no public secrets ([#13](https://github.com/vudh1/friday/issues/13)) |
| 3 | BallerWatch | Audit disabled stable-profile API readiness, DB migrations, encrypted field storage and existing ICS; activate only after owner's separate provisioning decision | Rate/replay/recovery/revocation/DST tests; old ICS unchanged ([#12](https://github.com/vudh1/friday/issues/12)) |
| 4 | Vela TV | Consume one authorized BallerWatch profile feed **per Vela profile**; Now/Next and in-progress grouping, duplicates, cancelled events, offline/fallback, feed rotation | No bleed into other/guest profiles; no regression to Google/legacy ICS ([#4](https://github.com/vudh1/friday/issues/4)) |
| 5 | Kept + Vela TV | Build client-side opt-in per-task minimal projection, device-bound per-profile read grants and expiry/revocation; no cross-app writes | Protected cache hidden by default and purged within accepted window even offline; Sony hardware test ([#3](https://github.com/vudh1/friday/issues/3)) |
| 6 | Vela TV | Complete hardware remote matrix for **two TVs per phone / four controllers per TV**, lease isolation, app switching and quotas | Sony physical test evidence, quota monitoring, no system-wide claims ([#5](https://github.com/vudh1/friday/issues/5)) |
| 7 | All apps | Adopt shared semantic tokens incrementally, review actual screens and accessibility | Representative iPhone/desktop/Sony/Samsung screenshots and focus/contrast tests ([#6](https://github.com/vudh1/friday/issues/6)) |
| 8 | All apps | Design optional QR/deep-link handoff, deduped notifications, recovery, provenance and usage monitoring | No sensitive URLs in logs or shared screens; owner-specific release and fallback gates |

## Project chat handoffs

Copy the applicable request into the matching product's ChatGPT Project. The
receiving agent should freshly read its own `README.md`, `AGENTS.md`,
`FRIDAY.md`, current `main`, applicable open PRs and CI. It should **not**
interpret this dated document as proof of live deployment.

### BallerWatch

> Coordinate FRIDAY issues #1, #4 and #12. Audit the current stable calendar
> profile v1 source and live readiness; preserve the legacy BallerWatch ICS and
> private encrypted state. Complete remaining source-side regression tests for
> independent profile capabilities, TTL/revocation/rotation, DST, duplicate UID,
> deleted and in-progress events, quota failure and no-cards billing guard. Do
> not provision D1 or keys, send push, alter runtime-state or promote production
> without the specific owning repo approval/gate. Give FRIDAY a verified
> producer contract and a safe Vela consumer test fixture; report PR, CI and
> separate deployment evidence.

### Kept

> Coordinate FRIDAY issues #1, #3 and #13. Security-review draft PR #11 and
> its manual-only GitHub OAuth preview workflow; preserve encrypted local-first
> sync and fail-closed old Access worker. Verify exact callback, origin/state/
> PKCE, D1 atomic use, rate limits, expiry/revocation, malformed input and
> provider outage without exposing secrets. With owner's separately configured
> Actions credentials, follow only the already approved isolated admin preview
> scope and request workflow confirmation before deployment. Then propose,
> behind new review gates, a default-off client-selected minimal reminder
> projection with per-task consent and per-device/profile read grants. Never
> upload full household state or grant Vela data access by default.

### Vela TV

> Coordinate FRIDAY issues #4, #5 and #6. Read current Sony, Samsung and web
> remote source before coding. Preserve Google/legacy BallerWatch ICS and
> profile privacy. Align the FRIDAY remote acceptance target with two TVs per
> phone and four independently paired remotes per Sony TV (not the obsolete
> one-controller design). Fix/retest duplicate press on iPhone app switching,
> lease separation, lockout/revocation and no-scroll phone UI as needed;
> report source/CI/signed release versus real Sony test separately. Stage an
> optional profile-scoped BallerWatch Now/Next consumer with offline/DST and
> cancellation behavior; never display Kept private data without new grants.

## Work definition of done

For every item record **proposed → implemented → locally tested → CI passed →
deployed → device-verified** individually, with URLs/SHAs and test date. A
build, public HTTP 200 or owner verbal confirmation cannot by itself certify
end-to-end authorization or real-TV operation. Keep one rollback and
offline path per integration, and keep every product functional independently.
