---
title: Execution Details
description: Dive into detailed execution data in puq.ai. Learn how to inspect inputs, outputs, runtime, and logs to debug workflows and optimize automation efficiency.
parent: Executions
nav_order: 3
---

# Execution Details

The **Execution Details** page provides a complete, step-by-step breakdown of a single workflow execution.  
It allows you to inspect exactly how a workflow behaved during a specific run, including data flow, execution order, and errors.

This page is essential for debugging, validation, and performance analysis.

---

## How to Open Execution Details

To open the Execution Details page:

1. Go to **Executions** from the left sidebar  
2. In the **Execution History** table, find the execution you want to inspect  
3. Click on the execution row  

This opens the detailed view for that specific execution.

---

## Execution Overview

At the top of the Execution Details page, you’ll find high-level information about the run, including:

- **Workflow name**  
- **Workflow version** used during execution  
- **Execution status** (Success, Failed, Running, etc.)  
- **Triggered by** (manual, API, schedule, or event)  
- **Start and finish timestamps**  
- **Total execution duration**  

This overview helps you quickly understand the context before diving into logs.

---

## Step-by-Step Execution Timeline

Below the overview, the execution is displayed as a **step-by-step timeline**.

For each step (node), you can see:
- Execution order  
- Step status (Success / Failed / Skipped)  
- Runtime for that step  

Clicking a step expands its details.

---

## Inspecting Input and Output Data

For every step, you can inspect:

- **Input data** — What the node received  
- **Output data** — What the node produced  

Data is displayed in a structured, readable format and can include:
- Primitive values  
- Objects  
- Arrays  
- Nested JSON  

This allows you to trace how data evolves throughout the workflow.

---

## Logs and Error Details

If a step fails, Execution Details will clearly show:

- The **error message**  
- Any available **stack trace**  
- The exact step where the failure occurred  

This makes it easy to identify configuration issues, invalid data, or external service failures.

---

## Debugging Failed Executions

When an execution fails:

1. Open the failed execution from Execution History  
2. Identify the failed step in the timeline  
3. Inspect its input and output  
4. Review error messages  
5. Fix the workflow logic  
6. Publish the changes and rerun the workflow  

This approach eliminates guesswork and avoids recreating execution conditions manually.

---

## Performance Analysis

Execution Details also help with performance optimization:

- Compare step runtimes  
- Identify slow or blocking nodes  
- Detect unnecessary processing  
- Optimize data handling or API usage  

Understanding execution timing is critical for high-volume workflows.

---

## Summary

The Execution Details page provides full visibility into a workflow run.  
By combining step-by-step logs, input/output inspection, and clear error reporting, it enables efficient debugging and confident workflow optimization.