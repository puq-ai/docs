---
title: Go to Step
description: Jump back to a previous step to repeat part of a workflow, with a configurable maximum number of iterations.
parent: Core Nodes
nav_order: 4.5
---

# Go to Step

The **Go to Step** step jumps execution back to an earlier step in the same workflow, creating a loop. puq.ai re-runs every step from the target step down to the Go to Step again, each time the jump occurs.

It's found by searching **Go to Step** in the Add Step panel (Core / Flow Control category).

{: .warning }
This action creates a loop by jumping back to a previous step. The workflow re-executes all steps from the target step to this point. Set a reasonable **Maximum Iterations** limit to prevent infinite loops.

---

## How It Works

1. The workflow reaches the Go to Step step.
2. puq.ai counts how many times **this** Go to Step has jumped to **this** target step so far in the current execution.
3. If the count is at or below **Maximum Iterations**, the workflow jumps back to **Target Step** and re-runs everything from there to the Go to Step again.
4. Once the count passes **Maximum Iterations**, the step stops jumping: it succeeds and execution simply continues to whatever comes after the Go to Step — the workflow does **not** fail.
5. If no **Target Step** is selected, the step fails immediately.

---

## Settings

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Target Step** | Yes | — | The step to jump back to, chosen from the workflow's steps (the Go to Step step itself is excluded) |
| **Maximum Iterations** | Yes | `100` | How many times this specific jump can occur in one execution |

---

## Reaching the Maximum

Each `(Go to Step, Target Step)` pair has its own counter for the current execution:

- While the counter is at or below Maximum Iterations, the jump happens and the counter increases by one.
- Once the counter exceeds Maximum Iterations, the step **passes through** instead of jumping — it does not fail the workflow, and it does not reset the counter.

The counter is per execution: a new run of the workflow starts counting from zero again.

---

## Plan Limits

Maximum Iterations shares its limit with the [Loop](/nodes/node-categories/core-nodes/loop/) node's iteration limit, which depends on your subscription plan (1,000 by default when your plan doesn't set one).

- When you save, publish, or import a workflow, puq.ai rejects it if a Go to Step's **Maximum Iterations** is set above your plan's limit.
- If a workflow still ends up with a value above the limit at run time, the engine silently caps **Maximum Iterations** down to your plan's limit instead of using the configured value.

---

## Errors

- **No target step specified** — the step fails immediately if **Target Step** is empty.
- **Maximum Iterations too high** — saving, publishing, or importing a workflow fails if a Go to Step's Maximum Iterations exceeds your plan's loop limit.

**Continue on failure** and **Retry on failure** are not available for this step.

---

## Output

| Field | Type | Description |
|-------|------|--------------|
| `iteration` | number | The jump count for this `(Go to Step, Target Step)` pair after this run |
| `max_iterations` | number | The effective Maximum Iterations (after any plan cap) |
| `next_step_name` | string | Present only when the step actually jumped — the name of the Target Step |
| `passed_through` | boolean | Present and `true` only when the limit was reached and the step passed through instead of jumping |

---

## Example: Retry Until Success

1. **HTTP Request** — call an external API
2. **Router** — branch on the response
   - Call failed → **Go to Step** back to the HTTP Request, Maximum Iterations: `5`
   - Call succeeded → continue the workflow

After 5 failed attempts, Go to Step stops jumping and the workflow continues to whatever follows it — add a step after it to handle the "still failing" case explicitly.

---

## Best Practices

- Keep **Maximum Iterations** as low as the use case allows; it's a safety net, not a retry strategy by itself.
- Pair Go to Step with a [Router](/nodes/node-categories/core-nodes/router/) that decides whether to jump back or move on.
- Add a step after Go to Step to handle the case where the limit was reached, since the workflow continues instead of failing.
- For a fixed number of repeats over a list, use [Loop](/nodes/node-categories/core-nodes/loop/) instead — Go to Step is for repeating a sequence based on a condition.
