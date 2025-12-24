---
title: Passing Data
description: Learn Passing Data Mechanics in puq.ai
parent: Data
nav_order: 1
---

# Passing Data

In **puq.ai**, data is created and propagated automatically throughout the lifecycle of a workflow.

## How Data Is Created

Data can originate from multiple sources within a workflow:

- A **Trigger** (for example, a webhook, schedule, or event)
- A **Node output** (such as an API response, database query, or file read)
- A **manipulated value** created through parameter mapping or transformations

As soon as data is created, it becomes part of the workflow execution context.

## Workflow Lifecycle and Data Flow

Once data exists:

- It remains **alive for the entire execution lifecycle**
- It is **not destroyed or reset** between steps
- It is **automatically passed** from the originating node to all subsequent nodes

You do not need to manually forward data between steps — puq.ai handles this implicitly.

## Using Data in Other Nodes

Any node that runs **after** the data is created can access it:

- You can reference data in input fields using the **data selector**
- You can transform or reshape data using **parameter mapping**
- You can reuse the same data in multiple nodes without duplication

This makes it easy to build complex workflows where information flows naturally from triggers to actions, logic, and outputs.

## Key Takeaway

Data in puq.ai behaves like a shared execution context:
- Created once
- Available everywhere downstream
- Automatically managed

This design keeps workflows clean, predictable, and easy to maintain.