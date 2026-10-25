# FRIDAY Roadmap

This is a **priority proposal**, not a release promise. Track implementation through GitHub issues and a single cross-repository **FRIDAY Roadmap** GitHub Project board.

## P0 — Foundation

- [x] Create and maintain central FRIDAY docs, safety conventions, project register and shared design draft.
- [x] Inventory app-specific auth, APIs, deployment, private-state boundaries and existing test/release workflows ([issue #2](https://github.com/vudh1/friday/issues/2) closed; dated snapshot, not runtime certification).
- [ ] Select shared event contract v1 with schema validation and time-zone/deletion semantics.
- [ ] Verify current Vela BallerWatch ICS consumption without changes to production.
- [ ] Agree on profile visibility rules before displaying Kept tasks on a shared TV.

**Exit:** all dependencies and data ownership documented; Vela's existing subscriptions untouched; no secret or private data disclosed.

## P1 — First user-visible integration

- [ ] Read-only, permission-scoped BallerWatch event adapter.
- [ ] Opt-in Kept due/overdue reminder projection.
- [ ] Vela *Now / Next* views using minimal data and existing fallbacks.
- [ ] Integration contract tests for offline, expired consent, duplicate events and DST.

**Exit:** an authorized game and maintenance reminder display on Vela while all standalone paths keep working.

## P2 — Accounts, devices and handoff

- [ ] Audit existing app login flows and decide if managed identity is needed.
- [ ] Support household membership, per-TV profiles and revocable read grants.
- [ ] Secure pairing for a web/phone Vela remote with a single active controller; verify network and device constraints.
- [ ] Deep links/QR handoff from TV to the owning application.

**Exit:** a user can revoke a paired device and cross-app access immediately within an explicitly tested window.

## P3 — Refinement

- [ ] Shared notification routing, with no duplicate alerts.
- [ ] Versioned design tokens used by two or more apps, with visual regression checks.
- [ ] Optional cross-product assistant/search using existing budgets; no client-side provider keys.
- [ ] Monitoring for freshness, quota and degraded mode; backups and tested recovery.

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

This table is evidence-bound. **Code merged** does not mean its integration is exposed; **cloud deployed** does not prove physical-device operation. FRIDAY has no deployed central runtime. Continue to use the individual repositories' release gates and preserve existing BallerWatch/Vela ICS while integrating.
