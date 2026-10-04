# Check Gate

Local commands agents should run before claiming a change is ready in this repo.

## Full local gate

Run the full local gate against the exact candidate before marking work ready:

```bash
bun test
```

Expected result: exit code `0`. Use exactly `bun test` as the gate command in Gate Receipts and Review Packets.

The runtime is Bun 1.4.2: [`.github/workflows/check.yml`](../../.github/workflows/check.yml) pins `bun-version: 1.4.2`, and the parent freshly observed local `bun --version` as `1.4.2` on 2026-10-04. The repo declares no other pin (no `.bun-version`, `engines` or `packageManager`).

**Fresh checkout or worktree bootstrap:** install Bun 1.4.2. The repo has no dependencies and no lockfile, so there is no install step. `bun test` itself needs only Bun; the exact-candidate flow also needs `git` to materialize and record the candidate checkout.

Use `Local gate: PASS — bun test` in PR Review Packets only after observed execution succeeds on that exact candidate. This setup reconciliation carries no prior-gate PASS evidence: workers run no tests/build/lint/format, and the parent runs `bun test` exactly once on the final candidate.

For parent-owned gate selection, this policy and the bootstrap route above already support an exact-candidate `bun test` receipt. A fresh worktree needs Bun 1.4.2 and nothing else, so it does not lack gate policy. Record the parent as the bootstrap/gate executor without requiring a full gate pass before implementation. If Bun 1.4.2 cannot be provided, report that specific prerequisite, not an N/A parent receipt or an automatic ownership change. These are selection rules, not a report of an observed local failure. Generic cases, including issues that add a gate, are owned by the `start-build` skill (`reference/context-and-planning.md#check-gate-discovery`).

## Project-profile refs

Use this file as this repo's confirmed `project_profile.gate_policy_ref`. The declared `ci_parity.reference` points to [CI parity](#ci-parity); `manual_validation_rules.reference` points to [Manual validation rules](#manual-validation-rules). The exact-candidate full local gate is `bun test`; CI is advisory.

