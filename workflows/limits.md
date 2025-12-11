---
title: Limits
description: Understand puq.ai workflow and execution limits.
parent: Workflows
nav_order: 5
---

# Workflow Limits

Each puq.ai plan comes with specific limits on workflow usage, execution volume, and concurrency.  
These limits ensure stable performance and predictable scaling while giving teams the flexibility they need to automate their processes.

Below is an overview of the limits associated with each plan:

| Plan | Active Workflows | Monthly Executions | Concurrent Runs |
|------|------------------|--------------------|-----------------|
| **Starter** | 1 | 1,000 | 1 |
| **Professional** | 1 | 10,000 | 1 |
| **Enterprise** | Unlimited | Unlimited | 5 |

---

# Limit Types Explained

## 1. Active Workflows
This represents the maximum number of **enabled and ready-to-run** workflows you can have at the same time.

- Disabled workflows do **not** count against this limit.  
- Draft workflows can be saved but will not run until published and enabled.

Examples:
- **Starter** users can design many workflows but can only have **1 active** at any moment.  
- **Enterprise** plans allow **unlimited active workflows**.

---

## 2. Monthly Executions
This is the total number of workflow runs allowed per billing cycle.

A single execution is counted every time a workflow starts — regardless of:
- Trigger type (schedule, webhook, integration event, manual run, or API call)
- Whether the run succeeds or fails
- Whether the workflow finishes early or runs multiple branches

Examples:
- If your flow runs 100 times per day → ~3,000 executions/month  
- Large-scale automations (e.g., CRM syncing or inbound events) may require **Enterprise** limits

If you exceed the limit:
- Executions pause until the next billing cycle  
- You may upgrade to remove or expand your limits

---

## 3. Concurrent Runs
Concurrency determines **how many executions can run simultaneously**.

For example:
- A workflow that processes large files or calls multiple APIs might take 5–10 seconds.
- With only **1 concurrent run**, additional executions must wait in queue.
- With **5 concurrent runs**, five executions can run at the same time while others queue.

Concurrency matters most for:
- High-volume API/webhook triggers  
- Bulk data processing  
- Loops over large datasets  
- Operational workflows with time-sensitive logic

---

# How Limits Affect Automation

Understanding limits helps you design efficient, scalable workflows.  
Here’s how limits commonly influence automation behavior:

### ✔ High inbound traffic?
Concurrency and execution limits determine peak performance.

### ✔ Many small workflows?
Active workflow limits matter more than execution volume.

### ✔ Heavy integrations (CRM, e-commerce, file processing)?
Monthly executions could accumulate quickly.

### ✔ Batch jobs or cron-based flows?
Concurrency impacts how jobs run under load.

---

# Monitoring Your Usage

You can track usage from the puq.ai dashboard:

- Total executions used this month  
- Remaining executions  
- Whether limits are about to be reached  
- Which workflows consume the most executions  
- Any queued or delayed runs caused by concurrency limits  

Alerts can notify you when you’re close to your plan’s capacity.

---

# Exceeding Your Limits

If your automations approach or exceed limits, you have several options:

- Optimize workflows to reduce unnecessary runs  
- Merge multiple small workflows into a single, efficient flow  
- Disable unused flows  
- Upgrade your plan  
- Contact puq.ai for custom scaling

---

# Need Higher Limits?

If your team requires increased concurrency, higher execution volumes, or unlimited workflows, the **Enterprise** plan offers fully customizable scaling options.

For custom plans, contact:  
📧 **support@puq.ai**