---
title: Router
description: Control workflow execution paths by branching based on conditions.
parent: Core Nodes
nav_order: 12
---

# Router

The **Router** node allows you to split a workflow into multiple branches based on conditions.  
It enables decision-based execution, where different logic paths are followed depending on incoming data.

Router is essential for building non-linear, dynamic workflows.

---

## What the Router Does

The Router:
- Evaluates conditions against incoming data
- Routes execution into one or more branches
- Allows fallback handling using an **Otherwise** branch
- Makes workflows flexible and decision-driven

It behaves similarly to an `if / else` or `switch` statement in programming.

---

## Router Structure

When added to the workflow, the Router creates:
- One or more **Branches**
- A default **Otherwise** branch

Each branch represents a condition-based execution path.

---

## Execution Mode

Above the branch list, the step has an **Execution Mode** selector with two options:

| Option | Description shown in the app |
|--------|-------------------------------|
| **Execute First Match** (default) | Runs the first branch whose condition matches. Put more specific conditions first. |
| **Execute All Match** | Shown in the app as "Run every branch whose conditions are met". See the note below. |

Branches are evaluated **from top to bottom**, and execution continues down the **first** branch whose condition matches (or the **Otherwise** branch if none match) — later branches are not executed. New Router steps start in **Execute First Match** mode.

This mode is ideal when branches are **mutually exclusive**.

{: .warning }
**Execute All Match** can be selected, but the engine currently evaluates it the same way as **Execute First Match**: only the first matching branch runs. Do not rely on it to run several branches.

A Router can have at most **32** branches.

---

## Branches

Each branch contains:
- A condition definition
- A dedicated execution path
- Its own downstream nodes

### Branch 1
Represents the first condition to evaluate.

You can:
- Edit the branch condition
- Rename the branch
- Duplicate or remove it

---

### Otherwise Branch

The **Otherwise** branch runs when:
- No other branch condition matches

This ensures:
- No execution is lost
- Default handling is always available

---

## Common Use Cases

- Route messages based on content or sentiment
- Handle different user roles
- Separate success and failure paths
- Apply conditional notifications
- Build approval or escalation logic

---

## Best Practices

- Order branches from most specific to most general
- Always include an **Otherwise** branch
- Keep conditions simple and readable
- Use descriptive branch names

---

## Summary

The Router node enables:
- Conditional branching
- Clear decision-based flows
- Cleaner, more maintainable workflows
- Advanced control over execution paths

It is a core building block for complex automation logic in puq.ai.