These project-owned facts are declared here and in the confirmed [profile](dev-workflows.md#project-profile-hooks), never inferred from installed shared field guidance.

Project-profile hooks may specialize project policy, but they must not weaken the safety-floor litany (`start-build` skill, `SAFETY.md#safety-floors`).

## Gate coverage for ready handoff

This repo's `Gate coverage` is `exact-candidate-local`. `bun test` must pass on the exact PR head SHA; in parent-owned mode the durable Gate Receipt records that command, candidate, and PASS result. This singular local gate is the required quality evidence for ready, review, and finish.

The `check` CI job runs the same command/runtime (see [CI parity](#ci-parity)), but its default PR checkout is an integration ref rather than guaranteed exact-head coverage. It is advisory parity evidence, not another delivery gate. Record its locator, status and attribution SHA when available, preserving execution-binding limits. Pending, failed, canceled, skipped, missing, stale, wrong-SHA or unavailable CI never changes verdict, authority or action eligibility. The finish default's `check` condition is a separate project-imposed hold, described under [CI parity](#ci-parity).

## Targeted checks

Use authorized targeted checks during ordinary development, then the full gate before review. The setup-specific parent-only/final-once instruction above overrides mid-flight check suggestions.

| Area | Command | Notes |
| --- | --- | --- |
| Tests (one file) | `bun test src/math.test.ts` | Optional targeted test; never substitutes for the exact-candidate full gate. |
| Tests (by name) | `bun test -t <pattern>` | Optional test-name filter; confirm CLI support when actually needed. No help/check invocation is claimed by this setup. |
| Lint / format | none configured — N/A | No linter or formatter is configured. Match existing style (see [coding guardrails](coding-guardrails.md)). |
| Typecheck / compile | none configured — N/A | No `tsconfig.json` or typecheck script exists. Bun transpiles TypeScript without typechecking, so a passing `bun test` is not a typecheck. |
| Docs / generated files | none configured — N/A | No generated files, and no Markdown, YAML or link checker. Verify links, anchors and YAML by reading (see [Manual validation rules](#manual-validation-rules)). |

## Discovery notes

Where these commands came from:

- [`package.json`](../../package.json): `scripts.test` is `bun test`; `private: true`, `type: module`; no dependencies, no `engines` field, and no lockfile in the tree.
- [`.github/workflows/check.yml`](../../.github/workflows/check.yml): job `check` installs Bun 1.4.2 and runs `bun test`.
- [`src/math.test.ts`](../../src/math.test.ts): the only test file; it imports from `bun:test`.
- [`README.md`](../../README.md) names no commands. No `CONTRIBUTING.md`, `Makefile`, local scripts, `tsconfig.json`, linter or formatter configuration exists.
- Parent read-only runtime observation on 2026-10-04: Bun 1.4.2. This is bootstrap evidence, not a test result.

## CI parity

[`.github/workflows/check.yml`](../../.github/workflows/check.yml) mirrors the local command and runtime, not necessarily the exact candidate checkout:

- Advisory GitHub Actions workflow `check` with a single job `check` (check-run name `check`) on `ubuntu-latest`. Triggers: `pull_request` and `push` to `main`.
- Steps: `actions/checkout@v4`, `oven-sh/setup-bun@v2` with `bun-version: 1.4.2`, then `bun test`. There is no dependency install step. Command/runtime parity is configured, not proof of observed execution.
- `actions/checkout@v4` specifies no `ref`: on `pull_request` its default checkout is the PR integration ref, not guaranteed the exact PR head. Workflow-run `head_sha` is attribution metadata and does not prove the checked-out commit. Record observed run locator, status and `head_sha` with that limitation; a `push` run on `main` is attributed to its result commit, never substituted for the local exact-head receipt.

CI is advisory. Any CI status or absence — pending, failed, canceled, skipped, missing, stale, wrong-SHA, unavailable — never changes verdict, review, approval, authority or eligibility, and never replaces the exact-candidate local gate. Do not add CI-only validation unless it is first added to the local gate and documented here; keep the Bun pin and command in `check.yml` and in this file in step.

**Required-check hold (project-imposed).** GitHub enforces nothing on `main`: it has no branch protection and no rulesets (read-only checks on 2026-10-04: the protection endpoint answered "Branch not protected"; rulesets and branch rules were `[]`). GitHub therefore never holds a merge for `check`. The finish default in [dev-workflows.md](dev-workflows.md#finish-authority-default) makes `check` a project-imposed hold applied by the finisher, specified in [Ready, approval and finish](native-integration.md#ready-approval-and-finish) and waited out as in [Wait for required checks](native-integration.md#wait-for-required-checks) within the default 30-minute budget. It only holds an otherwise-eligible merge: it never authorizes one, never changes verdict, review, approval or authority, and is not a quality gate. A failed `check`, or an elapsed budget, leaves the PR unmerged and blocked.

## Manual validation rules

Manual validation is supporting evidence only when automation cannot cover the change. `bun test` runs only the repo's test files, so it does not exercise Markdown, YAML or agent-declaration changes (docs, `.omp/agents/`, the workflow file). For those, record exactly what was inspected (for example that links and anchors resolve and that YAML parses), bind the evidence to the reviewed SHA, and redact secrets. Manual validation never replaces `bun test` for ready-marking unless the PR records a specific, reviewed exception.

## When the gate cannot be run

If Bun 1.4.2 is unavailable or `bun test` cannot run, say so in the change request: name the specific missing prerequisite and include the best targeted evidence available (for example `bun test src/math.test.ts`, labelled with the Bun version actually used). Do not claim `PASS` for a gate that did not run, and do not substitute CI status for a local run. In parent-owned mode report the prerequisite, not an N/A parent receipt.
