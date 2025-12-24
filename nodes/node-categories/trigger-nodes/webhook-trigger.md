---
title: Webhook Trigger
description: Trigger workflows in puq.ai using incoming HTTP requests.
parent: Trigger Nodes
nav_order: 1
---

# Webhook Trigger

The **Webhook Trigger** allows a workflow to start automatically when an HTTP request is sent to a specific URL.  
This makes it ideal for event-driven automation, external system integrations, and real-time processing.

Whenever a request reaches the webhook endpoint, the workflow is triggered instantly.

---

## How Webhook Trigger Works

1. A workflow is configured with a **Webhook Trigger**.
2. puq.ai generates one or more webhook URLs for that workflow.
3. An external system sends an HTTP request to the webhook URL.
4. The workflow starts running based on the incoming request data.

The request payload becomes available as input data for subsequent nodes.

---

## Where to Find the Webhook URLs

You can access webhook URLs directly from the workflow editor.

### Steps:
1. Open your workflow.
2. Look at the **top-right corner** of the editor.
3. Click the **three-dot (…) menu**.
4. Select **Webhook** from the dropdown.
5. A modal opens showing **two different webhook endpoints**.

---

## Webhook Endpoint Types

puq.ai provides **two types of webhook endpoints**, each designed for different use cases.

---

### Async Endpoint

**Async Endpoint** processes the workflow in the background and responds immediately.

**Description:**
> Return immediately and process the workflow asynchronously.

**Behavior:**
- Returns a response as soon as the request is received
- Workflow continues running in the background
- Caller does **not** wait for workflow completion

**Best for:**
- Fire-and-forget integrations
- High-frequency events
- External systems that don’t need results
- Avoiding request timeouts

---

### Sync Endpoint

**Sync Endpoint** waits until the workflow finishes execution and then returns the result.

**Description:**
> Waits for the workflow to complete and returns the result.

**Behavior:**
- Request stays open until workflow execution finishes
- Final workflow output is returned in the response
- Execution time affects response duration

**Best for:**
- Request–response workflows
- APIs expecting processed data
- Validation or transformation use cases
- When the caller needs an immediate result

---

## Using Incoming Data

Data sent to the webhook (headers, query parameters, body) is automatically captured and passed into the workflow execution.

This data can be:
- Mapped into node inputs
- Transformed using **Parameter Mapping**
- Used in conditions, routing, or validations

No manual configuration is required to pass data forward — puq.ai handles this automatically.

---

## Common Use Cases

- Trigger workflows from external applications
- Integrate third-party systems via HTTP
- Receive form submissions
- Process events from backend services
- Build custom APIs using workflows

---

## Notes & Best Practices

- Use **Async Endpoint** for long-running workflows
- Use **Sync Endpoint** only when results are required immediately
- Protect webhook URLs and rotate them if exposed
- Test webhooks using tools like Postman or curl
- Ensure the workflow is **Enabled** to allow execution

---

## Summary

The Webhook Trigger enables real-time, event-based automation by starting workflows through HTTP requests.  
With both **Async** and **Sync** endpoints available, puq.ai gives you full control over how external systems interact with your workflows.

Choose the endpoint type based on whether you need speed or results.