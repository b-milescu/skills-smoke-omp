# Coding Guardrails

Repo-local defaults for agent implementation work in this repository. `AGENTS.md`, issues, ADRs, the [Check Gate](check-gate.md), and explicit human instructions override this file when stricter.

## Think before coding

- State assumptions that affect scope, design, data, or safety.
- Resolve ambiguous requirements from the task, repo evidence and existing policy before asking for an owner decision that remains genuinely unresolved.
- Name tradeoffs and prefer the simpler path when it still meets the goal.
- If a result-changing choice cannot be resolved from available evidence, name the specific decision needed rather than inventing it.

## Simplicity first

- Build only what was requested and accepted.
- Avoid speculative abstractions, configurability, or future-proofing.
- Do not add error handling for impossible states unless this repo requires defensive checks.
- If the solution grows large, pause and simplify before continuing.

## Surgical changes

- Touch only files needed for the requested outcome.
- Match existing style, naming, and layout.
- Do not refactor adjacent code or reformat unrelated files.
- Remove unused imports, variables, helpers, or docs only when your change created the orphan.
- Mention unrelated cleanup opportunities instead of doing them silently.

## Goal-driven execution

- Convert the task into concrete success criteria before implementing.
- For bugs and behavior changes, prefer a reproducing test or check before the fix.
- Honor the assigned check owner and timing. For this setup reconciliation, workers run no tests/build/lint/format; the parent runs `bun test` exactly once on the final candidate. Other development tasks may use authorized targeted checks, then the full gate in [check-gate.md](check-gate.md#full-local-gate) before claiming ready.
- If a check cannot run, report why and provide the strongest safe evidence available.
