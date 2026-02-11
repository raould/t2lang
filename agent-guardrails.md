# Staging Guard Rails for AI Coding Agents

## Data Flow Rule

RULE: Code flows in ONE direction only.
Codegen <- Stage 0 <- Stage 1 ... <- source.ts

BEFORE accepting any code change, ask:
- Does this maintain unidirectional flow?
- Does this phase depend on output from a later phase?

RED FLAG: If Phase N needs Phase N+1, that is an error.
