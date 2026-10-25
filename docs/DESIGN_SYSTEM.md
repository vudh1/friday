# FRIDAY Design — Shared Language v0.1

**Intent:** Apple-like consistency without making three distinct products look identical. All values below are **proposals** until adopted and accessibility-tested in each app.

## Design thesis

**Calm by default. Useful at a glance. Detailed on demand.** FRIDAY favors few actions, readable information, subtle glass surfaces, and dependable performance over decorative controls or animations.

## Design tokens (proposed)

| Semantic token | Example value | Notes |
| --- | --- | --- |
| `color.canvas` | `#0D121B` | Deep graphite base |
| `color.text.primary` | `#F4F6FA` | Soft white |
| `color.text.secondary` | `#ADB7C5` | Supporting text; verify contrast |
| `color.accent.ballerwatch` | `#68CFF7` | Sports / sky |
| `color.accent.kept` | `#89D7AE` | Home / sage |
| `color.accent.velatv` | `#F2C47E` | Ambient / warm gold |
| `space.unit` | `4px` | Typical gaps 8/12/16/24/32 |
| `radius.small` / `card` / `dialog` | `12px` / `18px` / `24px` | Platform scaling allowed |
| `motion.interact` | `150–220ms` | Quick feedback; honor reduced motion |
| `motion.navigate` | `220–350ms` | Avoid slowing frequent actions |

## Product and platform rules

1. **One clear primary action per screen.** Summaries first; deeper details on selection.
2. **Few strokes and borders.** Use spacing, size and typography before outlines.
3. **Restrained glass.** One or two practical translucency levels; avoid blur where readability or TV performance suffers.
4. **Semantic, reusable controls.** Shared concepts: `AppTile`, `EventRow`, `StatusBadge`, `NotificationItem`, `ProfileSwitcher`, `SettingsGroup`, `ConfirmDialog`, `EmptyState`.
5. **Explicit interaction states.** Rest, focus, hover where supported, pressed, selected, loading, disabled, success and error.
6. **Nested, predictable settings.** Group by user goal; avoid duplicated routes and dead ends.
7. **Motion communicates state.** Intro animations are skippable and reversible where appropriate; no blocking on everyday use.
8. **Show confidence honestly.** Stale/unavailable data has calm, clear status; never fabricate weather, broadcast channels or sync completion.
9. **Readable across distances.** Mobile touch targets and focus order; TV ten-foot typography and obvious directional focus. Never require hover on TV.
10. **Accessibility is part of the identity.** Contrast-tested tokens, dynamic type considerations, screen-reader labels, keyboard focus and reduced motion.
11. **Distinct product personalities.** Product accent/icons differ; navigation patterns, language and quality remain coherent.

## Common calendar language

For Vela and future FRIDAY event summaries, use **All / Playing / Watching / Life** as clear category labels. Show start time/date across categories; sports-to-play may show location and sports-to-watch may show verified channel information. Keep other metadata behind an event detail view. In-progress events remain eligible until a credible end time, then naturally yield priority to what is next.

## Implementation approach

- Adopt semantic tokens in **two existing web apps** before making a shared code package.
- Let TV-native implementations consume the same semantics through TV-specific focus, scaling and performance conventions.
- Use representative design reviews for BallerWatch dashboard, Kept task view and Vela Home/screensaver before declaring the tokens final.
- Never replace a product's functioning theme wholesale merely to create uniformity. Migrate incrementally and check screenshots at multiple screen sizes.
