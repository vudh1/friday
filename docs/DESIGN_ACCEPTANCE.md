# FRIDAY Quiet Glass — Design Adoption Checklist v1

**Use per product PR and device acceptance.** This is a checklist, not proof that any particular app passed visual, accessibility or hardware checks. Child repositories and their release gates remain authoritative.

## Review artifact

- [ ] Current source/`AGENTS.md`/release gate inspected; baseline screens recorded with synthetic data.
- [ ] Figma shows editable proposal and semantic state changes. Canva assets, if any, have original provenance and optimization notes.
- [ ] Main task requires the same or fewer interactions; no critical function, settings route or accessibility feature is removed.
- [ ] Token mapping is documented. Product accent remains distinct; recognizable family spacing/type/focus remains consistent.
- [ ] Navigation/settings headings use intentional Title Case (e.g., `Household & Sync`), while sentence copy, proper names, dynamic data and localization preserve natural casing ([FRIDAY #25](https://github.com/vudh1/friday/issues/25)).

## Visual and accessibility

- [ ] Text and essential icons meet WCAG 2.2 AA targets where applicable; disabled/decorative states are documented separately.
- [ ] Status does not rely on color alone. Focus/selected/pressed/disabled/error are distinguishable.
- [ ] iPhone sizes 390px and 430px, desktop, notched safe areas, keyboard and 200% text checked for web PWAs.
- [ ] TV 1920×1080 and 3840×2160 layouts, ten-foot typography, overscan-safe regions, D-pad and Back/focus restoration checked for Vela.
- [ ] Motion is informative and reduced-motion alternatives remain functional; cinematic intro is skippable and daily use is not delayed.
- [ ] No permanent heavy blur, giant GPU carousel, layout-jump, offscreen focus or flickering refresh.

## Runtime, failure and privacy

- [ ] Primary functions work offline or degraded according to the owning product's existing guarantees.
- [ ] Loading, empty, stale, unavailable, timeout, denied permission and recovery states provide honest, calm feedback.
- [ ] Time, timezone/DST, ongoing vs upcoming, duplicate/cancelled event semantics tested on any calendar screen.
- [ ] No client secrets, tokens, private URL, household data, roster or sensitive test fixture appears in repo, Figma or Canva.
- [ ] Private Kept/calendar data is not exposed on shared TV by default; profile switch, grant expiry and revocation tested before adding any integrations.
- [ ] Visual changes do not add mandatory paid services, backend polling or a FRIDAY runtime dependency.

## Performance, provenance and release

- [ ] Baseline and after measurements include startup, time-to-first-interaction and main navigation responsiveness in relevant devices/browsers.
- [ ] Assets are sized appropriately, cached/offline where applicable, and license/attribution preserved. No copied Apple visual assets or fabricated third-party app icons.
- [ ] Existing integration, encrypted state, sync, ICS, notifications and release workflows remain working; rollback path described.
- [ ] Source tests and visual regression checks run; screenshot evidence and failures linked.
- [ ] Report statuses separately: **proposed**, **implemented**, **CI-tested**, **deployed**, **physical-device verified**. Passing CI or Figma review never implies release or TV hardware validation.

## Ownership

FRIDAY tracks the versioned contract and adoption evidence. BallerWatch, Kept and Vela TV each implement and release in their own repositories. RSVP is an independent upstream and does not inherit these requirements automatically.
