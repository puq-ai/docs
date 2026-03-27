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
| **Starter** | 1 | 2,000 | 1 |
| **Professional** | 5 | 10,000 | 2 |
| **Enterprise** | Unlimited | 30,000 | 5 |

---

## Limit Types Explained

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
- High-volume automations (e.g., CRM syncing, inbound webhooks, or data pipelines) may require **Enterprise** limits

If you exceed the limit:
- Executions pause until the next billing cycle  
- You may upgrade your plan to increase limits

---

## 3. Concurrent Runs
Concurrency determines **how many executions can run simultaneously**.

For example:
- A workflow that processes large files or calls multiple APIs might take several seconds.
- With only **1 concurrent run**, additional executions must wait in queue.
- With **5 concurrent runs**, multiple executions can run in parallel.

Concurrency matters most for:
- High-volume API or webhook triggers  
- Bulk data processing  
- Loops over large datasets  
- Time-sensitive operational workflows

---

## How Limits Affect Automation

Understanding limits helps you design efficient, scalable workflows.

**✔ High inbound traffic?**

Execution and concurrency limits define peak throughput.

**✔ Many small workflows?**

Active workflow limits become more important than execution volume.

**✔ Heavy integrations (CRM, file processing, analytics)?**

Monthly executions can accumulate quickly.

**✔ Scheduled or batch workflows?**

Concurrency impacts completion time under load.

---

## Monitoring Your Usage

You can monitor usage directly from the puq.ai dashboard:

- Monthly execution usage  
- Remaining executions  
- Approaching limits  
- Workflows with the highest execution counts  
- Queued or delayed runs caused by concurrency limits  

Alerts notify you when usage approaches plan limits.

---

## Exceeding Your Limits

If your workflows approach or exceed limits, you can:

- Optimize workflows to reduce unnecessary executions  
- Merge multiple workflows into a single flow  
- Disable unused workflows  
- Upgrade your plan  
- Contact puq.ai for custom scaling options

---

## Need Higher Limits?

If your automation needs exceed standard limits, the **Enterprise** plan provides customizable execution volumes and concurrency.

For custom plans, contact:  
📧 **support@puq.ai**
