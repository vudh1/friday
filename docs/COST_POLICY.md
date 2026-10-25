# FRIDAY Cost & Billing Safety — cardless default (v1)
 
**Owner decision:** October 25, 2026. **Scope:** FRIDAY, BallerWatch, Kept, Vela TV, and any later participating app.
**Target:** no *new* required payment information or paid dependency for the FRIDAY ecosystem. This is a design/release policy, not a claim of verified $0 invoices.

## Hard gates

1. **Cardless by default.** Do not enroll a new FRIDAY service in a plan that requires payment details, even when labeled "Free". Do not create a billing profile, add a credit card, enable metered/pay-as-you-go pricing, start a paid/free-converting trial, buy a domain, or upgrade a plan without a *new, explicit owner decision* specific to that change.
2. **No silently billable APIs.** Keep paid AI model/provider calls, SMS, email, cloud resources, premium GitHub Actions/runners, extensions and marketplace add-ons off by default. Existing configured integrations are not proof that their actual usage costs $0; do not broaden their scope or polling rate based on an assumed budget.
3. **Document before deploying.** For any infrastructure/provider/auth/AI/polling change, record the owning app, provider and SKU/plan, whether a card is required, official current pricing/quotas, usage/overage behavior, whether it hard-stops at the free limit, estimated demand, rollback, degraded-mode behavior and verification. Unknowns **block activation**.
4. **Explicit exceptions.** A card-required or potentially chargeable change must have the owner's separate, informed approval of the specific service, amount ceiling and exit plan. Existing broad authorization to work on FRIDAY or a repository is *not* financial approval.
5. **Remain independent.** BallerWatch sports/notifications, Kept offline maintenance/shopping and encrypted sync, and Vela launcher/calendars must not stop working because a proposed cost-sensitive FRIDAY integration is declined or unavailable.

## Evidence and limits

- **Source/CI can review proposed infrastructure but cannot verify a provider's real invoices, payment methods or fees.** Never claim "no charges" without current, owner-authorized billing evidence. Even with read-only billing integration, detection may lag the actual charge; alerts are not a hard spending cap.
- The preferred structural control is **not registering a payment method for new FRIDAY integrations**. It reduces exposure but does not audit preexisting accounts or prove that other products have not incurred costs.
- If a provider supports a genuine enforceable $0 cap, spending alert, or strict free-tier cutoff, document and test it. Alerts alone are insufficient. Do not publish any billing identifiers, invoices, account addresses or secret tokens in public issues/repositories.
- Recheck vendor terms and quotas immediately before implementing or promoting a provider-related change; outdated figures in docs are not release evidence.
- If unexpected billing is suspected: pause the affected feature/rollout, preserve unrelated app functionality, contact the owner and review the provider's private billing dashboard. Never delete resources or credentials merely to hide charges.

## Current register (source/deployment observations, not billing certification)

| Product | Relevant existing components | New FRIDAY paid enrollment | Actual provider charges |
| --- | --- | --- | --- |
| FRIDAY | Public architecture, contracts and issues; no shared production runtime | **Not approved** | Not connected/verified |
| BallerWatch | GitHub Pages/Actions, existing Cloudflare Worker, external sports inputs and opt-in AI keys | **Not approved** | Not connected/verified |
| Kept | Local PWA, encrypted GitHub state, current sync Worker; separate empty FRIDAY D1 and fail-closed admin Worker | **Not approved** | Not connected/verified |
| Vela TV | Native apps, GitHub release/Pages, Cloudflare remote Worker, existing calendar feeds | **Not approved** | Not connected/verified |

This inventory says nothing about payment methods already associated with an independently owned account.

## Cardless authentication decision: Kept → Vela

[FRIDAY issue #13](https://github.com/vudh1/friday/issues/13) tracks the replacement. Cloudflare Zero Trust Free currently requires a payment method to finish onboarding; therefore **do not proceed with that enrollment** under the default FRIDAY policy. Its Access provisioning was blocked by 403, and no Access app is verified.

The previously deployed `kept-friday-admin` Worker checks Cloudflare Access identity plus a private exact-email allowlist and therefore **fails closed** without Access. It has no D1 binding or reminder-data routes. Keep the normal `kept-sync` Worker unchanged. Stop automatic Access provisioning; do not work around the blocker with a broad token or public endpoint.

Before activating a replacement, review cardless standards-based options (passkeys/WebAuthn with secure enrollment and recovery, or a verified no-card OIDC provider), then record the chosen threat model and contracts. Require enrollment bootstrap, identity proof, server-validated sessions, rate limits, secure cookies, device/profile scopes, revocation, expiry, safe error paths, offline behavior and end-to-end tests. Kept's sync token, encryption passphrase, shared PIN and Vela remote PIN are **not** FRIDAY identity. No household data projection or TV reader grant may be deployed before these gates pass.

## Pull-request cost checklist

For each changed provider/deployment/AI/auth component:

- [ ] Exact provider, plan, account scope and card requirement were checked against official current terms.
- [ ] Free-tier usage, possible overages, hard cutoff/alerts and whether payment can ever be collected were recorded; no paid activation was inferred from existing secrets.
- [ ] No new card or payment profile, paid subscription, trial or auto-upgrade; otherwise attach explicit owner decision before merge.
- [ ] Independent offline and failure/rollback behavior was tested; provider billing was **not** claimed verified from CI.

For a docs-only/no-provider-impact change, explicitly record **No billing impact**.
