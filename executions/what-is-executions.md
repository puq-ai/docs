---
title: What is an Execution?
description: Discover what an Execution is in puq.ai. Each execution represents a single workflow run — explore its structure, status, triggers, and how it helps track automation results.
parent: Executions
nav_order: 1
---

# What is an Execution?

An **Execution** in puq.ai represents a *single, complete run* of a workflow — from the moment a trigger fires until every node finishes processing.  
It captures all input data, node outputs, timing information, and status updates, providing full transparency into how your automation behaves.

Executions help you understand, debug, and monitor your workflows with precision.

---

## What an Execution Contains

Each execution stores detailed information about the workflow run:

- **Execution ID**  
  A unique identifier used to track and reference the run.

- **Status**  
  Indicates the current state of the execution:  
  - **Pending** — Waiting to start (often due to concurrency limits)  
  - **Running** — Nodes are actively being processed  
  - **Success** — All nodes executed without errors  
  - **Failed** — A node encountered an error  
  - **Cancelled** — Execution was stopped manually  

- **Start & End Time**  
  Shows how long the workflow took to finish, helping identify performance bottlenecks.

- **Trigger Source**  
  Displays *how* the execution started:
  - Manual run  
  - API request  
  - Scheduled trigger  
  - Event-based trigger (e.g., form submission, webhook call)  
  - Another workflow (via Workflow Call)

---

## Why Executions Matter

Executions act as a **detailed audit trail** of your automation. They allow you to:

- Inspect each node’s **input** and **output**
- Understand **branching logic** taken through Routers or Conditions
- Debug failures by examining error messages and stack traces
- Measure performance and identify slow steps
- Replay (rerun) past executions for troubleshooting
- Validate how your logic behaves with real data

Executions are especially important in production workflows, where reliability and traceability matter.

---

## Execution Logs

Every execution includes a structured log that captures:

- Raw trigger payload  
- Node-by-node input and output values  
- Execution duration per node  
- Errors and retry attempts  
- Routing decisions (e.g., which branch was chosen)

These logs make execution debugging fast and predictable, even for complex workflows.

---

## Execution Lifecycle Overview

1. **Trigger fires**  
   The workflow receives an event, request, or manual run.

2. **Execution created**  
   A new entry appears in the Executions list.

3. **Nodes run sequentially**  
   The workflow processes each node based on your flow design.

4. **Status updated**  
   Depending on the outcome, the execution becomes *Success*, *Failed*, or *Cancelled*.

5. **Logs stored**  
   All input/output data and results remain available for inspection.

---

## Summary

Executions are the foundation of workflow observability in puq.ai.  
Every run is recorded with full detail — enabling you to:

- Track how your automation executes  
- Identify issues quickly  
- Optimize performance  
- Gain confidence in production behavior  

Understanding executions is key to building reliable, scalable workflows.