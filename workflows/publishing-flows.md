---
title: Publishing Flows
description: How to deploy and trigger workflows.
parent: Workflows
nav_order: 2
---

# Publishing Flows

Publishing a flow makes it *live* — meaning it becomes executable through its trigger, schedule, or any connected integration.  
Until a workflow is published, it remains in **draft mode** and will not run automatically.

This guide explains how saving, publishing, enabling/disabling, and triggering work inside puq.ai.

---

# Saving Before Publishing (Important)

Before you publish a workflow, you **must click Save**.

### Why?

- **Publish only deploys the last saved version**, not the last edited version.
- Unsaved changes will *not* be part of the published flow.
- The system does **not automatically save** before publishing.

### Correct workflow publishing routine:

1. Make your changes  
2. Click **Save**  
3. Ensure there are no validation errors  
4. Click **Publish**

This ensures your production workflow matches your design exactly.

---

# Enabling and Disabling a Workflow

Every workflow has an **Enable / Disable** toggle that controls whether it is allowed to run.

### 🔴 Disabled State
- The workflow is **inactive**  
- **Triggers fire but the flow does NOT run**  
- No executions occur  
- Useful when maintaining, editing, or temporarily stopping automation

### 🟢 Enabled State
- The workflow is **active**  
- Any trigger (schedule, integration, webhook, manual event) will run the workflow

### Default Behavior
- When you create a new workflow and publish it, it starts in the **Disabled** state
- You may manually switch it to **Enabled** anytime

### Reactivating a Disabled Workflow
To allow it to run again, simply click **Enable**.

This lets you control automation behavior without having to unpublish or delete the workflow.

---

# How to Publish a Workflow

1. Open the workflow in the **Visual Builder**  
2. Review nodes and logic  
3. Click **Save**  
4. Click **Publish**  
5. Ensure the workflow is **Enabled** if you want it to run automatically

Publishing deploys the saved version into an active environment.

---

# What Happens When You Publish?

Publishing activates:

### ✔ Trigger Nodes  
All configured triggers become ready to execute:
- Integration-based triggers  
- Webhooks  
- Scheduled triggers  
- Event listeners  
- Form submissions  
- Manual triggers

### ✔ Public Execution Endpoint  
Your workflow receives a stable endpoint URL that can trigger executions (optional to use).

### ✔ Logs & Monitoring  
Execution logs, inputs, and outputs are tracked immediately after publishing.

---


# How Published Workflows Are Triggered

Once a workflow is published (and enabled), it can run in multiple ways:

### 🔵 1. Manual Run  
Execute the workflow manually from the editor.

### 🔵 2. Scheduled Triggers  
Runs automatically based on defined timing rules:
- Hourly  
- Daily  
- Weekly  
- Cron syntax  
- One-time events

### 🔵 3. Integration Triggers  
Events from apps automatically start the workflow:
- CRM events  
- E-commerce events  
- Ticketing updates  
- Form submissions  
- Database changes  
- File uploads  
…and more.

### 🔵 4. Webhook Triggers  
Incoming POST requests run the workflow via webhook URL.

### 🔵 5. Public API Trigger (Optional Example)
A published workflow exposes a public execution endpoint.  
This is primarily used by developers or custom systems.

---

# Updating a Published Workflow

To update a live workflow:

1. Edit your nodes
2. Click Save
3. Click Publish again
4. Make sure the workflow is Enabled

Publishing will replace the previous version instantly.

⚠️ If you forget to save, the old version remains deployed.

# Monitoring Execution

Once published, you can monitor workflow activity:

- Execution logs
- Trigger event logs
- Node-level input/output
- Error traces
- Success history

This helps validate and debug production automations.

# Summary
Publishing activates your workflow and makes it eligible to run via triggers.
Key points to remember:

- Always Save before Publishing
- Publishing deploys the saved version
- Workflows can be Enabled or Disabled
- Disabled workflows never run — even if triggers fire
- Published workflows can run through schedules, integrations, events, webhooks, manual runs, or optional API calls