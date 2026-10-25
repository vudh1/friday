# FRIDAY Agent Operating Rules

Scope: this FRIDAY coordination repository and any proposed integration touching BallerWatch, Kept, or Vela TV.

## Mission and status

FRIDAY means *Make every day feel like Friday*: make life simpler through coherent, opt-in connections among independent apps. FRIDAY Core, common identity, notification routing, and cross-app action APIs are **planned**, unless code and deployment evidence establish otherwise. Never describe a proposal as shipped.

## Before any implementation

1. Identify which repository owns the affected data and user-facing behavior.
2. Read the latest code, documentation, `AGENTS.md`, deployment environment, branches, and release workflow in each affected repository.
3. Record what exists, what is proposed, and how it will be verified. A built artifact does not prove deployment or real-device installation.
4. For API changes, identify all producers, consumers, contracts, compatibility requirements, and rollback plan.
5. Work in a branch or PR when modifying a product; never auto-promote to production just to align FRIDAY.

## Non-negotiables

- Keep BallerWatch, Kept, and Vela TV fully functional if FRIDAY services fail.
- Do not migrate or read encrypted application state directly from another app. Use an authorized, documented adapter/API.
- Never commit secret values, private ICS URLs, device network addresses, account details, PINs, personal data, or internal incident logs to this public repository.
- Do not expose private information on shared TV profiles or screensavers without explicit consent and a reviewed authorization model.
- Do not substitute a shared profile selection or local PIN for a securely verified user/device identity.
- Use least-privilege scopes, expiration, revocation, secure transport, request validation, rate limits, and privacy-safe audit logging.
- Keep platform constraints honest: TV native launchers, iOS web notifications, device pairing and third-party integrations each require platform verification.
- Preserve stable, existing calendar/ICS integrations while adding new ones.
- Cache last-good results where appropriate. Failed weather, AI, sync, or notification services must not block primary navigation.
- Follow [docs/COST_POLICY.md](docs/COST_POLICY.md): **no new payment information**, billed/free-converting plans or potentially chargeable providers by default. Even a $0 tier requiring a card is blocked absent a new explicit owner decision. Check official current pricing, usage/overages, enforcement, fallback and rollback for every infrastructure/AI/auth change.
- Source code, CI and GitHub issues **cannot certify actual $0 billing**. Only owner-authorized provider billing records can establish charges, and alerts may lag. Never claim an invoice was checked without evidence.

## Design expectations

Follow [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md). Prefer simple layouts, low visual noise, few interactions, accessible focus states, responsive performance, and meaningful motion. Product accents may vary. Do not force a heavyweight shared web UI library into native TV environments.

## Integration expectations

- Source-of-truth stays in the producing application. FRIDAY may hold minimal consent, identity, routing and rebuildable views.
- Contracts need version, stable IDs, time zone rules, optional fields, visibility/scopes, update/delete semantics, and error behavior.
- Reads are default. Cross-app writes require explicit user confirmation and narrow permissions.
- Prefer idempotent delivery, bounded retries, freshness indicators, and offline fallbacks.
- Any common SDK/package is introduced only after real duplication exists in at least two consumers.

## Delivery and reporting

For each PR/task, report: intent; repositories/files changed; tests and results; runtime/deployment evidence; privacy and cost impact; compatibility/rollback; remaining gaps. Clearly separate **implemented**, **tested**, **deployed**, and **verified on device**.
