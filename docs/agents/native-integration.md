# b-milescu/skills-smoke-omp native integration

Project-owned integration selected by `provider.reference` in
[the project profile](dev-workflows.md#project-profile-hooks). These are this
repository's facts, not reusable target defaults. Read this document from the verified
target clone. The `forge`, `start-build` and `start-review` skills are installed with the
runtime, not stored here: this document names their resources skill-qualified and never
links into them.

## Scope and transport

Code, pull requests, work items and advisory CI use the public GitHub repository
<https://github.com/b-milescu/skills-smoke-omp> (`b-milescu/skills-smoke-omp`), default
branch `main`; it is not a fork and issues are enabled. Named `origin` fetch and push must
both name it (`https://github.com/b-milescu/skills-smoke-omp.git` when this integration was
confirmed; no other remote exists and no fork intent is confirmed); resolve fork or
alternate-remote intent explicitly rather than selecting the first remote. Project agents
(`.omp/agents/`) declare no `tools` and inherit the parent session's tools, so
authentication is supplied by the parent's mounted `github` MCP connection and, for the
documented gaps below, the logged-in `gh` CLI; never inspect or print credential stores or
tokens. Every MCP call names `owner="b-milescu"` and `repo="skills-smoke-omp"` (only
`get_me`, which takes no arguments, is exempt); that explicit pair is the destination
binding. Opaque records map to repository-scoped issue/PR numbers, commit SHA, workflow run
and check-run IDs and comment/review IDs **after** native binding:

| Record | Native form |
| --- | --- |
| Issue locator | `https://github.com/b-milescu/skills-smoke-omp/issues/<n>` |
| Change-request locator | `https://github.com/b-milescu/skills-smoke-omp/pull/<n>` |
| Durable note id | `issuecomment-<id>` (comment on a PR or issue) or `pullrequestreview-<id>` (PR review) |
| Report locator | `review-report:b-milescu/skills-smoke-omp#<pr>:<round>`, chosen before publication |

Repository facts freshly read on 2026-10-04 through `gh api repos/b-milescu/skills-smoke-omp`,
MCP identity/branch/workflow/label/list reads and the local workflow. These are mutable
settings, not future guarantees; re-read before relying on them:

- Scope identity: repository ID `1404592317`, node ID `R_kgDOU7hgvQ`, public, non-fork,
  issues enabled, default branch `main`; CLI permissions are `admin`, `maintain`, `push`,
  `triage` and `pull`. Both CLI and MCP authenticate as `b-milescu`, user ID `102961061`.
- Merge settings: only merge commits are allowed (`allow_merge_commit` true, squash and
  rebase merges off); `allow_auto_merge` is false; `delete_branch_on_merge` is true.
- `main` is unprotected: `gh api repos/b-milescu/skills-smoke-omp/branches/main/protection`
  answers HTTP 404 `Branch not protected`; REST `.../rules/branches/main` returns `[]`.
  MCP `repository_ruleset_read(level="repository", method="list", includes_parents=true)`
  returns `[]`; `method="get_rules_for_branch", branch="main"` returns all rule fields
  `null`. These reads found no applicable branch protections, required checks/reviews or
  merge queue; GitHub does not hold this branch's merges for `check`. See
  [Project-imposed required-check hold](#project-imposed-required-check-hold).
- CI: workflow `check` (id 374699076, `.github/workflows/check.yml`, triggers `pull_request`
  and `push` to `main`) has one job, `check` (check run `check`), that runs `bun test` on
  Bun 1.4.2, the same command as the local gate ([CI parity](check-gate.md#ci-parity)).
- Identity: one account, `b-milescu` (user ID `102961061`, admin permission), serves
  builder, reviewer and parent.
- Resume observation, before setup publication: complete MCP reads found only `main`
  at `ad33878c3e90dd1f20efc208d558d68017de48ce`, zero PRs in all states and zero issues
  (`hasNextPage=false`). No remote `setup-dev-skills` branch or setup PR exists at this
  observation; the owner's existing local branch/drafts are not a conflict.
- Live labels: `accessibility`, `bug`, `documentation`, `duplicate`, `enhancement`,
  `good first issue`, `help wanted`, `invalid`, `question`, `wontfix` (MCP `totalCount=10`,
  cross-checked by paginated REST). No live label was changed.

Setup exercised only read-only GitHub operations and CLI help/template reads. No body
publication/readback equality, ready transition, self-review refusal, merge, queue or
post-merge cleanup outcome was exercised. Those recipes are schema/help/provider-contract
backed; each still requires fresh guards and native outcome evidence when authorized.
The existing successful `push` run `37214985619` belongs to the baseline SHA above, not
to a new setup candidate and not to a local Gate Receipt.

Use mounted tools documented under `xd://mcp__github_<tool>` (OMP): read the tool's schema
before use, then write its JSON arguments to that path. The `tool(arg=value)` shorthand in
this document always carries the owner/repo pair; `pull_request_read(method="get")` is:

```text
{"method": "get", "owner": "b-milescu", "repo": "skills-smoke-omp", "pullNumber": <n>}
```

written to `xd://mcp__github_pull_request_read`. Response fields are named as in GitHub's
REST API (`head.sha`, `merged`, `mergeable_state`, `user.login`, `commit_id`, ...); an MCP
result that does not carry a field a guard needs falls under the gaps below, read through
the matching `gh api` or `gh pr view` form.

MCP first. `gh` fallback only for a documented unavailable-tool, pagination or merge
robustness gap, after all non-transport guards. The documented gaps, which no mounted
`github` MCP tool covers (checked against the mounted tool list when this document was
written), are:

- repository metadata and merge settings, and the classic branch-protection read
  (`repository_ruleset_read` reads rulesets only): `gh repo view`, `gh api`;
- closing-reference, merge-state and merge-commit fields: `gh pr view --json`;
- check runs keyed by an exact SHA (`pull_request_read` `get_check_runs` reads only the
  pull request's current head commit): `gh api .../commits/<sha>/check-runs`;
- merge-commit parents and branch containment (`compare`): `gh api`;
- source-ref reads and source-branch deletion (no exact ref read or delete tool, and
  `merge_pull_request` has no branch-delete option): `gh api .../git/ref/...`;
- `--paginate` completeness and byte-exact body readback: `gh api`.

Run exact command help first and verify flags (this document was checked against `gh`
2.102.0); cache help only in this run/context and invalidate on CLI version, command or
repository change. Name the repository on every `gh` command (`-R b-milescu/skills-smoke-omp`,
a positional `b-milescu/skills-smoke-omp` or a `repos/b-milescu/skills-smoke-omp/...` path),
never by CLI inference from the working directory and never through the `{owner}` and
`{repo}` placeholders (`gh api` fills those from the current directory).
Before using these CLI forms, require the non-secret `GH_HOST` to be unset or `github.com`
and reject alternate host routing; otherwise explicitly select `--hostname github.com`
for `gh api` and `github.com/b-milescu/skills-smoke-omp` for repository selectors.
No fallback for stale head, binding, identity, authority, unsafe text, missing receipt
or failed post-read.
Native post-read remains mandatory; unavailable readback means unverified, not success. The
sections below follow forge's operations: preflight, snapshot, publish, act (ready,
approval and finish) and post_merge_snapshot. All five need only this one GitHub
repository; no other system's authentication is required. An unavailable tool is an
evidence limit: record it, keep this configuration, and block only the operation that needs
it.

## Preflight and complete reads

1. Compare the intended repository against the named local remotes and a fresh repository
   read:

   ```text
   git remote -v
   gh repo view b-milescu/skills-smoke-omp --json nameWithOwner,url,defaultBranchRef
   ```

   Verify host, name, URL and default branch, not an ID alone: `nameWithOwner` is
   `b-milescu/skills-smoke-omp`, `url` is `https://github.com/b-milescu/skills-smoke-omp`,
   `defaultBranchRef.name` is `main`, and `origin` fetch and push both name that repository.
   Read `gh api repos/b-milescu/skills-smoke-omp` for the numeric repository ID, fork/issues,
   merge settings and caller permissions; compare them within that verified scope.
2. `get_me()` captures caller identity (login and numeric ID) at entry; `gh api user --jq .login`
   (`--jq .id` for the numeric ID) must name the same account whenever both transports are
   used. Retain the immutable identity (`b-milescu`, ID `102961061` when this integration was
   confirmed) and re-read it immediately before each write; a different login or ID stops the
   action. One account serves every role, so identity proves neither independence nor
   authority.
3. `issue_read(method="get")` and every page of `issue_read(method="get_comments")` read the
   full work item before pickup. Verify open state and assignees and re-read before
   authoring/launch. The [claiming convention](issue-tracker.md#claiming-convention) is none,
   so pickup writes no assignee, but the pre-launch re-read of assignee and state still
   applies.
4. Lists (`list_issues`, `list_pull_requests`, labels, actions, comments, reviews, files and
   commits) are discovery. No label selects ready work (every Triage Role is `N/A` in the
   [Triage Role map](triage-labels.md#triage-role-map)): require an explicitly approved
   agent-work state plus the complete issue body/discussion, never inferred readiness from
   a label or prose alone. Cursor lists (`list_issues`, `get_review_comments`) follow
   `pageInfo.hasNextPage` and `endCursor` via `after`; a missing next cursor while
   `hasNextPage=true` is incomplete. Page-based methods use `page`/`perPage` (at most 100)
   until a short or empty page, or a returned total proves completeness. Record the
   terminating page/cursor and preserve partiality on caps/errors. Nested review-thread
   comments need their own completeness evidence; recover missing comments through REST.
   `list_label` has no pagination arguments: compare its returned length to `totalCount`,
   recovering through `gh api .../labels?per_page=100 --paginate` when needed.
   `gh api --paginate --slurp` collects native pages; gh 2.102.0 rejects combining `--slurp`
   with `--jq`/`--template`, so process collected JSON separately. Prefer direct
   single-record reads for decisions. Client-truncated bodies are recovered by native GET
   to a file; they are never lossless content.
5. PR state, source, target and head come from a fresh `pull_request_read(method="get")` or
   the body-free
   `gh pr view <n> -R b-milescu/skills-smoke-omp --json number,state,isDraft,headRefName,headRefOid,baseRefName,mergeStateStatus,closingIssuesReferences,author`,
   which also supplies the closing-reference and merge-state fields (`author.login`; the
   numeric ID comes from `get`). Review needs complete `get_files` (GitHub lists at most 3000
   files and omits `patch` for binary diffs and, at times, large ones; a missing `patch` on
   anything but a pure rename, mode change or empty file is incomplete evidence),
   `get_commits` (at most 250), `get_review_comments`, `get_reviews` and `get_comments`
   pages. Compare the number of files and commits read with the `changed_files` and
   `commits` counts of the fresh `get`; truncation is not a complete diff.

The issue pickup/allocated-item/`Closes`/`issue-<id>-<slug>` prerequisites here apply to
issue delivery. This owner-confirmed setup-only request has no allocated issue: retain
`setup-dev-skills`, record issue linkage as not applicable, and publish a Draft PR against
`main` without an invented issue or closing keyword. Its explicit stop-after-PR/no-merge
instruction overrides the standing project finish default; it grants neither ready,
approval, merge, queueing nor cleanup.

## Snapshot and receipt evidence

No single read returns handoff evidence. Compose the snapshot from fresh `pull_request_read`
calls: `get` (author login and ID, state, draft, head SHA, description carrying the Review
Packet and Reviewer Lift), `get_files`, `get_reviews` (Review Reports: reviewer,
`commit_id`, body), `get_comments` (Gate Receipts and action notes: author, body) and
`get_check_runs`, plus `issue_read(method="get")` for the linked issue. Extract Lift, report
and receipt claims locally from those read-back bodies. Verify the current head SHA, each
artifact's author (`user.login`, never a commit author) and that it belongs to this PR; the
four head/author bindings (Lift reviewed SHA, report reviewed SHA and receipt commit each
equal the head; finding bindings match the report) stay claims until then. Extraction alone
is not local receipt validity or execution proof.

To materialize the reviewed commit for local checks, fetch `refs/pull/<n>/head` from the
verified `origin`, require `FETCH_HEAD` to equal the reviewed SHA and add the detached
worktree at that SHA; never an arbitrary `git pull`:

```text
git fetch origin refs/pull/<n>/head
git rev-parse FETCH_HEAD
git worktree add --detach <worktree> <reviewed SHA>
```

Advisory CI is workflow `check`, job and check run `check` (`.github/workflows/check.yml`).
It runs on `opened`, `synchronize` and `reopened` (GitHub's default `pull_request` activity
types; the workflow sets none) and for Draft PRs too; GitHub does not run `pull_request`
workflows for a PR with a merge conflict, so none appears until it is resolved. Read it with
`pull_request_read(method="get_check_runs")` (current head only), with
`gh api 'repos/b-milescu/skills-smoke-omp/commits/<sha>/check-runs?check_name=check'` (an
exact SHA), or with `actions_list(method="list_workflow_runs")` (`resource_id="check.yml"`,
`workflow_runs_filter` branch/event), `actions_get(method="get_workflow_run")` (`head_sha`,
`status`, `conclusion`), `actions_list(method="list_workflow_jobs")` and `get_job_logs`;
`gh run list --workflow check.yml --commit <sha> -R b-milescu/skills-smoke-omp --json databaseId,headSha,event,status,conclusion,url`
is the SHA-filtered run fallback. Attribute a status only to a run whose `head_sha` equals
the candidate (a `pull_request` run reports the PR head) or, after merge, to the `push` run
on `main` whose `head_sha` is the merge commit. Record the Lift `CI pipeline` cell as
`evidence=<run URL>; status=<conclusion, or status while not completed>; commit=<head_sha>`.
With the present `actions/checkout@v4` default, a PR workflow checks the PR integration
ref, not necessarily the exact head; see [GitHub's pull-request event contract](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request)
and [checkout defaults](https://github.com/actions/checkout/tree/v4#usage).
Run `head_sha` attribution is evidence association, not exact-head execution proof.
Failed, missing or pending CI changes no verdict, review, approval, authority or
eligibility; its only effect is the finisher's
[project-imposed hold](#project-imposed-required-check-hold) on an otherwise-eligible direct
merge. A watcher (`gh run watch`, `gh pr checks --watch`) is advisory progress only, never a
local gate and never the hold's wait, which polls as in
[Wait for required checks](#wait-for-required-checks).

Run the gate helper from the installed `start-build` skill, never from this checkout:
resolve `scripts/validate-gate-receipt.mjs` inside the installed start-build skill (the
skill the runtime loaded; in OMP, reading `skill://start-build` prints the loaded `SKILL.md`
path, and its directory is `<start-build-dir>` below) and run it by that resolved absolute
path. A PR must not be validated by its own modified validator, and any copy under the
checkout is code a PR may change. Follow the canonical owner/mode contract in the
`start-build` skill (`reference/parent-owned-gate.md`), selecting the recipe from the
actual `Gate owner`. Every flag takes exactly one value, so the two-word gate command is
quoted (`--gate-command "bun test"`) and must equal the receipt's `command` exactly; `<id>`
values are the records-table locators (`change_id` is the Change-request locator and
`issue_id` the Issue locator, identical in the receipt and on the command line); the policy
is `docs/agents/check-gate.md#full-local-gate` ([Full local gate](check-gate.md#full-local-gate)).

- **Parent:** validate the receipt and the current candidate Lift before publication:

  ```text
  bun <start-build-dir>/scripts/validate-gate-receipt.mjs --owner parent --mode pre-post --receipt <receipt> --review-packet <packet> --change-id <id> --issue-id <id> --reviewed-commit <commit> --gate-command "bun test"
  ```

  The validator refuses `--gate-receipt-locator` and `--gate-policy-ref` in this mode. After
  publication and readback, validate the same receipt and current Lift against the sole
  labelled `Gate Receipt` pointer (the Gate Receipt comment's durable note id,
  `issuecomment-<id>`) and the policy, which the Lift's `Gate coverage rationale` names as
  `Policy docs/agents/check-gate.md#full-local-gate`:

  ```text
  bun <start-build-dir>/scripts/validate-gate-receipt.mjs --owner parent --mode post-note --receipt <receipt> --review-packet <packet> --change-id <id> --issue-id <id> --reviewed-commit <commit> --gate-receipt-locator <sole opaque pointer> --gate-command "bun test" --gate-policy-ref docs/agents/check-gate.md#full-local-gate
  ```

- **Builder:** validate only the existing restricted builder receipt shape:

  ```text
  bun <start-build-dir>/scripts/validate-gate-receipt.mjs --owner builder --mode pre-post --receipt <receipt> --reviewed-commit <commit> --gate-command "bun test"
  ```

  Builder `post-note` and the parent-only binding flags (`--change-id`, `--issue-id`,
  `--review-packet`, `--gate-receipt-locator`, `--gate-policy-ref`) are refused. Verify
  `present_anchor` (the read-back comment body has the standalone `gate_receipt:` anchor) and
  `receipt_commit_eq_head` (its `checkout_commit` equals the fresh PR head) independently;
  GitHub offers no handoff-evidence tool, and parent-only post-note validation is not builder
  proof.
- **Lift only:** receipt-independent, in either owner context:

  ```text
  bun <start-build-dir>/scripts/validate-gate-receipt.mjs --mode lift-only --review-packet <packet>
  ```

  It checks required nonempty rows, unique markers and duplicate rows only: presence, not row
  values, authority, execution or native identity, and it replaces neither receipt validation
  nor native verification.

GitHub has no native receipt extractor, so the read-back comment body is the extraction
source and the local validator parses that same text (the read-back file is byte-identical to
the authored source after the [readback comparison](#publish-one-artifact)). Separately
verify exact `checkout_commit`, `command` and `result` as read back, candidate binding and
artifact author/custody/scope (comment `user.login` equals the verified identity, on this
PR). Actual exact-candidate `bun test` execution and original-log custody follow
[Check Gate](check-gate.md#full-local-gate); readable custody alone is not execution proof.
[Authored-source publication readback](#publish-one-artifact) is another required proof.
Local validity, read-back extraction or a body digest substitutes for none of these proofs.

## Publish one artifact

Run `forge`'s common mutation guard for every publication, including binding, authority,
immutable identity refreshed immediately before the write and exactly one mutation.
Run common no-echo text validation before every body write (titles, descriptions, comments,
reviews, issue bodies): resolve `scripts/validate-text.mjs` inside the installed `forge` skill
(the skill the runtime loaded, never a copy in this checkout, for the same reason as the gate
helper above) and run it by that resolved absolute path. `<forge-dir>` is that installed
directory and `<run-dir>` an absolute run directory outside the checkout under review:

```text
bun <forge-dir>/scripts/validate-text.mjs --input <run-dir>/envelope.json
```

The envelope is exactly `{"role":"<role>","content":"<authored string>"}`, with a role from
`title`, `description`, `note`, `review-packet`, `receipt`, `report`, `body` (the role only
labels diagnostics). Build it from the source file so both carry the same string; failures
print role, offset and type only, never body text:

```text
bun -e 'console.log(JSON.stringify({role: process.argv[1], content: new TextDecoder("utf-8", {fatal: true, ignoreBOM: true}).decode(await Bun.file(process.argv[2]).bytes())}))' <role> <run-dir>/source.md > <run-dir>/envelope.json
```

No mounted `github` tool validates body text, so that check is the only text guard. Preserve
the authored UTF-8 source byte for byte, including any trailing LF or BOM; strict decoding
above rejects invalid UTF-8 instead of replacing it. Redact secrets before authoring.
Observe each native endpoint's size limits; oversize content is a transport blocker,
never truncated or split.
Readback must equal the source byte for byte: no GitHub normalization is documented for this
repository, so none is tolerated. Recover the exact body with a native GET and compare it to
the source without printing it:

```text
gh api repos/b-milescu/skills-smoke-omp/<resource> --template '{{.body}}' > <run-dir>/readback.md
cmp <run-dir>/readback.md <run-dir>/source.md
```

`<resource>` is `issues/comments/<id>` (comment), `pulls/<n>/reviews/<id>` (review),
`pulls/<n>` (PR description) or `issues/<n>` (issue). The template prints the body with no
added newline and no escaping, so a clean `cmp` is the only success. MCP reads of the same
record serve discovery and metadata, not byte comparison; a `sha256` of the readback is only
the same comparison, never a substitute for the source.

- Draft: push the source branch to the verified `origin` (it must be ahead of `main`; GitHub
  refuses a PR without a commit difference), then `create_pull_request` once with
  `head=<source_branch>`, `base="main"`, `title`, `body` and `draft=true`. The description
  contains plain `Closes #<issue_number>` outside code spans for issue delivery only;
  setup-only publication uses the exception above. Re-read PR state, draft, head and base
  and the complete description (readback comparison on `pulls/<n>`).
- Description: `update_pull_request` once with `pullNumber` and only `body`, so draft state,
  title and base stay untouched; native metadata and complete description readback must
  preserve Draft/ready state and candidate.
- Review Report: `pull_request_review_write` once with `method="create"`, `event="COMMENT"`,
  the report as `body` and `commitID=<reviewed SHA>`. `event` is always set, because an
  event-less call leaves an unpublished pending review. Retain the review ID
  (`pullrequestreview-<id>`) and read the exact review back (`pull_request_read` with
  `get_reviews`, then the readback comparison on `pulls/<n>/reviews/<id>`). A Review Report is
  a PR review, never a comment on the linked issue.
- Gate Receipt, Review Packet delta or action note: `add_issue_comment` once with the PR number
  as `issue_number`; retain the returned comment ID (`issuecomment-<id>`) and read it back. A
  comment has no title, so its first heading line is the note title. Published artifacts are
  never repaired with `update_issue_comment`: a Gate Receipt or action note is never edited
  afterwards.
- Issue note: `add_issue_comment` once with the issue number, then exact comment readback.
- Issue: `issue_write` with `method="create"`, `title`, `body`, `labels` and `assignees`, after
  `get_me()` verifies identity and `get_label` verifies every label name exists (an unverified
  name never reaches the write; see the
  [agent rules](triage-labels.md#agent-rules)). Local numbers alone never verify scope.
- Assignee, labels, body: `issue_write` with `method="update"`, `issue_number` and only the
  scoped field. Assignees and labels **replace** the whole set: read the live set, compute the
  complete final set (non-overlapping adds/removes), send it whole and re-read the final
  state. A body update re-reads and byte-compares like any published artifact. Setup and these
  recipes never create, rename or delete labels.

Classify every creation as verified-created, not-created, created-unverified or unknown:

- verified-created: the returned ID reads back with every submitted field and a body that
  passes the readback comparison;
- created-unverified: the ID is known but readback is missing, unavailable or mismatched.
  Retain the ID and recover GET-only (re-read that record), report the gap, and never repair
  it with another mutation;
- not-created: a definitive native refusal proves creation did not occur. A failed
  bounded read is not such proof, and verified non-creation does not authorize retry.
- unknown: no ID came back (timeout, transport loss). Reconcile with bounded native reads,
  never repeat the write: a PR through `list_pull_requests` (`head="b-milescu:<source_branch>"`,
  `state="all"`), a comment or review through the `issue_read` / `pull_request_read` comment
  and review pages, an issue through `list_issues` (`since=<pre-write instant>`,
  `orderBy="CREATED_AT"`, `direction="DESC"`), matching the verified author, the pre-write
  instant and, for bodies, the readback comparison. `search_issues` is semantic matching and
  cannot prove absence. Ambiguous or absent matches require a human decision.

Do not silently fix lost bodies or mismatched submitted fields with another mutation.

## Ready, approval and finish

Run the `forge` skill's common guard (`reference/common-guard.md`) for exactly one action.
Require candidate/Lift and exact-candidate Gate Receipt before ready/review and an
independent passing Review Report before finish. Verify authority source, caller
role/context and immediately-before-write identity. Every role here is the one `b-milescu`
account, so account equality establishes neither independence nor authority: independence
comes from the reviewer's fresh context and authority only from the sources below, and a
builder cannot finish its own change. No GitHub tool combines these checks: immediately
before the one mutation the actor reads `get_me()`, `pull_request_read(method="get")`
(open, action-appropriate draft state, base `main`, recorded source branch;
`issue-<id>-<slug>` for issue delivery, see [branch naming](dev-workflows.md#branch-naming)),
requiring `head.sha` equal to the candidate and Gate Receipt `checkout_commit`, plus the
Review Report `commit_id` for approval/finish. Require non-draft state before finish and
no `dirty` merge state; re-read the allocated issue for issue delivery, then native post-read.

- Ready: `update_pull_request` with `pullNumber` and `draft=false`, or
  `gh pr ready <n> -R b-milescu/skills-smoke-omp`, after fresh head and allocated
  open-item/source/closure checks. Neither takes an expected head (the tool schema has no
  head parameter and `gh pr ready --help` lists only `--undo`); re-read draft false, unchanged
  head and source-equal description. The pre/post sandwich is observational, not an atomic
  expected-head guarantee.
- Approval: UNAVAILABLE. GitHub refuses `APPROVE` from a pull request's author
  ([authors cannot approve their own pull requests](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews))
  and likewise `REQUEST_CHANGES`, and every role here is the one GitHub account, so no
  native approval exists and `reviewDecision` is never an oracle; `main` requires no review.
  The passing Review Report, a `COMMENT` review bound to the reviewed commit, is the review
  gate and carries the verdict in its body; `REQUEST_CHANGES` would need a reviewer account
  other than the PR author. Record Approval action `not-approved` under parent ownership
  (`Finish owner: parent`), or `blocked: native approval unavailable` with Action blocker
  `permission-failure`; a grant of `approval-only` is denied the same way.
- Direct merge: `merge_pull_request` with `merge_method="merge"` (the only method the
  repository allows) and `expectedHeadSha=<reviewed>`, never omitted, or the `gh` form
  below, under a `reviewer may merge` grant or the
  [project default](dev-workflows.md#finish-authority-default), quoted exactly as the Lift's
  `Finish authority`:

  `project default: the parent finisher may directly merge the reviewed head bound to its exact SHA once the required check "check" passes, with no queueing`

  The [native merge API contract](https://docs.github.com/en/rest/pulls/pulls#merge-a-pull-request)
  requires a supplied head SHA to match and returns 409 on mismatch; this setup did not
  execute a merge to test that contract.

  CI never supplies the authority. The condition on `check` is applied by the finisher as a
  [project-imposed required-check hold](#project-imposed-required-check-hold), read after
  every other guard and immediately before the merge call. The `gh` form is the merge
  robustness fallback: use it only when the MCP call is unavailable, re-read the PR (merged
  or not) after any call whose outcome is unknown, and never retry a native refusal through
  the other transport:

  ```text
  gh pr merge <n> -R b-milescu/skills-smoke-omp --merge --match-head-commit <reviewed>
  ```

  Verify the flags with `gh pr merge --help` first. `--delete-branch` is not used: GitHub
  deletes the merged source branch by repository setting, and the flag would also touch
  local branches.
- Queue: UNSUPPORTED. The repository has `allow_auto_merge` false and `main` has no ruleset
  or merge queue, so GitHub cannot queue a merge here; and even where auto-merge is enabled
  GitHub disables it only for a push by someone without write access
  ([auto-merge](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/automatically-merging-a-pull-request)),
  so a later writer push would still merge once requirements pass. That is no exact-head
  guarantee: refuse queueing with `sha-bound-action-unsupported` and never issue `--auto` or
  unbound queueing. A `queue auto-merge` grant never authorizes the direct merge above, even
  beside the standing project default: that default applies only when it is the value quoted
  in the Lift's `Finish authority`, and an explicit grant takes precedence over it. Only
  `reviewer may merge` or the quoted project default authorizes the direct merge; with no
  grant at all the blocker is `missing-authority`.

Native refusals are reported, never bypassed: no `--admin`, ruleset or protection edit, or
direct push to `main`. The account is the repository's admin, and that permission authorizes
nothing. `main` has no protection, so GitHub verifies no review, Gate Receipt, authority or
`check` result: an unrefused call proves only that the call was well formed, never
eligibility; the guard above decides.

Handoff tokens:

- `changed-head-sha`: a moved head (REST 409 for a mismatched `expectedHeadSha`, `gh`'s
  refusal of a mismatched `--match-head-commit`, or a fresh read whose head is not the
  reviewed SHA);
- `merge-conflict`: `mergeable_state` `dirty`, also a REST 405 whose re-read shows `dirty`;
- `permission-failure`: an action GitHub forbids this account (REST 403);
- `sha-bound-action-unsupported`: a missing exact-head binding (any queue request);
- `missing-authority`: no grant;
- `other`, with a one-line reason: any other hold or refusal (the `check` hold failing or
  timing out, a draft, a disallowed merge method).

The actor owns native post-read (`pull_request_read(method="get")` reports `merged`; never
claim success from the mutation response alone) and publishes the required compact action
explanation as an action note per [Publish one artifact](#publish-one-artifact).

Before an issue-delivery finish, re-read the recorded allocated **open** issue and exact
PR/source/item relationship, not merely an item inferred from branch text. Plain
`Closes #<issue_number>` validates intended syntax; native `closingIssuesReferences`
(`gh pr view <n> -R b-milescu/skills-smoke-omp --json closingIssuesReferences`) and the
issue's `closed_by_pull_requests` (`issue_read(method="get")`) check unintended closures.
The latter returns at most five references: compare against `total_count`. This integration
has no verified complete recipe for additional closure references, so exceeding that cap
blocks a closure decision rather than claiming completeness from the preview.
PR commit messages (`get_commits`) and any merge `commit_message` must carry no other
closing keyword because GitHub honours
those on merge to the default branch. Observed post-merge issue state is the third oracle;
syntax, native closure intent and observed closure are separate.

### Project-imposed required-check hold

`main` has no branch protection or ruleset, so GitHub never holds a merge for `check`. The
owner's condition that the required check `check` passes is therefore applied by the finisher
itself, as a hold on any otherwise-eligible direct merge, whichever grant authorizes it. The
finisher reads `check` only after eligibility is already decided, and only to decide whether
that merge may be attempted now. The hold never authorizes a merge and never decides
eligibility: it changes no verdict, review, approval or authority, is not a quality gate (the
quality predicate stays the exact-candidate local Gate Receipt), and provider CI stays
advisory everywhere else (snapshot, Lift `CI pipeline` cell, review).

After every other guard has passed (binding, fresh PR read with head equal to the reviewed
SHA, Gate Receipt, Review Report, authority, caller identity, applicable closure checks)
and immediately before the one merge call, read **all pages** of `check` check runs:

```text
gh api 'repos/b-milescu/skills-smoke-omp/commits/<reviewed>/check-runs?check_name=check&filter=all&per_page=100' --paginate --slurp > <run-dir>/checks.json
```

Collect `.check_runs[]` across all page objects, then select the highest `id` whose
`name` is `check` and `head_sha` is the reviewed SHA. Verify GitHub Actions app identity
(`id=15368`, `slug=github-actions` when confirmed) and the run referenced by `details_url`:
`actions_get(method="get_workflow_run", resource_id=<run id>)` must show workflow
`374699076` and the reviewed `head_sha` in this repository. A same-name unrelated check
cannot release the hold. Missing provenance/completeness is an evidence blocker, not PASS.
Empty matching results mean no run. The MCP alternative is complete
`pull_request_read(method="get_check_runs")` pages with the same filter and provenance
checks, only after confirming the PR head still equals the reviewed SHA.

| Newest `check` run on the reviewed SHA | Result |
| --- | --- |
| `status` `completed` and `conclusion` `success` | hold released: make the merge call |
| none, `queued`, `in_progress`, or any `status` other than `completed` | `held`, no mutation: [wait](#wait-for-required-checks) |
| `completed` with any other `conclusion` (`failure`, `cancelled`, `timed_out`, `skipped`, `neutral`, ...) | `blocked`, Action blocker `other`, one-line reason; no mutation |

"Newest" is the highest matching check-run `id` after complete collection: a new run
supersedes the older observation. Only `success` passes (`skipped` and `neutral` do not).
The read is observational, not atomic: it cannot hold a merge against a run created after
it, whereas the head binding of
the merge call itself is atomic. `gh pr checks --required` is never used: no check is
required natively on `main`. The finisher also never re-runs, cancels or dispatches a
workflow, because the guard permits exactly one mutation; a failed `check` needs a new head
or an owner decision. A PR with a merge conflict gets no `check` run, which is why the
`merge-conflict` guard runs first.

### Wait for required checks

The wait follows a hold, never decides eligibility, and changes no verdict, review, approval
or authority.

- Signal that ends the wait: a completed `check` check run on the reviewed SHA (the hold's
  read returns `status` `completed`). A run not yet registered, `queued` or `in_progress` is
  not completion.
- Budget: 30 minutes from the first hold (the `start-build` skill,
  `reference/parent-orchestrator.md#required-check-wait-budget`), shared by every wait for that
  hold, because this reference sets no different bound. The finisher records the first hold's
  time and tracks the elapsed time itself, so no external timeout tool is needed; a hold that
  recurs for the same reviewed SHA continues the same budget.
- Cadence: poll the hold's read at the 300-second wait floor (`start-build` skill,
  `reference/parent-orchestrator.md#wait-cadence`) until the budget is spent.
- A completed run with `conclusion` `success`: re-run the whole guarded finish above from its
  first guard (fresh `get_me()` and `pull_request_read(method="get")` reads, the same
  `expectedHeadSha`); the earlier hold is never reused, and a push during the wait moves the
  head and fails the re-run as `changed-head-sha`.
- A completed run with any other conclusion, or the budget elapsed with no completed run: the
  PR stays unmerged and blocked, Action blocker `other` with a one-line reason (for example
  `check concluded failure on <sha>`, or `check not completed within 30 minutes`), never
  bypassed.

The poll only ends the wait: it is advisory, never a local gate, and the re-run guard decides.

## Read-only post-merge and cleanup

No GitHub tool returns a post-merge snapshot; compose it from read-only calls.

- PR: `pull_request_read(method="get")` reports `merged` true, state closed and base `main`;
  the merge commit is `mergeCommit.oid` from
  `gh pr view <n> -R b-milescu/skills-smoke-omp --json state,mergeCommit,mergedAt`.
- Reviewed commit: the merge commit's parents from
  `gh api repos/b-milescu/skills-smoke-omp/commits/<merge commit> --jq '[.parents[].sha]'`
  (no mounted tool documents parents on `get_commit`). Merge method `merge` makes the second
  parent the merged head, and it must equal the reviewed SHA. Any other head is a
  `changed-head-sha` evidence gap, reported and never repaired.
- Containment: `gh api repos/b-milescu/skills-smoke-omp/compare/<reviewed_sha>...main --jq .status`
  is `ahead` or `identical`; `list_commits(sha="main")` pages cross-check recent merges.
- Linked issue: `issue_read(method="get")` shows closed. An open issue becomes
  `issue_closure_pending`, never a verifier force-close.
- Result-commit CI: the `push` run of workflow `check` on `main` whose `head_sha` is the merge
  commit (`gh run list --workflow check.yml --commit <merge commit> -R b-milescu/skills-smoke-omp --json databaseId,headSha,event,status,conclusion,url`,
  or `actions_list(method="list_workflow_runs")` with `workflow_runs_filter` branch `main` and
  event `push`), observed independently as of the read and advisory; the verifier never waits
  on it.
- Source ref: `gh api repos/b-milescu/skills-smoke-omp/git/ref/heads/<source_branch>` returning
  404 means removed, which is expected because `delete_branch_on_merge` is true and is
  verified by this read, not assumed; a present branch is reported, not deleted.

Cleanup requires explicit parent authority, session-owned source/worktree, clean state and
proven containment; retain dirty/foreign/unknown/unmerged/unverified worktrees. A branch
still present after proven containment is deleted only by a separate guarded authorized
mutation, never by a verifier read:

```text
gh api -X DELETE repos/b-milescu/skills-smoke-omp/git/refs/heads/<source_branch>
```

## Operation limits

Unsupported or unavailable outcomes. Each is reported with its token or as unverified; none
is worked around with another transport, a bypass or a broader permission.

- Native approval: unavailable (single account; self-approval refused). Record
  `not-approved`; the passing `COMMENT` Review Report is the review gate.
- Queueing and auto-merge: unsupported (`allow_auto_merge` false, no merge queue).
  `sha-bound-action-unsupported`.
- GitHub-enforced required checks, review or merge protection: none on `main`. The `check`
  hold is project-imposed and observational (see the hold above); GitHub enforces nothing
  for it.
- Exact-head guarantees:

  | Action | Guarantee |
  | --- | --- |
  | Draft to ready | none: observational pre/post sandwich only |
  | Review Report | `commitID` records the reviewed commit; verified on read (`commit_id`) |
  | Direct merge | atomic: `expectedHeadSha` or `--match-head-commit`, 409 on a moved head |
  | Queue | unsupported |

- Byte-exact readback through MCP alone: unavailable. It needs `gh api --template` and `cmp`;
  without `gh`, publication stays unverified and any guard that needs verified readback
  blocks.
- Native receipt extractor, handoff-evidence tool and post-merge snapshot: none; all are
  composed from reads, and the local validator parses the read-back text.
- Merge methods: squash and rebase are disabled by repository settings; recipes use
  `merge_method="merge"` only.
- Caps: native endpoint body-size limits, a PR's files at 3000 and commits at 250 in
  REST listings, and `issue_read` closure references at five. Beyond a cap the evidence
  is partial and blocks any decision that needs completeness; use complete native
  recovery where available rather than inferring absence.
- No recipe edits or deletes a published comment or review, re-runs, cancels or dispatches a
  workflow (`actions_run_trigger`), or updates a PR branch (`update_pull_request_branch`).
- Labels: recipes never create, rename or delete labels; see
  [triage labels](triage-labels.md#agent-rules).
- Runtimes: tool names here are OMP's (`xd://mcp__github_<tool>`). Claude Code operation
  and execution are not verified by this setup; if that runtime delivers here, reconcile
  its own declaration location, effective routes and mounted schemas through setup first.
- Optional operator follow-up, outside setup and never an agent action: protect `main` (or add
  a ruleset) requiring `check`, so GitHub itself holds the merge. Changed protections,
  queues or check names require fresh reconciliation before relying on these recipes;
  native refusals are reported, never bypassed.
