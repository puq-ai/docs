---
title: Error Handling
description: Control what happens when a step fails — continue the workflow or stop it, and automatically retry failed steps.
parent: Workflows
nav_order: 8
---

# Error Handling

Every **Code** and **Piece** (app action) step has two error-handling switches in its step settings panel: **Continue on Failure** and **Retry on Failure**. They decide what happens the moment a step's action throws an error.

---

## Where to Find It

Open any Code or app action step in the workflow builder. Below the step's inputs, the settings panel shows:

- **Continue on Failure** — off by default
- **Retry on Failure** — off by default

Both are plain on/off switches. Neither option is available for **Trigger**, **Router**, **Loop**, **Agent**, **Delay**, or **Do Nothing** steps — only Code and Piece steps expose them. Some individual app actions hide one or both switches as well (see [Hidden Options](#hidden-options)).

---

## Retry on Failure

When **Retry on Failure** is on and the step fails, puq.ai automatically retries the same step before giving up:

- Up to **3 total attempts** (the original run plus 2 retries).
- A short delay is inserted before each retry, doubling each time: **1 second** before the 2nd attempt, **2 seconds** before the 3rd.
- Each retry reruns the step from scratch with the same resolved inputs.
- If the step succeeds on a retry, the workflow continues normally and only the final (successful) attempt is kept.
- If all 3 attempts fail, the step is recorded as **Failed** and **Continue on Failure** decides what happens next.

Retry on Failure is independent of Continue on Failure — you can retry a step and still stop the workflow if every attempt fails, or retry it and continue regardless.

---

## Continue on Failure

By default, a failed step stops the workflow: the run ends with status **Failed** and no further steps execute.

Turning **Continue on Failure** on changes that: if the step (and its retries, if enabled) still fail, the step is recorded as **Failed**, but the workflow keeps going — the next step in the chain runs as if nothing happened.

### What the Next Steps Receive

The failed step's output depends on its type:

- **Piece (app action) steps** — the output is `{ "error": "<the error message>" }`. You can map `{% raw %}{{step_name.error}}{% endraw %}` into a later step to branch on it (for example, with a [Router](/nodes/node-categories/core-nodes/router/)).
- **Code steps** — the output is empty (`null`). The failure is not exposed as step output; only the step's recorded error message describes what happened.

The step's full error message is always visible in [Execution Details](/executions/execution-details/), regardless of whether the workflow continued or stopped.

{: .note }
A step that continues after failure is still shown as **Failed** in the execution timeline — "continue on failure" changes what happens *next*, not how the failed step itself is reported.

---

## Hidden Options

Some steps don't show one or both switches:

- **[Human in the Loop → Request Approval](/nodes/node-categories/core-nodes/human-in-the-loop/)** hides both Continue on Failure and Retry on Failure. A failed approval request always stops the workflow and cannot be retried.
- A number of individual app actions hide **Continue on Failure** only, so they always stop the workflow on error, while still allowing **Retry on Failure**.

If a switch doesn't appear on a step, that step's behavior for that option is fixed and can't be changed.

---

## Best Practices

- Turn on **Retry on Failure** for calls to external services that occasionally time out or rate-limit — the built-in backoff gives the service a moment to recover.
- Turn on **Continue on Failure** only when the following steps can meaningfully handle a missing or error result — pair it with a Router that checks `{% raw %}{{step_name.error}}{% endraw %}`.
- Leave both off (the default) for steps where any failure should stop the automation immediately, such as a step that charges a payment or sends a final confirmation.
- Use [Run Step](/workflows/testing-steps/) to see exactly what a step outputs on success before deciding how it should behave on failure.
