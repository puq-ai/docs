---
title: Execution History
description: Explore the Execution History view in puq.ai. Find out how to review, filter, and analyze past workflow runs.
parent: Executions
nav_order: 2
---

# Execution History

The **Execution History** view lists all workflow executions and provides a clear overview of how your automations perform over time.  
Each row represents a single execution and shows its current status, timing, and scope.

This page is primarily used for monitoring, debugging, and understanding execution trends.

---

## How to Access Execution History

You can access the Execution History page from the main navigation:

- Click **Executions** in the left sidebar

This opens the **global Execution History**, where executions from all workflows are listed together.

---

## Execution Summary Metrics

At the top of the Execution History page, you’ll see a summary panel that provides high-level insights into execution performance:

- **Total Executions** — Total number of executions in the list  
- **Succeeded** — Number of successful executions and their success rate  
  - Example: `8 (80%)`
- **Failed** — Number of failed executions and their failure rate  
  - Example: `2 (20%)`

These metrics help you quickly understand overall system health without inspecting individual runs.

---

## What You Can See in Execution History

The Execution History table displays the following columns:

- **Status** — Execution state (Success, Failed, Running, Stopped, Paused, Timeout, International Error)
- **Workflow** — The workflow that was executed  
- **Started** — Date and time when the execution began  
- **Finished** — Date and time when the execution ended  
- **Duration** — Total execution runtime  
- **Steps** — Number of steps (nodes) executed  

This compact view allows you to scan execution activity quickly and identify anomalies.

---

## Reviewing an Execution

Clicking on any execution row opens the **Execution Details** view.

From there, you can:
- Inspect step-by-step execution logs  
- View input and output data for each node  
- Identify the exact step where a failure occurred  
- Analyze execution duration per step  

Execution History acts as the entry point for deeper debugging.

---

## Filtering and Searching Executions

Execution History supports filtering to help you focus on relevant runs.

You can narrow down executions by **Status** (e.g., Failed only)

This is especially useful when troubleshooting recurring issues or reviewing recent changes.

---

## Common Use Cases

Execution History is commonly used for:

- Monitoring overall automation health  
- Detecting failed or slow executions  
- Investigating execution spikes  
- Comparing execution durations  
- Auditing workflow behavior over time  

---

## Summary

The Execution History page provides a centralized view of all workflow executions in puq.ai.  
With summary metrics, detailed tables, and direct access to execution details, it enables effective monitoring, debugging, and optimization of your workflows.