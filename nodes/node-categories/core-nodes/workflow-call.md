---
title: Workflow Call
description: Trigger another one of your workflows by calling its webhook, with an optional JSON payload.
parent: Core Nodes
nav_order: 16.5
---

# Workflow Call

The **Workflow Call** piece's **Call Workflow** action triggers another one of your workflows by calling its webhook URL, with an optional JSON payload. It's found under the **Developer Tools** category in the Add Step panel.

The call starts the target workflow and returns immediately — it does **not** wait for the target workflow to finish, and it does not return the target's result.

---

## How It Works

1. Add a **Workflow Call** step and pick its **Call Workflow** action.
2. Choose the target **Workflow** and, optionally, a **Payload**.
3. When the step runs, puq.ai sends an HTTP `POST` with your payload to the target workflow's **Async Webhook** URL and waits for it to acknowledge the request.
4. The target workflow then runs on its own — this step moves on to its own next step without waiting for the target to complete.

---

## Settings

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Workflow** | Yes | — | The workflow to call, selected from your workflows that have a webhook URL |
| **Payload (JSON)** | No | — | JSON data to send to the workflow webhook |

If none of your workflows have a webhook URL yet, the **Workflow** list shows "No workflows with webhooks found".

---

## Sync or Async?

Workflow Call always calls the target's [Async Webhook endpoint](/nodes/node-categories/trigger-nodes/webhook-trigger/#async-endpoint), never the Sync one. That endpoint queues the target workflow and responds right away, so Workflow Call never waits for the target workflow to finish.

{: .note }
The `response` output below is the target's "run started" acknowledgement, not the target workflow's own result. To see how the target actually finished, look up its run in [Execution History](/executions/execution-history/) using the `run_id`, or have the target call back with its own Workflow Call / [Respond to Webhook](/nodes/node-categories/core-nodes/respond-to-webhook/) step.

---

## Output

| Field | Type | Description |
|-------|------|--------------|
| `success` | boolean | `true` when the target's webhook endpoint returned a 2xx status (the run was accepted) |
| `status_code` | number | HTTP status code returned by the target's webhook endpoint |
| `response` | object or string | Body returned by the call. On success this is `{ "message": "Workflow run started successfully", "run_id": ..., "workflow_id": ..., "version_id": ... }` |
| `webhook_url` | string | The full webhook URL that was called |
| `payload_sent` | object | The JSON payload that was actually sent |

---

## Errors

- **No workflow selected** — fails with "Please select a workflow".
- **Invalid JSON payload** — fails if **Payload (JSON)** is a string that isn't valid JSON.
- **The call itself fails** (timeout, network error) — fails with "Failed to call workflow webhook: …". By default, **Retry on failure** is on for this step, so transient failures are retried automatically.

A target workflow that is unpublished, not found, or over its monthly run limit does **not** fail the Workflow Call step — it only shows up as `success: false` with the target's error in `response`, since the call itself still completed.

**Continue on failure** is not configurable for this step.

---

## Example: Splitting a Large Job

1. **Trigger** — a large list of records arrives
2. **Loop** — for each record:
   - **Workflow Call** → target: `process-record`, Payload: the current record
3. The `process-record` workflow runs independently for every record instead of one long sequential workflow.

---

## Best Practices

- Use Workflow Call to split a large workflow into smaller, reusable workflows, or to fan out work to several workflows from one trigger.
- Don't rely on `response` for the target's output — it only confirms the target started. Check [Execution History](/executions/execution-history/) with the returned `run_id` if you need to know how the target finished.
- Keep the target workflow **published**; an unpublished target reports `success: false` instead of running.
