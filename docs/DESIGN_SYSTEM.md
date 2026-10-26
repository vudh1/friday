# FRIDAY Design System v1 — Quiet Glass (proposal)

**Status:** Review-ready proposal; **not adopted by child apps and not production-verified**. FRIDAY owns the contract and review process; BallerWatch, Kept and Vela TV own their implementations and releases. This document supersedes the v0.1 draft only after its PR is reviewed and merged.

**Design thesis:** *Calm by default. Useful at a glance. Detailed on demand.* FRIDAY means “Make every day feel like Friday.” All apps should feel related through predictability, visual quiet, touch/focus behavior and performance—not through identical screens, a large shared logo or a mandatory runtime package.

## Family resemblance and product signatures

| Surface | Personality | Primary accent | Goal |
| --- | --- | --- | --- |
| FRIDAY | Neutral, editorial, confident | Graphite + soft opal highlights | Coordinate, never visually compete with a child |
| BallerWatch | Energetic, soccer-first | Sky `#68CFF7`, limited field green | Alive on matchday; quiet during ordinary use |
| Kept | Warm, reassuring, ordered | Sage `#89D7AE` | An everyday chore completed with little effort |
| Vela TV | Cinematic, ambient, unobtrusive | Warm gold `#F2C47E` | Beautiful while idle; disappears behind launched content |

Avoid proprietary interface imitation. Borrow broad usability principles—clarity, meaningful depth, natural feedback—not Apple-specific assets or pixel-perfect layouts. External RSVP remains independently owned and need not adopt FRIDAY marks or dependencies.

## Versioned source tokens

The machine-readable proposed tokens are in [`design/tokens.v1.json`](../design/tokens.v1.json). Token names are semantic. Product code may map them to CSS custom properties, Android resources or Tizen theme constants. **Do not import the FRIDAY repository or a shared UI runtime at startup.** Copy/version the selected values into a product-native mapping until at least two consumers justify an optional package.

| Semantic color | Dark | Light (web proposal) | Use |
| --- | --- | --- | --- |
| `color.canvas` | `#0D121B` | `#F5F7F9` | App background |
| `color.surface.base` | `#18212E` | `#FFFFFF` | Functional foreground surface |
| `color.surface.raised` | `#243143` | `#E8EDF1` | Raised/focused area |
| `color.text.primary` | `#F4F6FA` | `#131D29` | Headlines, values, controls |
| `color.text.secondary` | `#ADB7C5` | `#4D5A68` | Supporting content; verify contrast |
| `color.border.subtle` | `#3C4B5D` | `#D3DCE4` | Only when spacing cannot convey grouping |
| `color.focus.ring` | `#BCEAFF` | `#205E8C` | Keyboard/TV focus |
| `color.accent.ballerwatch` | `#68CFF7` | `#187CA8` | Sports emphasis |
| `color.accent.kept` | `#89D7AE` | `#286A4A` | Household emphasis |
| `color.accent.velatv` | `#F2C47E` | `#8E5B14` | Ambient emphasis |

Typography: use platform-available system typefaces rather than shipping a proprietary font. Define a small semantic scale—display, title, heading, body, caption, numeric status—then test wrapping and 200% text. Use tabular numerals for counts/times where supported. Spacing uses a **4 px base** (4/8/12/16/24/32); radii start at 12/18/24 px (small/card/dialog), with TV scaling only when necessary.

Motion: interaction feedback around 150–220 ms; navigation around 220–350 ms where appropriate. These are guidelines, not mandatory delays. Respect `prefers-reduced-motion` on web and equivalent TV settings. Never block a daily workflow behind an intro, network fetch, shimmer or visual effect.

## Quiet Glass surfaces

