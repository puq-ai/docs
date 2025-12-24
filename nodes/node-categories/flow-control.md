---
title: Flow Control Nodes
description: Learn how Flow Control nodes orchestrate workflow logic, manage branching, looping, delays, routing, and integrate with external services to control execution flow.
parent: Node Categories
nav_order: 3
---

# Flow Control Nodes

Flow Control Nodes define **how a workflow runs**, **when it progresses**, and **which path it should take**.  
While Trigger Nodes *start* a workflow, Flow Control Nodes *shape* its entire execution sequence — enabling branching, waiting, looping, service-based operations, and conditional navigation.

These nodes are essential for building dynamic automation that adapts to data, external services, and business rules.

---

## What Are Flow Control Nodes?

Flow Control Nodes are responsible for:

- Directing workflow execution  
- Pausing or scheduling workflow continuation  
- Branching logic based on conditions  
- Repeating a set of steps in a loop  
- Controlling execution using external service data  
- Coordinating multi-step, multi-system flows  

They essentially act as the **logic layer** of a workflow.

---

## What Problems Do Flow Control Nodes Solve?

Flow Control Nodes help you:

- Build complex conditional flows  
- Integrate decision-making into automations  
- Process dynamic data sets (lists, tasks, events)  
- Control workflow timing  
- Adapt execution based on external system states  
- Optimize workflows to run only when necessary  

With these nodes, workflows become **smarter**, **dynamic**, and **context-aware**.

---

# Core Categories of Flow Control Nodes

Below are the major groups of Flow Control Nodes and what they allow you to do.

---

## 1. Routing & Decision Nodes

These nodes direct the workflow based on rules or conditions.

### **Router**
Route the workflow into different branches based on:
- Conditions (e.g., `amount > 100`)
- Data checks (`status == "success"`)
- Field comparisons
- Logical evaluation

**Use cases:**
- Success / failure branching  
- Payment validation flows  
- Conditional approval processes  

---

## 2. Looping Nodes

Loop nodes allow repeating a sequence until a condition is met.

### **Loop**
Supports:
- For-each loops  
- Do-while logic  
- Iterations over arrays  
- Paginated API loops  

**Use cases:**
- Batch processing  
- Iterating over tasks  
- Repeating retries  
- Processing list-based data  

---

## 3. Delay & Timing Nodes

### **Delay For**
Pause the workflow for a specific duration.

### **Delay Until**
Hold the workflow until a specific timestamp.

**Use cases:**
- Scheduling  
- Throttling  
- Time-based branching  
- Reminder systems  

---

# 4. Service-Based Flow Nodes

Some Flow Control nodes interface with popular platforms and tools.  
Bunların bir kısmı veri yönetimi veya task yönetimi sağlar, ama workflow’un akışını etkiledikleri için Flow Control kategorisine girer.

Aşağıdaki liste *tam bir özellik listesi değil*, bu node tipinin neler yapabildiğini göstermek için örneklendirilmiş bir özet niteliğindedir.

---

## Acuity Scheduling
Automate scheduling tasks such as:

- Creating appointments  
- Updating appointments  
- Checking availability dates & times  
- Managing clients  
- Adding or removing blocks  

**Flow control use case:**  
Route the workflow based on calendar availability or scheduling results.

---

## Asana
Manage teams, tasks, projects, and workflow states.

- Create & update tasks  
- Add tags  
- Modify projects  
- Fetch stories or activity logs  

**Flow control use case:**  
Branch based on task status, due dates, or team assignments.

---

## AWS SES
Email-based flow controls:

- Send email or template email  
- Verify email addresses  
- Manage templates  

**Flow control use case:**  
Trigger branching based on email send success or verification status.

---

## AWS SNS
Message-based triggers:

- Create & delete topics  
- Publish notifications  

**Flow control use case:**  
Route workflow depending on publish result or topic status.

---

## AWS SQS
Queue-based flow logic:

- Send messages into a queue  
- Initiate downstream processing  

**Flow control use case:**  
Push control signals into message queues.

---

## ClickUp
Used for task, list, space, and project operations.

Flow control patterns:
- Wait for task completion  
- Branch based on task priority  
- Schedule reminders  

---

## GitLab
Use GitLab data to control flow:

- Issues  
- Pipelines  
- Merge requests  

**Flow control use case:**  
Trigger branches when merge request fails or passes review.

---

## Google Workspace Admin
Workflow control based on:

- User creation  
- Group membership  
- Policy status  

---

## Jira
Integrate with issue workflows.

Use cases:
- Branch if issue is resolved  
- Loop through issue lists  
- Check current sprint state  

---

## Keap, Kommo, Salesforce, Salesmate
CRM systems used for:

- Checking deal stage  
- Routing based on lead status  
- Scheduling follow-ups  

**Flow control use case:**  
Branch logic depending on sales pipeline progress.

---

## Monday, Linear, ServiceMB, ClickUp, QuickBase, Trello, Todoist, Vikunja
Task-management flow:

- Move tasks  
- Check statuses  
- Assign owners  
- Branch based on task priority or completion state  

---

## Slack, Mattermost, TheHive
Chat-based flow control:

- Post messages  
- Fetch channels  
- React to alerts  
- Conditional branching based on user actions  

---

## SIGNL4
Incident-based routing:

- Alert dispatching  
- Routing based on acknowledgment status  

---

## UniSender, Xero, Trellix, Onfleet
Workflow control examples:

- Email campaign results  
- Invoice status checks  
- Delivery / courier status  
- Security event responses  

---

# What Can You Build With Flow Control Nodes?

Flow Control Nodes empower you to build workflows like:

### Multi-branch decision trees  
### Approval → rejection → escalation flows  
### Process loops / batch jobs  
### Delayed or scheduled tasks  
### Conditional automation based on external services  
### Retry and fallback structures  
### Multi-system orchestration  

They act as the **logic brain** of your automation.

---

# Summary

Flow Control Nodes:

- Direct how workflows execute  
- Enable decision-making  
- Support loops & repeats  
- Control timing  
- Integrate with external task, CRM, and scheduling systems  
- Allow branching, pausing, retrying, and adaptive logic  

They are essential for building robust, intelligent, and dynamic automation flows.