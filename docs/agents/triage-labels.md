# Triage Labels

This repo treats GitHub's live label set as the source of truth. Reconcile this file through an owner-invoked `setup-dev-skills` run when tracker labels change; setup never mutates live labels.

Use this file as `project_profile.label_profile_ref` for this repo. The profile may point to this label vocabulary, but it must not create live labels, rely on lazy label creation, or weaken the safety-floor litany (`start-build` skill, `SAFETY.md#safety-floors`).

Live set for `b-milescu/skills-smoke-omp`, freshly read with `gh api --paginate repos/b-milescu/skills-smoke-omp/labels?per_page=100` on 2026-10-04: ten labels with the descriptions below. No label supplies a Triage Role. The owner's proposed-defaults choice is recorded as this live vocabulary, not permission to create a proposed label set.

## Live label inventory

Descriptions are the live ones, verbatim.

| Label | Category | Meaning / use |
| --- | --- | --- |
| `accessibility` | kind | "Barrier affecting people with disabilities". Optional kind label when an item reports or fixes such a barrier. |
| `bug` | kind | "Something isn't working". Optional kind label when an item reports defective behavior. |
| `documentation` | kind | "Improvements or additions to documentation". Optional kind label for documentation-only or documentation-focused work. |
| `duplicate` | status | "This issue or pull request already exists". A maintainer disposition: apply only once a maintainer has decided, and name the original item in prose. |
| `enhancement` | kind | "New feature or request". Optional kind label for a feature request or addition. |
| `good first issue` | contributor hint | "Good for newcomers". A maintainer judgment: do not apply it on your own. |
| `help wanted` | contributor hint | "Extra attention is needed". A maintainer judgment: do not apply it on your own; it is not the `human_decision` role. |
| `invalid` | status | "This doesn't seem right". A maintainer disposition: apply only once a maintainer has decided, and state the reason in prose. |
| `question` | kind | "Further information is requested". Optional kind label for a question-style item; it is not the `needs_info` role. |
| `wontfix` | status | "This will not be worked on". A maintainer disposition: apply only once a maintainer has decided, and state the reason in prose. |

## Triage Role map

| Triage Role | Live label | Notes |
| --- | --- | --- |
| `afk_ready` | `N/A` | No live label and no readiness inferred from this setup. Issue pickup needs an explicitly approved agent-work state under the shared workflow, verified from the complete issue body and current discussion; no label filter or author assertion alone establishes it. |
| `needs_info` | `N/A` | No live label. State the missing information in the issue/change-request body or a comment instead. |
| `human_decision` | `N/A` | No live label. State the decision request in the issue/change-request body or a comment instead. |

These values are this repo's project-specific vocabulary; reusable skills must read `project_profile.label_profile_ref` instead of assuming label strings globally.

## Agent rules

- Apply only labels listed in the inventory above, and only where an item's content fits the live description.
- Map Triage Role names to live labels through the table above. Every role is `N/A`: describe the state in the issue/change-request body or a comment instead of inventing a label or repurposing a seeded one.
- Do not rely on implicit label handling. Verify each exact label name against the live inventory (`get_label` or an explicitly scoped, paginated `gh api` label read) before any issue write that sets labels.
- Agents and setup never create, rename or delete labels; that is a tracker mutation needing an explicit owner decision. To add triage labels, the owner creates them (agreeing the role names `afk_ready`, `needs_info`, `human_decision` first) and re-runs the `setup-dev-skills` skill so this file records the exact live strings.
- Labels carry no approval, merge or finish authority. No live label here selects AFK-ready work; the shared pickup readiness and independent review requirements still apply.
