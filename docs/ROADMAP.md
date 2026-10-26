# FRIDAY Roadmap

This is a **priority proposal**, not a release promise. Track implementation through GitHub issues and a single cross-repository **FRIDAY Roadmap** GitHub Project board. For concrete next actions and copyable product-project handoffs, see the [execution plan](EXECUTION_PLAN.md) and [integration register](INTEGRATION_REGISTER.md).

## P0 — Foundation

- [x] Create and maintain central FRIDAY docs, safety conventions, project register and shared design draft.
- [x] Inventory app-specific auth, APIs, deployment, private-state boundaries and existing test/release workflows ([issue #2](https://github.com/vudh1/friday/issues/2) closed; dated snapshot, not runtime certification).
- [ ] Select shared event contract v1 with schema validation and time-zone/deletion semantics.
- [ ] Verify current Vela BallerWatch ICS consumption without changes to production.
- [ ] Agree on profile visibility rules before displaying Kept tasks on a shared TV.
- [x] Enforce the [cardless cost policy](COST_POLICY.md) across app agent instructions and retire card-required Access bootstrap ([issue #13](https://github.com/vudh1/friday/issues/13); merged FRIDAY #14, BallerWatch #197, Kept #9, Vela #25).
- [ ] Review the [staged cardless admin identity candidate](DECISIONS/0002-cardless-admin-identity.md) and [Kept draft PR #11](https://github.com/vudh1/kept/pull/11). Owner-approved identity enrollment, local D1 integration tests and dedicated device/profile grants remain blocked.

**Exit:** all dependencies and data ownership documented; Vela's existing subscriptions untouched; no secret or private data disclosed; no new payment information required.

## P1 — First user-visible integration

- [ ] Read-only, permission-scoped BallerWatch event adapter.
- [ ] Opt-in Kept due/overdue reminder projection.
- [ ] Vela *Now / Next* views using minimal data and existing fallbacks.
- [ ] Integration contract tests for offline, expired consent, duplicate events and DST.

**Exit:** an authorized game and maintenance reminder display on Vela while all standalone paths keep working.

## P2 — Accounts, devices and handoff

- [ ] Audit existing app login flows and decide if managed identity is needed.
- [ ] Support household membership, per-TV profiles and revocable read grants.
- [ ] Verify secure Sony web/phone remote pairing for **up to four independently paired controllers per TV** and **up to two TVs per phone**; test network/device constraints, isolated command leases and revocation on real hardware. Samsung capabilities remain separate.
- [ ] Deep links/QR handoff from TV to the owning application.

**Exit:** a user can revoke a paired device and cross-app access immediately within an explicitly tested window.

## P3 — Refinement

- [ ] Shared notification routing, with no duplicate alerts.
- [ ] Versioned design tokens used by two or more apps, **with verified semantic mappings and visual regression checks** ([design issue #6](https://github.com/vudh1/friday/issues/6)). BallerWatch, Kept and Vela source/release adoption was reported October 26; independent visual/a11y hardware acceptance remains open.
- [ ] Adopt consistent Title Case for user-facing navigation/settings labels across child apps, with documented exceptions ([issue #25](https://github.com/vudh1/friday/issues/25)).
- [ ] Optional cross-product assistant/search using existing budgets; no client-side provider keys.
- [ ] Monitoring for freshness, quota and degraded mode; backups and tested recovery.
- [ ] Keep a non-sensitive integration manifest and detect contract/documentation drift ([issue #20](https://github.com/vudh1/friday/issues/20)); first manual [register](INTEGRATION_REGISTER.md) staged for review.
- [ ] Model cardless free-tier capacity across Vela relay, Workers, D1, API/AI requests and refreshes, with fail-closed behavior ([issue #21](https://github.com/vudh1/friday/issues/21)).
- [ ] Run a shared-profile privacy, revocation, stale-cache and offline acceptance matrix without copying private state ([issue #22](https://github.com/vudh1/friday/issues/22)).

**Exit:** faster common interactions, validated privacy/reliability, and no mandatory recurring cost.

## Suggested board views

- **By status:** Backlog / Ready / In progress / In review / Done.
- **By product:** FRIDAY / BallerWatch / Kept / Vela TV.
- **By priority:** P0 / P1 / P2 / P3.
- **By milestone:** Foundation / First integration / Identity & handoff / Refinement.

An implementation issue should state the owning repository, user value, dependencies, acceptance tests, production/rollback implications and whether it changes auth or private data access.

## Verified progress — October 25, 2026

| Workstream | Source and CI evidence | Actual status / remaining gate |
| --- | --- | --- |
| App agent compatibility | BallerWatch [#193](https://github.com/vudh1/ballerwatch/pull/193), Kept [#1](https://github.com/vudh1/kept/pull/1), Vela [#17](https://github.com/vudh1/velatv/pull/17) | Merged instructions; apps remain independently owned. |
| Integration inventory | FRIDAY [#9](https://github.com/vudh1/friday/pull/9), [issue #2](https://github.com/vudh1/friday/issues/2) | Completed dated source audit; not a physical-device certification. |
| Event projection v1 | FRIDAY [#9](https://github.com/vudh1/friday/pull/9) + [#10](https://github.com/vudh1/friday/pull/10), [successful CI](https://github.com/vudh1/friday/actions/runs/40189152574) | Draft schema and synthetic validation/tests merged; runtime producer/consumer implementation and identity/security approval still open [#1](https://github.com/vudh1/friday/issues/1). |
| Kept reminders | Kept [#2](https://github.com/vudh1/kept/pull/2), [validate](https://github.com/vudh1/kept/actions/runs/40188733405), [Pages publish](https://github.com/vudh1/kept/actions/runs/40188733408), [ADR](DECISIONS/0001-kept-reminder-consent.md) | Owner approved limited data class; pure local helper merged. **No sharing feed or TV grants deployed**; [issue #3](https://github.com/vudh1/friday/issues/3) open. |
| Vela web remote | [Worker run #5](https://github.com/vudh1/velatv/actions/runs/40187216573), production [PR #19](https://github.com/vudh1/velatv/pull/19), [signed 2.5.14.1](https://github.com/vudh1/velatv/releases/tag/v21401) | Worker and signed APK released; offline TV reported by relay. Sony installation, PIN pairing, exclusive controller, revocation and Samsung scope not physically verified; [issue #5](https://github.com/vudh1/friday/issues/5) open. |

This table is a dated **October 25 checkpoint**, not an assertion that these are the latest app releases. Current source additionally documents Vela's two-TV/four-controller scope and BallerWatch's stable-profile code as gated in [issues #5](https://github.com/vudh1/friday/issues/5) and [#12](https://github.com/vudh1/friday/issues/12); Kept's isolated OAuth preview remains draft [PR #11](https://github.com/vudh1/kept/pull/11). See [execution plan](EXECUTION_PLAN.md) before attempting activation.

This table is evidence-bound. **Code merged** does not mean its integration is exposed; **cloud deployed** does not prove physical-device operation. FRIDAY has no deployed central runtime. Continue to use the individual repositories' release gates and preserve existing BallerWatch/Vela ICS while integrating.


## Verified Quiet Glass review — October 26, 2026

These records supersede *only the UI/release evidence* in the October 25 checkpoint above. Do not infer completion of the independent integration, privacy or hardware tracks.

| Owner | Verified GitHub evidence | Remaining gate / issue |
| --- | --- | --- |
| **FRIDAY design** | [Quiet Glass contract #24](https://github.com/vudh1/friday/pull/24) merged; [editable Figma foundation](https://www.figma.com/design/NRtSsXVig8SxEt5jdWNLUV), Professional Full seat verified | 19 existing variables still in one dark mode; reconcile real dark/light Figma modes with `design/tokens.v1.json`, complete cross-device acceptance [#6](https://github.com/vudh1/friday/issues/6) and Title Case policy [#25](https://github.com/vudh1/friday/issues/25). |
| **BallerWatch** | Quiet Glass [#215](https://github.com/vudh1/ballerwatch/pull/215), [production #217](https://github.com/vudh1/ballerwatch/pull/217), [v11.11.2](https://github.com/vudh1/ballerwatch/releases/tag/v11.11.2), [promotion](https://github.com/vudh1/ballerwatch/actions/runs/40281493723), [Worker](https://github.com/vudh1/ballerwatch/actions/runs/40281510738), [Pages](https://github.com/vudh1/ballerwatch/actions/runs/40281746502) successful | [#218](https://github.com/vudh1/ballerwatch/issues/218): Figma lacks full editable mobile flows; iPhone/accessibility/offline acceptance not proven. |
| **Kept** | Quiet Glass [#13](https://github.com/vudh1/kept/pull/13), Figma alignment [#14](https://github.com/vudh1/kept/pull/14), [validation](https://github.com/vudh1/kept/actions/runs/40286046017), [browser smoke](https://github.com/vudh1/kept/actions/runs/40286047173), [Pages](https://github.com/vudh1/kept/actions/runs/40286046045) successful | [#15](https://github.com/vudh1/kept/issues/15): real-iPhone accessibility, encrypted multi-device/offline and recovery validation missing; **no Kept→TV grants**. |
| **Vela TV** | Quiet Glass [#46](https://github.com/vudh1/velatv/pull/46), screensaver fix [#47](https://github.com/vudh1/velatv/pull/47), production [#49](https://github.com/vudh1/velatv/pull/49), [signed Sony APK v22601](https://github.com/vudh1/velatv/releases/tag/v22601), [Sony workflow](https://github.com/vudh1/velatv/actions/runs/40285377312), [web remote Pages](https://github.com/vudh1/velatv/actions/runs/40283859156) successful | [#50](https://github.com/vudh1/velatv/issues/50): actual Sony install/remote 2-TV/4-controller/wake checks, Samsung separate WGT parity check and README release-doc drift. |

**Status definitions:** source merged ≠ automated tests ≠ cloud/site or APK published ≠ physically installed/device-verified. Actual release logs above establish the middle stages only. The child repositories remain the release source of truth. Third-party [RSVP](https://github.com/nhcuong95/rsvp) is read-only upstream and was not changed.
