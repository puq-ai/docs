---
title: Testing Steps
description: Run a single step from the workflow builder to see its real input and output, and generate the sample data the Data Selector uses.
parent: Workflows
nav_order: 9
---

# Testing Steps

While building a workflow, open any step and use **Run Step** to execute it immediately and see exactly what it receives and returns — without running the whole workflow.

---

## Generate Sample Data Panel

Selecting a step (any type except an empty trigger placeholder) opens the **Generate Sample Data** panel next to its settings. It contains:

- A **Run Step** button (shows **Running** with a spinner while in progress).
- A result area that shows **Output** (and **Input**, in a separate tab, once input data exists) once the run finishes.

The panel can be collapsed and reopened without losing the last result.

---

## How Run Step Works

Clicking **Run Step**:

1. Autosaves your current draft.
2. Runs the workflow from the trigger through every step needed to reach the selected step, then stops — it does not run steps after the one you're testing.
3. Polls the run until the target step finishes.

The result area then shows:

- A **Succeeded** or **Failed** badge for that step.
- The step's **Output** (and **Input**, if available) as formatted JSON.
- The error message, if the step failed.

If the target step is reached inside a **Router** branch, only the branch that actually contains it runs — puq.ai forces the router down that path so the rest of the workflow is not affected.

---

## Testing a Trigger

Running a trigger step works the same way, with one difference in how its data is produced:

- If the trigger has a way to fetch a real sample (for example, pulling the most recent item from a connected account), it uses that.
- Otherwise, it falls back to the piece's built-in example payload — a fixed, realistic sample shipped with that trigger (for example, a sample webhook payload from the integration's API).

Either way, running the trigger gives you real-looking output immediately, without waiting for a live event.

---

## Where the Results Go

Every successful **Run Step** result is saved as that step's **sample data** for the current workflow version. This is the same data source used by the [Data Selector](/data/selecting-data-inpuits/) when mapping a later step's inputs — so testing a step also makes its output available to pick from in every step after it.

Running a step again overwrites its previous sample data with the new result.

---

## Limitations

- Run Step is only available while editing a workflow (not read-only views).
- A step must be reachable from the trigger — steps after a Router branch that wasn't taken, or inside a loop that never runs, won't produce output.
- Running a step re-executes every step before it in the chain, including steps with side effects (sending an email, creating a record, and so on). Use test connections or non-destructive inputs while iterating.
