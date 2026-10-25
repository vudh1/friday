# FRIDAY Roadmap

This is a **priority proposal**, not a release promise. Track implementation through GitHub issues and a single cross-repository **FRIDAY Roadmap** GitHub Project board.

## P0 — Foundation

- [ ] Create and maintain central FRIDAY docs, safety conventions, project register and shared design draft.
- [ ] Inventory app-specific auth, APIs, deployment, private-state boundaries and existing test/release workflows.
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