1. Prefer typographic hierarchy, whitespace and grouping over extra outlines.
2. Limit translucency to **two functional levels** (base and raised); use clear solid fallbacks for low-end devices, high contrast, reduced transparency and offline states.
3. Never blur long, GPU-transformed mobile carousels or full-screen TV backgrounds during focus movement; on TV use cached compositing or solid translucent fills.
4. Keep one obvious primary action per view; surface status and the next likely action before advanced details.
5. Use original licensed artwork at sensible source sizes; use SVG for simple marks/icons and optimized WebP/JPEG for photography. Canva is suitable for optional original brand assets, **not** rasterized controls, calendars or text.
6. A quiet, optional “Part of FRIDAY” label belongs in About/Settings; do not force a logo onto every card.

## Shared component semantics

These are *behavioral contracts*, not a requirement to share implementation code:

| Role | Required behavior and state |
| --- | --- |
| `EventRow` | Time/date and concise Now/Next status; detail on selection; source and freshness available when relevant |
| `StatusBadge` | Meaningful status text, not color alone; accessible contrast |
| `NotificationItem` | Read/unread/expired/error without duplicate alerts or ambiguous action |
| `ProfileSwitcher` | Current identity/profile obvious; focus and privacy boundaries never inferred from appearance |
| `SettingsGroup` | Nested by user goal; back navigation predictable; no redundant options |
| `ConfirmDialog` | Clear consequence, safe default, accessible focus restoration |
| `EmptyState` | Honest absence, concise explanation and an appropriate next action |
| `AppTile` | Legible label on mobile; on TV focus can reveal label but icon source must be high quality |

Each interactive role must account for rest, focus, hover if applicable, pressed, selected, disabled, loading, error and offline/stale variations. Not every role needs all variants; document intentional omissions.

## Platform application

**iPhone PWAs (BallerWatch and Kept):** honor safe areas, native-feeling scrolling, keyboard, dynamic text, touch targets at least 44 × 44 CSS px when practical, understandable screen-reader names, and low-latency interactions. Prioritize the next match/action or shopping/maintenance completion. Avoid offscreen blur and unnecessary network-driven render blocks.

**Vela ten-foot UI:** use readable typography from a sofa, generous spatial focus, fully navigable D-pad order, clear Back/Left semantics, and obvious focus only on the currently active item. Check 1080p and 4K, Sony Android TV and Samsung Tizen separately. A TV profile chooser is not authorization for private household data. Preserve original app icon provenance and existing Google/BallerWatch ICS fallbacks.

## Shared event language and privacy

Vela categories are **All / Playing / Watching / Life**. Keep Now/Next and credible in-progress events easy to parse; show start time/date, sports field if known, verified watching channel if known, and details after selection. Do not fabricate weather, channel assignments, sync health or completion status.

Private Kept/calendar content is hidden on shared TV by default. Cross-product data needs source-app ownership, explicit consent, scoped and revocable per-device/profile grants, versioned contracts and offline/failure behavior. Visual alignment must not introduce a FRIDAY availability dependency, new credentials, card-required tiers or backend cost.

## Acceptance before adoption

Follow [`docs/DESIGN_ACCEPTANCE.md`](DESIGN_ACCEPTANCE.md). Require before/after evidence at representative screen sizes; contrast, 200% text, reduced motion, focus/D-pad, keyboard and screen-reader checks; loading/empty/stale/error/offline tests; mobile scroll/GPU and TV startup responsiveness; asset provenance, privacy, and rollback notes. Use only synthetic data in external design services.

Adoption sequence: FRIDAY proposal review → BallerWatch and Kept independently implement semantically mapped tokens in PRs → visual/a11y comparison → Vela TV maps tokens natively and gets actual Sony/Samsung device verification → only then consider a shared reusable package if duplication warrants it. No FRIDAY docs PR automatically deploys a product.

## Editable design reference

[FRIDAY — Quiet Glass Design Foundations v1 (Figma)](https://www.figma.com/design/NRtSsXVig8SxEt5jdWNLUV)

The file currently contains the **dark semantic token and spacing/radius foundations plus a reviewed family specimen**. Figma's connected Starter plan allowed only one variable mode in this file; light values are documented here and in token JSON pending available multi-mode support or separate light collections. The file is a foundation specimen, **not a complete product mockup or a shipped component package**.
