---
title: Building Flows
description: Learn how to create powerful automations using puq.ai’s visual workflow builder.
parent: Workflows
nav_order: 1
---

# Building Flows

The Visual Builder allows you to design, automate, and orchestrate complex workflows without writing code.  
Whether you’re creating a simple data transformation or a multi-step business process, flows in puq.ai give you the flexibility, speed, and clarity needed to automate anything.

This guide walks you through the essentials of building your first flow and introduces best practices for structuring clean, scalable automations.

---

## Getting Started

Creating your first workflow takes only a few minutes:

1. Navigate to **Workflows → New Workflow**.
2. Give your flow a name and open the **Visual Builder**.
3. Drag **Trigger**, **Action**, and **Logic** nodes onto the canvas.
4. Connect nodes to define the execution path.
5. Test the workflow using **Live Testing Mode** and validate results in real time.

Once your flow is ready, click **Save** and enable **Run Mode** to make it active.

---

## Understanding the Core Building Blocks

Workflows consist of three main node types:

### 🔵 Trigger Nodes  
Start the workflow.  
Examples: *Webhook, Scheduled Trigger, Form Submission, Event Listener*

A workflow **cannot** run without a trigger, and each workflow can only have **one**.

### 🟣 Action Nodes  
Perform an operation — send an email, fetch data, create a record, call an API, etc.  
Actions represent the “work” your automation performs.

### 🟠 Logic Nodes  
Control the flow: branching, looping, routing, transforming data, evaluating conditions, and more.  
Logic nodes help you build dynamic and intelligent workflows.

---

## Building Your Flow Step-by-Step

### 1. Add a Trigger  
Choose how your workflow should start:

- When an HTTP request arrives  
- At a scheduled time  
- On an event (e.g., new contact, form submission)  
- When a webhook fires  
- Manually (quick tests)

### 2. Add Action Nodes  
Perform operations such as:

- Sending emails  
- Calling APIs  
- Creating CRM records  
- Generating documents  
- Running AI models  
- Writing to spreadsheets  
- Uploading files  

Actions can be chained together to form multi-step sequences.

### 3. Add Logic Nodes  
Use logic nodes to make your automation smart:

- **Routers** (if/else branches)  
- **Loops** (repeat over lists)  
- **Model Routers** (send text to different AI models)  
- **Data Transformers**  
- **Delays** and **Timers**  
- **Error handling** and fallback paths  

These allow you to control exactly how data flows between steps.

### 4. Connect the Nodes  
Drag edges between nodes to define the order of operations.  
A flow runs top-to-bottom, following the connected paths.

### 5. Test Your Workflow  
Use **Live Testing Mode** to run the workflow step-by-step.

You can:

- Inspect real input/output data  
- Validate transformations  
- Catch errors early  
- Modify the flow and retest instantly  

This makes debugging extremely fast and visual.

---

## Designing Clean and Scalable Flows

Follow these best practices:

**✔ Keep flows modular**

One workflow should solve one clear problem.  
For complex systems, break automations into subflows.

**✔ Name nodes clearly**

Use descriptive titles like:  
- *“Format Customer Data”*  
- *“Send Slack Notification”*  
- *“Check Inventory Levels”*

This is especially important when sharing flows with teammates.

**✔ Use routers to avoid unnecessary steps**

Instead of stacking actions, route data only to the nodes that need it.

**✔ Validate input early**

Use validators, JSON parsers, and condition checks to prevent downstream errors.

**✔ Add delays when interacting with rate-limited APIs**

Avoid throttling or API blocks.

**✔ Reuse global variables & environment secrets**

Never hardcode credentials.

---

## Example: A Simple Automation

Let’s design a basic flow:

**When a user submits a form:**

1. Trigger → *Form Submitted*  
2. Action → *Validate Email Address*  
3. Action → *Create Record in Airtable*  
4. Action → *Send Confirmation Email*  
5. Action → *Notify Slack Channel*  

This simple flow captures new leads, stores them, and notifies your team — all without manual effort.

---

## Example: A Branching Automation

**When a new order is received:**

- If payment status = “paid” → Fulfill order  
- If payment status = “pending” → Send reminder email  
- If payment status = “failed” → Notify support team  

Routers allow your automation to adapt to each situation.

---

## Using AI Copilot

puq.ai includes an AI-powered Copilot to accelerate flow creation.

Just type what you want to build:

> _“When a user submits a form, send an email and log the data to Airtable.”_

AI Copilot instantly:

- Generates the workflow structure  
- Adds the necessary nodes  
- Connects them  
- Configures basic inputs  
- Suggests improvements  

This is the fastest way to prototype or build standard automations.

---

## Final Tips

- Start small — test frequently  
- Use AI Copilot when you’re unsure how to begin  
- Group related steps visually  
- Keep flows clean and readable  
- Use logic to avoid unnecessary actions  
- Save often and review the logs  

---

Building flows becomes intuitive once you understand the structure.  
With triggers, actions, logic, and the visual builder, you can automate almost anything — from simple notifications to full business processes.
