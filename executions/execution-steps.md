---
title: Execution Steps
description: Understand the step-by-step breakdown of workflow executions in puq.ai. Analyze inputs, outputs, timing, and errors for each node to refine and improve workflow logic.
parent: Executions
nav_order: 4
---
# Execution Steps

The **Execution Steps** section shows a breakdown of each node’s behavior within the workflow.

## Step Details
For every step, puq.ai logs:
- **Step name and type**
- **Input data**
- **Output data**
- **Execution time**
- **Error details (if any)**

## Step Visualization
Steps are displayed in order, matching your workflow design.  
Failed steps are highlighted in red, and you can expand each to see logs or raw JSON data.

## Best Practices
- Use descriptive step names for easier debugging.
- Monitor step runtimes to detect performance issues.
- Re-run only failed steps during testing to save time.
