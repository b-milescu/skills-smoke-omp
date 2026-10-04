# calc

Tiny Bun + TypeScript calculator used to smoke-test the skills plugin (GitHub repository `b-milescu/skills-smoke-omp`).

## Agent skills

This rulebook is a pointer-first entry point. Keep live tracker, label, check-gate, coding guardrails, and workflow details in their owner docs under `docs/agents/`; do not copy those inventories here.

### Routing

- Issue tracker: see `docs/agents/issue-tracker.md`.
- Triage labels: see `docs/agents/triage-labels.md`.
- Domain docs: see `docs/agents/domain.md`.
- Check gate: see `docs/agents/check-gate.md`.
- Coding guardrails: see `docs/agents/coding-guardrails.md`.
- Dev workflows: see `docs/agents/dev-workflows.md`.
- Project profile (`profile_path`): `docs/agents/dev-workflows.md#project-profile-hooks`.
- Provider integration (`provider.reference`): `docs/agents/native-integration.md`.
- OMP runtime declarations (`change-builder`, `change-reviewer-final`): `.omp/agents/`; effective route/source and execution limits are documented in `docs/agents/dev-workflows.md#runtime-project-declarations-and-provenance`.
- Owner-invoked setup is not issue delivery: applicability and the request-specific publish-only/no-merge boundary are in `docs/agents/dev-workflows.md#setup-only-applicability`.

### Doc ownership map

| File / path | Owns | Does not own |
| --- | --- | --- |
| `README.md` | Project overview. | Agent routing, live ops or workflow syntax. |
| `AGENTS.md` | Agent routing and this ownership map. | Repeated inventories or procedures. |
| `docs/agents/` | Tracker, labels, domain, check-gate, coding-guardrail and dev-workflow policy, including the confirmed project profile. | Skill internals or onboarding. |
| `docs/agents/native-integration.md` | This project's GitHub scopes, tools and operation recipes (`provider.reference`). | Shared workflow judgment or other targets' defaults. |
| `.omp/agents/` | Complete OMP project declarations for the `change-builder` and `change-reviewer-final` routes. | Skill procedures, tool allowlists, model or effort. |
| `.github/workflows/check.yml` | The advisory CI workflow `check`, with local command/runtime parity. | Exact-head local Gate Receipt, gate policy, merge eligibility or authority. |
