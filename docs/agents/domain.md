# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This repo uses a **single-context** documentation policy: root `CONTEXT.md` and `docs/adr/` are the designated locations when needed. A fresh root and `docs/` listing on 2026-10-04 found neither; this setup creates neither.

Use this file as `project_profile.domain_docs` for this repo. It records the context and ADR layout that project-profile hooks cite when workflow agents need domain language. Locations resolve from the repository root; installed aliases and shared field guidance supply no target defaults. Recording locations here never weakens the safety floors (`start-build` skill, `SAFETY.md#safety-floors`). A missing, stale or conflicting policy binding needs an explicit owner setup choice, not an auto-run of setup or the creation of absent setup docs.

The current code is one numeric `add(a, b)` export in `src/math.ts`, with one Bun test asserting `add(2, 3) === 5`; `README.md` describes a tiny calculator for skills-plugin smoke testing. There are no observed additional domain contexts.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root, when present.
- **`docs/adr/`**, when present — read ADRs that touch the area you're about to work in.

If either is absent, proceed silently. Don't flag its absence or propose creating it solely because it is absent, and create neither for absence alone. When a domain change needs a manual glossary or ADR update, make it at these locations.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md` when it exists. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap. Record the gap in the relevant project docs manually.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (some decision) — but worth reopening because…_
