# FRIDAY

**Make every day feel like Friday.**

FRIDAY is a free-first, privacy-conscious ecosystem connecting independent apps so everyday tasks take less effort. Each app should feel familiar, stay useful on its own, and exchange only the information the user has authorized.

## Connected products

| Product | Purpose | Repository |
| --- | --- | --- |
| **BallerWatch** | Pickup soccer, leagues, scouting, sports calendars and matchday updates | [vudh1/ballerwatch](https://github.com/vudh1/ballerwatch) |
| **Kept** | Household appliances, maintenance reminders and shopping | [vudh1/kept](https://github.com/vudh1/kept) |
| **Vela TV** | Minimal TV launcher, family calendar, ambient display and remote experiences | [vudh1/velatv](https://github.com/vudh1/velatv) |

## External upstream source repositories

| Upstream | Source repository | Relationship |
| --- | --- | --- |
| **Play RSVP** | [nhcuong95/rsvp](https://github.com/nhcuong95/rsvp) | Independently maintained RSVP website and Google Apps Script/Sheets backend; BallerWatch uses its published RSVP information as an upstream input for pickup tracking. |

Play RSVP is **not a fourth FRIDAY-owned product**, and registering its source repository grants no access to its admin backend, spreadsheet, credentials or deployment pipeline. Verify current upstream behavior in its own repository before changing any dependent integration.

This repository is the **ecosystem coordination home**: shared rules, integration contracts, design guidance, roadmap and future FRIDAY Core work. It is not a replacement for the three product repositories or their production deployment pipelines.

## The five principles

1. **Less effort:** fewer taps, clearer navigation, useful defaults and relevant information at the right time.
2. **Independent apps:** existing features continue working when FRIDAY or another app is offline.
3. **User-controlled sharing:** each product owns its data; cross-product access is permission-scoped, revocable and minimal.
4. **One design language:** quiet glass, readable hierarchy, predictable controls, distinct product accents.
5. **Cardless by default:** use no-payment-method infrastructure; review quotas and provider billing separately before enabling any chargeable service.

## A typical connected experience

- BallerWatch publishes an authorized game schedule; Vela can display a compact upcoming event.
- Kept publishes an opted-in maintenance reminder; Vela can display its due date without exposing private details.
- Selecting a TV event can hand off to the owning app on a paired phone for further action.

These are **target integrations**, not claims that every path is deployed today. Existing Vela calendar subscriptions should remain available throughout migration.

## Start here

- [Architecture and boundaries](docs/ARCHITECTURE.md)
- [Shared design system](docs/DESIGN_SYSTEM.md)
- [Roadmap and acceptance criteria](docs/ROADMAP.md)
- [Current owner actions and cross-project execution plan](docs/EXECUTION_PLAN.md)
- [Integration register and verified status](docs/INTEGRATION_REGISTER.md)
- [ChatGPT Project organization](docs/CHATGPT_PROJECTS.md)
- [Instructions for AI coding agents](AGENTS.md)
- [Cost and billing safety](docs/COST_POLICY.md)

## Status

<kbd>Documentation & planning</kbd> — FRIDAY cross-app services are proposed. The existing products have their own release lifecycles. A change in this repository must not automatically deploy or modify them.

## Security

This is a **public repository**. Never commit credentials, passwords, PINs, decryption keys, private calendar URLs, household data, device addresses or unredacted operational handovers. Document system behavior using sanitized examples. Report security concerns privately to the owner rather than in a public issue with exploitable details.

## Contributions

Open focused issues with acceptance criteria. Make changes in the product repository that owns the behavior. Changes to common protocols or design rules should be reviewed here before consumers adopt them. Keep integrations backwards-compatible and easy to disable.

## License and attribution

Original FRIDAY code and documentation are licensed under the [Apache License 2.0](LICENSE) (`Apache-2.0`). Copyright © 2026 Duong Vu and contributors. Each child product has its **own** root license and third-party obligations; see the [FRIDAY licensing policy](docs/LICENSING.md). The separate [Play RSVP](https://github.com/nhcuong95/rsvp) upstream is not licensed by FRIDAY. Product names/marks, third-party material and private user data are not granted additional rights by this license.
