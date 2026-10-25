# ADR 0002 — Cardless administrator identity candidate (GitHub OAuth + PKCE)

**Date:** 2026-10-25  
**Status:** Candidate staged; **not owner-selected for activation, security-approved, merged or deployed**.  
**Tracking:** [FRIDAY #13](https://github.com/vudh1/friday/issues/13) · [Kept draft PR #11](https://github.com/vudh1/kept/pull/11) · [ADR 0001](0001-kept-reminder-consent.md)

## Decision boundary

The owner's firm requirement is **no new payment information and no potentially billable integration without a separate informed decision**. Cloudflare Zero Trust Free enrollment required a billing profile and was declined. The existing Access-only Kept administrator Worker remains fail-closed. Kept's encrypted sync, BallerWatch and Vela's current features stay independent. No FRIDAY household data is currently published.

For review, stage **GitHub OAuth web application authorization-code flow with PKCE S256** as a cardless administrator authentication candidate. GitHub is already a product account for the owner, but this is **not** equivalent to approval to link GitHub sign-in to FRIDAY or to expose any household data. Another defensible candidate is passkeys/WebAuthn with first-enrollment and recovery review.

## Why a dedicated Kept-owned identity boundary

Kept owns household data and can share at most the task projection covered by ADR 0001. Administrator sign-in is needed to approve and revoke narrowly scoped grants, but it cannot itself authorize TV consumption. FRIDAY coordinates the versioned permissions contract without becoming a single dependency or holding Kept's client-encryption keys.

- **Issuer:** GitHub OAuth, only requesting `read:user`. Use server-side confidential-client secret and exact callback, with wildcard callback matching disabled.
- **Identity:** verify access token against authenticated GitHub `GET /user`, then compare the **immutable numeric ID** to a private exact allowlist; neither mutable display name nor email-domain match is identity. Refuse unexpected broader token scopes.
- **CSRF/replay:** random OAuth state bound to an HttpOnly/Secure/SameSite=Lax browser cookie, 5-minute server-side state, PKCE S256, atomic one-time state consume.
- **Session:** independent 20-minute random bearer cookie, only the SHA-256 hash held in D1. Same-origin logout and revoke sessions; deny immediately after expiry, removal of allowlist membership or D1 failure. Do not place tokens in URLs, localStorage, logs or repository files.
- **Resource controls:** exact HTTPS origin, restricted routes, 5 OAuth starts / 10-minute edge-IP bucket using a secret-keyed hash; fail closed at Worker/D1 Free exhaustion. Distributed abuse and DoS are still security-review risks.
- **Explicit non-capability:** no Kept reminder upload, no Vela device authorization, no reading encrypted GitHub state and no data API in this candidate. Existing Kept and Vela login/PINs are not repurposed.

## Design-specific launch gates

1. Review [the staged implementation](https://github.com/vudh1/kept/pull/11) with security-minded code reviewers. Test actual D1 SQLite `DELETE ... RETURNING` one-time consumption, race behavior, real GitHub callback cookies, rate limits and failure paths in a local Wrangler/isolated preview.
2. Owner must choose whether GitHub authentication is appropriate, explicitly register a **dedicated OAuth App**, and privately configure callback/approved account ID/secrets. Do not create a payment profile or broaden scopes. If account/registration requests payment details, **stop** and use another verified no-card option.
3. Provision no auth Worker, D1 schema or cloud route before current provider plan/quota/overage review. Confirm existing Workers Free and D1 account configuration; source/CI **cannot** attest real invoices.
4. Before Kept-to-Vela sharing, separately approve exact selected task summaries and one *named TV installation + profile* with expiring read-only `kept:reminders:read` grant. Pair using device-bound asymmetric keys; remote PIN, GitHub session or TV profile selection alone never suffices. Implement revocation and stale/offline display cutoff in both product repos.
5. Negative tests: unselected/no grant, guest/profile switch, wrong/replayed/expired credentials, sharing disabled, logout/revoke, D1 quota exhausted, producer offline, malicious title, duplicate/stale/tombstoned events, source timezone/DST. Verify on actual TV hardware before claiming device availability.

**Rollout:** review PR → local tests → isolated admin-only preview → owner login/consent test → implement grants in owning app repos → production gates separately. Never auto-promote Vela signed APK or change Kept encrypted sync.

**Rollback:** no service is enabled by this ADR or draft PR. If a preview is activated later, disable the isolated Worker route and revoke D1 sessions/grants, leaving current standalone apps unchanged.

## Evidence and explicit unknowns

- [GitHub authorization-code, state, PKCE, callback documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).
- [GitHub OAuth best practices](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/best-practices-for-creating-an-oauth-app).
- [Cloudflare D1 Free hard-limit behavior](https://developers.cloudflare.com/d1/platform/pricing/); daily limit exhaustion returns errors, not an automatic authenticated-data bypass.
- Kept draft PR #11 has **seven passing local mock-based test groups**; CI, local real-D1 and hosted sign-in/device verification must be recorded separately. No OAuth app registration, binding, schema migration, Worker deployment, private household sharing or provider billing verification occurred in that change.

If this candidate proves unsuitable (GitHub dependency, privacy, login UX, or provider availability), keep the current fail-closed Worker and explore passkeys/OIDC without exposing data.