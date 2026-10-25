# FRIDAY licensing policy

**Decision:** Apache License 2.0 (`Apache-2.0`) is the recommended license for FRIDAY-owned original source code and documentation. This policy coordinates repository-level terms; it does **not** transfer copyright between products or override third-party rights.

| Repository | Baseline before cleanup | Target for original work |
| --- | --- | --- |
| [FRIDAY](https://github.com/vudh1/friday) | Apache-2.0 in root `LICENSE` | Keep Apache-2.0 |
| [BallerWatch](https://github.com/vudh1/ballerwatch) | `COPYRIGHT.md` says “All rights reserved”; no root `LICENSE` | Propose Apache-2.0 **subject to owner review of changed reuse rights** |
| [Kept](https://github.com/vudh1/kept) | No root `LICENSE` | Add Apache-2.0 |
| [Vela TV](https://github.com/vudh1/velatv) | Apache-2.0 in root `LICENSE` | Keep Apache-2.0 and improve third-party notices |

This is a **target policy** until each repository's changes merge. Consult current `main` and GitHub's detected license before claiming a product's effective license.

## Why Apache-2.0?

It permits use, modification, private use, distribution and commercial use, while requiring relevant copyright and license notices and including an express contributor patent grant. It does not require publishing derivative source, grant trademark rights, or make FRIDAY a dependency of any product. The canonical legal text is each repository's root `LICENSE`.

## Scope and exclusions

- Only original material whose contributors have authority to license is covered. No root license can relicense separately owned code, libraries, icons, photos, fonts, logos, media, sports/team marks, content feeds, calendars, data sources or platform SDKs. Preserve their attribution and license terms in the owning repository.
- FRIDAY, BallerWatch, Kept and Vela product names, marks and identities do not receive a trademark license under Apache-2.0. Do not imply endorsement.
- No license grants credentials, access to private repositories, encrypted `runtime-state`, user-generated content, household records, participant identities, private calendar links or production environments.
- [Play RSVP](https://github.com/nhcuong95/rsvp) is an independently owned upstream project, not a child repository. FRIDAY does not select or modify its license.
- Publishing source publicly is not itself a copyright license. BallerWatch's proposed move from “All rights reserved” to Apache-2.0 is a substantive, generally irrevocable grant for covered contributions and must be reviewed before merge.

## Future contributor and release checklist

1. Verify copyright ownership and any preexisting source license before copying or relicensing code/assets across repositories.
2. Keep the official Apache-2.0 text unchanged in `LICENSE`; identify terms clearly in each README and `package.json` where applicable (`"license": "Apache-2.0"`).
3. Retain dependency notices, required license texts and content credits. Do not claim third-party material is Apache-2.0 merely because it lives in the repository.
4. For a dependency, generated image, fork or imported file, record provenance/terms in the owning repository; obtain permission or replace anything without usable rights.
5. Use each repository's branch/PR and release gates. Licensing/documentation-only merges do not independently authorize production promotion, cloud deployment or device release.
6. If a project needs dual licensing, source-available restrictions, trademark permissions or a contribution agreement later, record a separate owner decision.

See [tracking issue #17](https://github.com/vudh1/friday/issues/17) for this cleanup's status and review evidence. This is project guidance, not legal advice.
