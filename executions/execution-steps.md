---
title: Execution Steps
description: Understand the step-by-step breakdown of workflow executions in puq.ai. Analyze inputs, outputs, timing, and errors for each node to refine and improve workflow logic.
parent: Executions
nav_order: 4
---

# Execution Steps

The **Execution Steps** view provides a detailed breakdown of how each node behaves during a workflow execution.  
It shows the exact order of execution, the data passed between steps, and how long each step takes to complete.

This view is crucial for understanding workflow behavior, debugging errors, and optimizing performance.

---

## What Are Execution Steps?

An execution step represents a **single node execution** within a workflow run.

For every workflow execution:
- Each node becomes one execution step
- Steps are executed sequentially or conditionally (based on routing logic)
- Each step produces logs, timing data, and outputs

Execution Steps allow you to inspect workflow logic at the most granular level.

---

## Step-by-Step Visualization

Execution Steps are displayed in the **same order as the workflow design**.

- Steps follow the logical flow of the canvas  
- Conditional paths (Router, conditions, loops) are clearly reflected  
- Skipped steps are marked accordingly  
- Failed steps are highlighted visually  

This makes it easy to map execution behavior back to your workflow layout.

---

## Step Details

Clicking on a step expands its detailed view.

For each step, puq.ai logs:

- **Step name** — The node’s display name  
- **Step type** — The type of node executed  
- **Input data** — Data received by the node  
- **Output data** — Data produced by the node  
- **Execution time** — How long the step took to run  
- **Status** — Success, Failed, or Skipped  
- **Error details** — Error message and stack trace (if any)  

Data can be viewed in structured format or as raw JSON.

---

## Inspecting Input and Output Data

Input and output inspection helps you:

- Verify correct data mapping  
- Debug parameter mapping issues  
- Confirm API payloads and responses  
- Understand transformations applied during execution  

You can trace data changes step by step, from trigger to final output.

---

## Handling Failed Steps

When a step fails:

- The step is highlighted clearly
- The error message is displayed inline
- Execution stops at that step (unless handled explicitly)

From here, you can:
1. Inspect input values  
2. Review error details  
3. Fix workflow configuration  
4. Publish changes  
5. Rerun the workflow  

This targeted approach avoids unnecessary rework.

---

## Performance Insights

Execution Steps also provide valuable performance data:

- Identify slow-running nodes  
- Compare execution times across runs  
- Detect unnecessary processing  
- Optimize external API calls or data handling  

Monitoring step runtimes helps improve workflow efficiency, especially for high-volume automations.

---

## Best Practices

- Use **descriptive node names** to simplify debugging  
- Regularly inspect step runtimes for performance issues  
- Validate input and output data during development  
- Test changes using Live Testing Mode  
- Review failed steps immediately after deployment  

---

## Summary

The Execution Steps view offers deep visibility into how workflows execute at the node level.  
By inspecting step data, timing, and errors, you can confidently debug issues, optimize performance, and refine workflow logic.