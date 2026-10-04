# Dev Workflows

This repo binds the shared dev workflows to GitHub through the `forge` skill's `preflight` operation.

- Confirmed profile: `skills-smoke-omp` at [`docs/agents/dev-workflows.md#project-profile-hooks`](#project-profile-hooks).
- Selected `provider.reference`: [`docs/agents/native-integration.md`](native-integration.md).
- Intended code/change, work-item and advisory CI scopes: the GitHub repository `b-milescu/skills-smoke-omp` (<https://github.com/b-milescu/skills-smoke-omp>), verified through that document's native preflight.
- Named fetch/push remotes and fork intent: `origin` fetch and push both name `https://github.com/b-milescu/skills-smoke-omp.git`; no other remote exists; the repository is not a fork and the owner confirms no fork.

Shared field guidance is the `setup-dev-skills` skill's `reference/project-profile-facts.json`; it supplies no default target profile. Shared delivery uses the `forge`, `start-build`, `start-review`, `plan-to-issues`, `issue-delivery-loop` and `retro` skills through the confirmed pointers below. Refresh only the systems the requested operation needs; a missing or unsupported action blocks only that operation. Configuration grants no action authority.

## Skills

- **`forge`** — the one provider seam; every shared workflow binds through it.
- **`issue-delivery-loop`** — coordinates bounded batches using the `change-builder` and `change-reviewer-final` routes.
- **`plan-to-issues`**, **`start-build`**, **`start-review`**, **`retro`** — each skill's own `description:` states its scope; invoke them per [Usage rules](#usage-rules).

## Skill activation mechanism

**Skill invocation** means running a skill's `SKILL.md` entry procedure through the runtime skill mechanism. It is distinct from a **reference read**: reading one of a skill's reference or template files for detail after the skill is active. OMP is the only runtime configured here:

- Logical skill IDs stay stable (`forge`, `start-build`, and so on). `autoload-skills` is a native preload request, not execution evidence; preserve the identifier exposed by the effective runtime if a plugin entry is namespaced. A user invokes eligible entries with `/skill:<name>`; user-only entries need that invocation.
- Skill resources resolve as `skill://<name>[/resource]` to installed files. Reading a reference/template supplies that file's content, not proof that the entry procedure or preload ran.
- An available or resolvable entry is not invocation permission: check the skill's frontmatter for user-only restrictions first (`setup-dev-skills` is user-invoked).

A launch prompt (or agent body) names the skill and instructs invocation. Per the minimal-prompt exclusion rule (`start-build` skill, `reference/parent-orchestrator.md#minimal-reviewer-launch-prompt`) it must not name the skill's internal reference files, because a subagent could then satisfy the prompt with a raw reference read that skips the entry procedure. Dev Workflow entries use the shared task-selected specialists policy (`start-build` skill, `reference/context-and-planning.md#task-selected-specialists`); coordinators leave that choice to each actor.

### Setup-only applicability

This owner-invoked `setup-dev-skills` request reconciles confirmed drafts; it is not an issue delivery. The confirmed source branch is `setup-dev-skills`, with a PR against `main`; do not invent a tracker issue, `Closes` reference, AFK-ready state or issue-route invocation to publish it. The parent owns final `bun test` execution, commit, push and one Draft setup PR with native readback. Workers run no tests/build/lint/format and do not publish. Stop after that publication: **never merge this setup PR**, approve it or queue auto-merge. This request-specific limit overrides the standing finish default; a local PASS alone does not mark the Draft ready or authorize a finish.

Issue pickup, `issue-<id>-<slug>`, issue-bound receipts, issue closing references and `start-build`/`issue-delivery-loop` routing apply when a real issue is being delivered, not as prerequisites for setup-only Draft publication. Mandatory independent final review remains the normal issue-delivery policy; no issue-bound review, receipt or preload execution is claimed by this setup.


## Active recipes

Each resource is named as its skill plus the path inside that skill. These name files inside installed skills, not paths in this repo.

- `forge` skill: `SKILL.md` (this target selects [native-integration.md](native-integration.md)), `reference/common-guard.md`
- `issue-delivery-loop` skill: `SKILL.md`
- `start-build` skill: `reference/parent-orchestrator.md`, `reference/parent-owned-gate.md`, `reference/post-merge-verifier.md`, `templates/delivery-schema.md`, `templates/reviewer-lift-schema.md`
- `start-review` skill: `REVIEW-FLOW.md`
- `setup-dev-skills` skill: `reference/project-profile-facts.json` (field guidance only, not this repo's profile)

## Default PR routes

For issue delivery, the parent orchestrates `change-builder` and mandatory independent `change-reviewer-final` (including bounded batches through `issue-delivery-loop`). Resolve each role from the spawning session's effective agent inventory (native route selection: `start-build` skill, `reference/parent-orchestrator.md#native-route-selection`), not from a guessed source filename or basename-only comparison. This repo's same-name OMP declarations ([below](#runtime-project-declarations-and-provenance)) are the intended project routes; verify selection from the intended checkout rather than assuming it. Model and effort follow native selection (`start-build` skill, `reference/parent-orchestrator.md#native-model-and-effort-selection`); the complete declarations pin neither.

Mandatory independent review uses `change-reviewer-final`. A missing route, or one whose effective source is ambiguous, stays a route-unavailable blocker with an explicit parent/operator decision: no review scout, generic fallback, shim, old filename or cross-runtime substitute is allowed.

## Project-profile hooks

Shared workflow records are provider-neutral: `provider`, `repository`, `issue`, `change_request`, `commit`, and `ci`. Their identifiers and locators are opaque outside the selected provider. This repo's profile binds them to GitHub and declares policy hooks through the `start-build` skill's `templates/delivery-schema.md`.

This repo's confirmed profile is declared here, not in installed shared facts. `provider.reference: docs/agents/native-integration.md` resolves from the invoked target clone. Code, work-item and CI scopes are this repository's GitHub repository `b-milescu/skills-smoke-omp`, verified through that document's native preflight.

Confirmed project declaration (owned by this target, not shared field guidance):

```yaml
project_profile:
  profile_id: skills-smoke-omp
  profile_path: docs/agents/dev-workflows.md#project-profile-hooks
  provider:
    name: github
    reference: docs/agents/native-integration.md
  tracker:
    scope: https://github.com/b-milescu/skills-smoke-omp
    reference: docs/agents/issue-tracker.md
  agent_setup_docs:
    root: docs/agents
    issue_tracker: docs/agents/issue-tracker.md
    triage_labels: docs/agents/triage-labels.md
    domain: docs/agents/domain.md
    check_gate: docs/agents/check-gate.md
    coding_guardrails: docs/agents/coding-guardrails.md
    dev_workflows: docs/agents/dev-workflows.md
  label_profile_ref: docs/agents/triage-labels.md
  label_vocabulary:
    reference: docs/agents/triage-labels.md
  gate_policy_ref: docs/agents/check-gate.md#full-local-gate
  check_gate:
    command: bun test
    runtime: Bun 1.4.2
    bootstrap: install Bun 1.4.2; no dependencies, so no install step
  dev_workflows:
    reference: docs/agents/dev-workflows.md
    runtime_declarations:
      omp: .omp/agents/
  language_families: [typescript, markdown, yaml]
  branch_naming:
    pattern: issue-<id>-<slug>
    reference: docs/agents/dev-workflows.md#branch-naming
  ci_parity:
    reference: docs/agents/check-gate.md#ci-parity
  domain_docs:
    reference: docs/agents/domain.md
  release_deploy_policy:
    reference: docs/agents/dev-workflows.md#releasedeploy-policy
  manual_validation_rules:
    reference: docs/agents/check-gate.md#manual-validation-rules
  skill_resources:
    forge: forge/SKILL.md
    common_guard: forge/reference/common-guard.md
    delivery_schema: start-build/templates/delivery-schema.md
    reviewer_lift: start-build/templates/reviewer-lift-schema.md
  resource_addressing:
    target_repo_docs: repo-relative
    runtime_skill_resources: skill-qualified
```

The `skill_resources` values are skill-qualified names (a skill name plus a path inside that skill, per `resource_addressing.runtime_skill_resources`), not paths in this repo. This repo's own docs are repo-relative (`target_repo_docs`).

| Project-profile field | Declaration location for this repo |
| --- | --- |
| `profile_id` / `profile_path` | `skills-smoke-omp` / `docs/agents/dev-workflows.md#project-profile-hooks`. |
| `provider.reference` | [`docs/agents/native-integration.md`](native-integration.md): native scopes, tools and operation recipes. |
| `tracker` | [`docs/agents/issue-tracker.md`](issue-tracker.md): GitHub work-item, code and CI scopes. |
| `agent_setup_docs` | The `docs/agents/` root: tracker, labels, domain, gate, guardrails and workflows docs. |
| `label_profile_ref` / `label_vocabulary` | [`docs/agents/triage-labels.md`](triage-labels.md): live label inventory; no triage-role labels, every Triage Role `N/A`. |
| `gate_policy_ref` / `check_gate` | [`docs/agents/check-gate.md`](check-gate.md#full-local-gate): `bun test` on Bun 1.4.2, no install step. |
| `dev_workflows.runtime_declarations` | `omp: .omp/agents/`; see [Runtime project declarations and provenance](#runtime-project-declarations-and-provenance). |
| `acceptance_surfaces_ref` | Not declared; the Reviewer Lift's fail-closed value `none` applies. |
| `language_families` | TypeScript (Bun), Markdown and YAML. |
| `branch_naming` | This doc's [Branch naming](#branch-naming) section. |
| `ci_parity.reference` | [`docs/agents/check-gate.md`](check-gate.md#ci-parity): advisory CI parity and the project-imposed `check` hold. |
| `domain_docs` | [`docs/agents/domain.md`](domain.md): single-context layout; `CONTEXT.md` and `docs/adr/` absent at setup. |
| `release_deploy_policy` | This doc's [Release/deploy policy](#releasedeploy-policy) section. |
| `manual_validation_rules` | [`docs/agents/check-gate.md`](check-gate.md#manual-validation-rules). |
| `auxiliary_index_policy` | Not declared; no auxiliary project index exists. |

Triage Role names map through this repo's live label vocabulary in [`docs/agents/triage-labels.md`](triage-labels.md); reusable skills must read that mapping instead of assuming a global label string.

Project-profile hooks may specialize this repo's policy, but they must not weaken the safety-floor litany (`start-build` skill, `SAFETY.md#safety-floors`).

### Runtime project declarations and provenance

This repository's complete same-name OMP declarations live in `.omp/agents/`: [`change-builder.md`](../../.omp/agents/change-builder.md) and [`change-reviewer-final.md`](../../.omp/agents/change-reviewer-final.md). They are whole definitions, not overlays or copied skill procedures. Their `autoload-skills` requests canonical `start-build` or `start-review` and `forge`; requested preload is not observed execution. They preserve the target pointers, role/authority bounds and task-selected specialists. No `tools`, `model` or `thinking-level` is declared: tools inherit from the spawning session, and model/effort follow native selection (`start-build` skill, `reference/parent-orchestrator.md#native-model-and-effort-selection`). All task invocations in this setup explicitly select the callable runtime's `model: "@default"`; that requested selection is not resolved-model or effort execution proof.

| Canonical role | Exposed id in this session | Intended project source | Installed plugin-owned source |
| --- | --- | --- | --- |
| Child builder | `change-builder` | `.omp/agents/change-builder.md` | `skills___skills___0.0.0/agents/change-builder.md` |
| Mandatory independent final reviewer | `change-reviewer-final` | `.omp/agents/change-reviewer-final.md` | `skills___skills___0.0.0/agents/change-reviewer-final.md` |

Keep logical skill and route names stable: OMP exposes them as bare ids, and a runtime that namespaces plugin entries would need the identifier its own inventory exposes.

- **Native location/precedence evidence (version-qualified):** read-only inspection found `~/.bun/bin/omp` and local version indicators `~/.omp/agent/last-changelog-version` / `~/.omp/natives/18.6.0`. The available readable package source is **17.3.7**, at `~/.bun/install/cache/@oh-my-pi/pi-coding-agent@17.3.7@@@1/`; matching 18.6.0 implementation was not available. Its `src/task/discovery.ts:73-137` and `src/config.ts:214-249` select nearest project `.omp/agents`, user `~/.omp/agent/agents`, OMP extension roots, marketplace plugin root `agents` (project before user), then bundled agents; first name wins. Direct `.claude/agents` is excluded in that inspected source. These support the chosen native project location; they do **not** independently prove current-binary precedence or actual-session selected source. `[INFERENCE]` a parsed project override wins if the running implementation matches that source and discovers this checkout.
- **Source ownership:** `~/.omp/plugins/installed_plugins.json:13-23` binds user-scoped `skills@skills` version 0.0.0 to `~/.omp/plugins/cache/plugins/skills___skills___0.0.0/`. The installed bare role files are in its root `agents/`, not `agents/omp/`; a local process log also records scanning that root. Installed routes/skill aliases are plugin-owned, never this target's profile, identity, paths, vocabulary or policy.
- **Actual session evidence:** the callable task interface exposes the bare IDs above, but supplies no selected-file binding for either route. Resource reads for `setup-dev-skills` and `start-build` resolved into the installed `skills___skills___0.0.0` cache, establishing accessible resource-source provenance only. No issue-delivery route was launched for this setup; selected agent file, skill preload injection, resolved model and effective effort for those routes remain **unobserved**. Neither matching descriptions nor frontmatter establishes those facts.
- **Allocated/revision checkout evidence is independent:** none was invoked for issue delivery in this setup. Before future launch, inspect that checkout's declarations, then require a runtime discovery/selection trace naming its selected source and canonical skill paths from that spawning context. Observe preload injection and resolved model/effort separately if execution claims are needed. A parent's inventory or source read does not verify an independently invoked checkout; an ambiguous required route remains blocked under native route selection. Do not patch external runtime state to manufacture proof.
- **Cache limits:** inspected 17.3.7 `src/task/index.ts:444-486` memoizes creation-time discovery by cwd, while `src/task/structured-subagent.ts:254-255` rediscovers at execution; plugin roots have a distinct cache (`src/discovery/helpers.ts:916-927`) and preload selection uses inherited session skills (`src/task/structured-subagent.ts:365-370`). Do not claim one universal session cache or automatic refresh after a cwd/file change. Refresh/restart is an operator action outside setup; its outcome still needs actual selection evidence.
- **Other runtimes:** no `.claude/agents/` declarations are configured here. The inspected native source excludes that direct directory, but current-binary behavior and Claude route/precedence/model/effort execution are unverified. A future additional runtime needs owner-invoked setup and its own native evidence.

### Branch naming

For issue delivery, use source branches named `issue-<id>-<slug>`, where `<id>` is the actual GitHub issue number and `<slug>` a short kebab-case summary (for example `issue-7-add-subtract` for issue #7). Setup-only work retains the owner-confirmed `setup-dev-skills` branch without inventing an issue. Provider-native source/target shapes remain inside the selected provider reference; the shared schema uses `change_request.source` and `change_request.target`. This is project policy, not a native identifier validator.

### Review approval / merge policy

Approval authority is separate from Finish authority (`start-review` skill, `REVIEW-FLOW.md#approval-authority-policy`). Native approval is unavailable here: GitHub refuses `APPROVE` from a pull request's author, and every role (builder, reviewer, parent) acts as the one `b-milescu` account. [Native integration](native-integration.md#ready-approval-and-finish) owns the native approval mechanics and their unsupported outcomes; no approval is ever claimed.

Merge, auto-merge queueing, release, deploy, close, and source-branch cleanup authority remain separate. Each requires an explicit `Finish authority` value and a verifiable `Finish authority source`, and approval never implies them. The one project default below is that value for the parent's direct merge.

Parent-managed dev-flow finish ownership is explicit: `Finish owner: parent`. In the `issue-delivery-loop` skill's parent-orchestrated child-builder plus final-reviewer mode, the parent owns the exact-head direct merge after a fresh guarded pass review, under the project default below. The reviewer owns only the Review Report verdict and evidence: it records approval `not-approved` and finish `none`, then routes `Next action: finish-by-authorized-actor` back to the parent as the authorized finisher.

#### Finish authority default

This section is the verifiable `Finish authority source` for the one project default. Quote this claim in the Reviewer Lift `Finish authority` row; the finisher verifies it through the common guard (`forge` skill, `reference/common-guard.md`):

`project default: the parent finisher may directly merge the reviewed head bound to its exact SHA once the required check "check" passes, with no queueing`

The default applies only when it is the value quoted in that row: an explicit human/parent grant takes precedence over it, so an explicit `queue auto-merge` grant is refused as `sha-bound-action-unsupported` even though this default exists. It grants the `Finish owner: parent` finisher only the exact-head direct merge, using the `merge` method ([native integration](native-integration.md#ready-approval-and-finish)), after a fresh guarded pass review, a valid exact-candidate Gate Receipt and the common guard, held until the required check `check` has succeeded on the reviewed SHA. The finisher waits out a pending `check` per the [wait recipe](native-integration.md#wait-for-required-checks) within the default 30-minute required-check wait budget (`start-build` skill, `reference/parent-orchestrator.md#required-check-wait-budget`), then re-runs the whole guarded finish; a failed `check`, or an elapsed budget, leaves the PR unmerged and blocked.

GitHub does not enforce `check` on this repo: `main` has no branch protection or ruleset, so the hold is project-imposed and applied by the finisher, not a GitHub outcome. It only holds an otherwise-eligible merge. It never authorizes one and is never a quality gate: provider CI stays advisory, and any CI status never changes verdict, review, approval, authority or eligibility ([CI parity](check-gate.md#ci-parity)). Optional operator follow-up, outside setup and assumed nowhere: branch protection on `main` requiring `check` would let GitHub enforce the hold natively.

The default grants nothing else: not queueing (this repo's GitHub binding refuses it as `sha-bound-action-unsupported`), and not a reviewer's own merge, release, deploy, close or source-branch cleanup.

### Release/deploy policy

No release/deploy path is configured: the only workflow is advisory `check`, and `package.json` is `private: true` with no publication scripts. This is configuration evidence, not a claim about all historical publishing. Release actions (tags, GitHub releases, publication) require explicit human authority and a source cited in the PR. This policy grants no merge, queueing, release, deploy or operator authority.

## Usage rules

- Invoke the `forge` skill before shared workflow reads or actions; this target's confirmed integration is [native-integration.md](native-integration.md).
- Before converting an approved plan into tracker issues, invoke the `plan-to-issues` skill after the `forge` skill's `preflight`.
- For issue implementation, invoke `start-build`; for independent change review, invoke `start-review`. Do not invoke issue-delivery routes for setup-only reconciliation; follow [Setup-only applicability](#setup-only-applicability).
- Missing or stale setup is the owner's call: they re-run the `setup-dev-skills` skill. Agents never auto-run it, authenticate or install, or mutate live labels.
- Project docs in `AGENTS.md`, `docs/agents/`, and (when present) `CONTEXT.md` and ADRs override generic skill defaults where stricter; none of them weakens the safety floors (`start-build` skill, `SAFETY.md#safety-floors`).
