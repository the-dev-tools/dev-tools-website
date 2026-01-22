---
title: Determinism — what is and isn’t
description: Clarify deterministic parts of the engine vs non-deterministic realities of web traffic and mapping.
---

# Determinism — what is and isn’t

Not everything in API testing can be deterministic. Here’s how DevTools frames it so expectations match reality.

Engine behavior (deterministic)
- Execution ordering for a given flow definition
- Report formats and exit codes (CLI)

Mapping behavior (rule‑based, repeatable)
- Variable mapping uses stable, repeatable rules
- Rules can be overridden per step when payloads change
- Heuristics prefer explicit selectors over fuzzy matches

Traffic reality (not deterministic)
- Payload shape changes, nonce values, and timestamps
- Server‑side ordering or fan‑out behavior
- External rate limiting and backpressure

Recommended practices
- Prefer explicit JSONPath selectors for mapping critical values
- Add assertions at flow and step boundaries to catch drift early
- Gate non‑critical steps with soft assertions or retries
- Use environment variables for ephemeral tokens and rotate via CI secrets

See also
- Variable mapping system: /docs/how-to/environments-and-variables#variable-mapping-system
- Assertions and gates: /docs/how-to/working-with-flows#assertions-and-validations
