# Issue tracker: GitHub

Issues and pull requests for this repo live on GitHub in `b-milescu/skills-smoke-omp` (<https://github.com/b-milescu/skills-smoke-omp>; issues at <https://github.com/b-milescu/skills-smoke-omp/issues>). One repository is the work-item tracker, the code host, the change-request host and the advisory-CI host.

Use the `forge` skill from this verified target clone with the selected [project-native recipes](native-integration.md). These are this project's facts, not an installed shared profile or a default for foreign targets. Configuration here grants no action authority; never auto-run setup, login or install, and never mutate live labels.

## Integration scopes

- Work-item scope: GitHub issues of `b-milescu/skills-smoke-omp` (public repository, issues enabled). There is no separate tracker and no local-filesystem work-item root.
- Code/change-request scope: the same repository, default branch `main`; GitHub pull requests are the change requests. `origin` fetch and push both name `https://github.com/b-milescu/skills-smoke-omp.git` and no other remote exists. The repository is not a fork; the owner confirms no fork: branches are pushed to `origin` and pull requests open inside this repository.
- CI scope: advisory GitHub Actions workflow `check` (job `check`, [`check.yml`](../../.github/workflows/check.yml)) of the same repository. Record run attribution through its `head_sha`, not as proof of the checked-out candidate; see [CI parity](check-gate.md#ci-parity).
- Profile pointer: `profile_path` is [`docs/agents/dev-workflows.md#project-profile-hooks`](dev-workflows.md#project-profile-hooks).
- Integration recipes: `provider.reference` is [`docs/agents/native-integration.md`](native-integration.md), the target-owned document for scopes, tools, pagination, readback, exact-head guarantees, unsupported outcomes and the required-check hold.
- Available operations/tools: the `github` MCP server first (OMP mounts its tools as `xd://mcp__github_*` devices; read each tool's schema before use), then authenticated `gh` for the integration's documented gaps, always naming the repository explicitly. Fresh `gh api user` returned `b-milescu`, immutable ID `102961061`; the parent independently verified the same MCP identity. Fresh `gh api repos/b-milescu/skills-smoke-omp` returned public non-fork repository ID `1404592317`, issues enabled, default `main` and admin permission. Builder, reviewer and parent share this account; identity is not independence or authority. Native self-approval is unavailable and exact-head auto-merge queueing unsupported, as documented in the integration.
- Vocabulary and claiming: [triage-labels.md](triage-labels.md) records ten live labels and no Triage Role labels (`N/A` for each role), without creating proposed defaults or establishing AFK readiness; the [claiming convention](#claiming-convention) is none.

## Repo conventions

- GitHub issues are the tracker items for tasks and PRDs.
- GitHub pull requests are the review vehicle for code, docs, and workflow changes.
- Comments are native issue and PR comments (plus PR reviews); the [project integration](native-integration.md) owns exact tools, complete reads and publication readback.
- Labels follow this repo's live GitHub label set; see [triage-labels.md](triage-labels.md).
- Follow native pagination for complete discovery; lists are not single-item guard evidence.
- Verify the intended repository against the named fetch/push configuration and native repository metadata; never infer work-item scope solely from code-host branding.
- Branch naming is project policy, not a GitHub schema rename. This repo declares it in [`docs/agents/dev-workflows.md`](dev-workflows.md#branch-naming) as `project_profile.branch_naming` (`issue-<id>-<slug>`); shared delivery fields remain `change_request.source` and `change_request.target`.
- Setup-only publication has no allocated issue, no issue claim and no invented closing reference; see [Setup-only applicability](dev-workflows.md#setup-only-applicability). Issue-pickup and issue-bound guard recipes apply when delivering a real issue.

## Claiming convention

This section is the rulebook-documented claiming convention that the shared issue-pickup flow's conditional-claim rule reads: that flow claims a work item only when the target project's rulebook documents such a convention. For this repo the convention is **none**:

- **No claim at pickup:** a delivery session does not assign a work item to itself, add labels or otherwise mark it as taken. Builder, reviewer and parent all act as the one `b-milescu` account, so an assignee would carry no per-session signal.
- **Pickup still re-reads:** immediately before starting work the session re-reads the chosen issue's assignee and state. If either changed since selection, or the issue is already assigned to another active session, it stops and asks instead of opening a competing branch or Draft change request. That procedure lives in the pickup flow (the `start-build` skill, `reference/issue-pickup.md`); this file documents the convention only and does not restate it.
- **Nothing to release:** with no claim there is no release step. No labels are created, the live vocabulary in [triage-labels.md](triage-labels.md) is untouched, and no tooling or enforcement automation is added.

## When a skill says "publish to the issue tracker"

Create a native issue in this verified repository using the `forge` skill's `publish` operation and the [project integration](native-integration.md#publish-one-artifact). Approved plans/specs/PRDs use the `plan-to-issues` skill.

## When a skill says "fetch the relevant ticket"

Read the full referenced issue and all discussion through the `forge` skill's `snapshot` operation and the [project integration](native-integration.md#preflight-and-complete-reads).
