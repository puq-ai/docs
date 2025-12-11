---
title: Debugging Executions
description: Track, inspect, troubleshoot, and replay workflow runs in puq.ai.
parent: Workflows
nav_order: 4
---

# Debugging Executions

puq.ai logs every workflow run with full visibility into each step of the execution.  
This allows you to **understand what happened**, **identify errors**, and **fix issues quickly** — even in complex automations.

Debugging tools help you verify correctness as you build and maintain your workflows.

---

## Where to View Executions

You can access execution logs from two places:

### 1. **Global Executions Dashboard**
Navigate to:  
**Dashboard → Executions**

This view shows:
- All executions across every workflow
- Their statuses (Success, Failed, Running…)
- Trigger source
- Execution time
- Ability to open detailed logs

Use this to monitor system-wide automation activity.

### 2. **Workflow Editor → Debug Panel**

When editing a workflow, open the **Debug** tab.  
This panel shows:
- Executions *only for the current workflow*
- Recent runs with timestamps
- Quick links to inspection mode

Perfect for debugging while building.

---

## What You Can Inspect

Each execution provides a rich set of debugging tools:

### 🔍 Step-by-Step View
See the workflow exactly as it ran — node by node.

### 📥 Input / 📤 Output Inspection  
For every node, you can view:
- Raw inputs received  
- Outputs generated  
- Transformed data  
- Branching decisions in Routers  

This makes it easy to trace how data moves through your automation.

### ❗ Error Messages & Stack Traces  
Failed executions show:
- Error message  
- Stack trace (if available)  
- The node where the failure occurred  
- Suggestions for recovery  

Great for quickly locating misconfigured nodes or invalid data.

### 🔁 Retry Failed Executions  
You can **retry** any failed run instantly.  
Retries use the *same trigger data*, making debugging deterministic and repeatable.

---

## Live Testing Mode

Use **Live Testing Mode** to verify execution behavior while building a workflow.

Live Testing allows you to:
- Trigger test runs manually  
- View logs in real time  
- Validate node outputs step by step  
- Catch misconfigurations before publishing  

This dramatically reduces deb
