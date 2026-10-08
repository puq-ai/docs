---
title: Respond to Webhook
description: Send a custom HTTP status code, body, and headers back to the caller of a workflow's Sync Webhook endpoint.
parent: Core Nodes
nav_order: 11.5
---

# Respond to Webhook

The **Respond to Webhook** action sends a custom HTTP response — status code, body, and headers — back to the caller of a workflow's [Sync Webhook endpoint](/nodes/node-categories/trigger-nodes/webhook-trigger/#sync-endpoint). Use it to build API-style endpoints on top of a workflow.

It's the **Respond to Webhook** action of the **Webhook** piece (Core category) in the Add Step panel.

---

## How It Works

- The action **immediately sends a response** to the webhook caller.
- Any steps after this action **continue executing in the background**, unless **Stop Workflow After Response** is on.
- Only the **first** Respond to Webhook action that runs in an execution sends the response.
- It only matters for workflows called at the **Sync Webhook endpoint** — by the time an Async Webhook call (or any other trigger) reaches this step, the caller has already received its response, so the step still runs but has no visible effect on them.

---

## Response Types

| Type | Content-Type | Use Case |
|------|--------------|----------|
| **JSON** | `application/json` | API responses, structured data |
| **Plain Text** | `text/plain` | Simple messages |
| **HTML** | `text/html` | Web pages, formatted content |
| **XML** | `application/xml` | Legacy systems, SOAP |
| **Redirect** | — | URL redirections (301/302) |
| **Custom** | `application/octet-stream` | Binary data, files |

---

## Settings

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Response Type** | Yes | JSON | JSON, Plain Text, HTML, XML, Redirect, or Custom |

### JSON, Plain Text, HTML, XML, and Custom

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **HTTP Status Code** | Yes | `200 OK` | One of a fixed list of common 2xx, 3xx, 4xx, and 5xx codes (200, 201, 202, 204, 301–308, 400, 401, 403, 404, 405, 409, 422, 429, 500, 502, 503) |
| **Response Body** | No | — | The content to return. For JSON, a valid JSON string is normalized automatically |
| **Custom Headers** | No | `{}` | Extra HTTP headers to add to the response, as key/value pairs |
| **Stop Workflow After Response** | No | Off | If on, the workflow stops after sending the response. If off, the steps after this one keep running in the background |

### Redirect

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Redirect URL** | Yes | — | The URL to redirect the caller to |
| **Redirect Type** | No | `302 - Temporary Redirect` | `302 - Temporary Redirect` or `301 - Permanent Redirect` |
| **Custom Headers** | No | `{}` | Extra HTTP headers to add to the response |

A Redirect response always stops the rest of the workflow — there is no **Stop Workflow After Response** option for it.

---

## How the Response Body Is Built

- **JSON** — an object/array Response Body is encoded as JSON. A string Response Body is parsed and re-encoded if it's valid JSON; otherwise it's wrapped as `{"data": "<your text>"}`. An empty body becomes `{"success": true}`.
- **XML** — an object/array Response Body is converted to XML. A string Response Body is used as-is if it's already valid XML, otherwise wrapped as `<response><data>...</data></response>`. An empty body becomes `<response><success>true</success></response>`.
- **HTML** — used as-is; an empty body becomes a minimal "Success" page.
- **Plain Text** — used as-is; an empty body becomes `OK`.
- **Custom** — sent exactly as entered, with the `application/octet-stream` content type.

The **Content-Type** header is set automatically from **Response Type**; anything you add under **Custom Headers** is added on top (and can override it).

---

## Output

| Field | Type | Description |
|-------|------|--------------|
| `success` | boolean | `true` |
| `response_sent` | boolean | `true` |
| `status_code` | number | The status code that was sent |
| `content_type` | string | The `Content-Type` header that was sent |
| `body_length` | number | Length of the response body in characters |
| `headers` | object | All headers that were sent |

A Redirect response instead returns `redirect: true`, `redirect_url`, and `status_code`.

---

## Errors and Limitations

- **Redirect** fails with "Redirect URL is required for redirect response type" if **Redirect URL** is empty.
- An invalid **Redirect Type** silently falls back to `302`.
- **Continue on failure** and **Retry on failure** are not available for this step.

---

## Example: Simple Validation API

1. **Webhook Trigger** — called at the workflow's Sync Webhook endpoint
2. **Router**
   - Input invalid → **Respond to Webhook**: JSON, status `422`, body `{ "error": "Invalid request" }`
   - Input valid → continue processing, then **Respond to Webhook**: JSON, status `200`, body with the result

---

## Best Practices

- Call the workflow at its **Sync Webhook endpoint** (see [Webhook Trigger](/nodes/node-categories/trigger-nodes/webhook-trigger/)) — this step has no visible effect on Async Webhook callers.
- Turn on **Stop Workflow After Response** for pure request/response endpoints; leave it off when you want logging or follow-up steps to keep running after the caller gets a response.
- Put only one Respond to Webhook action on each path through the workflow so the intended response is always the one sent.
- Use **Redirect** for sign-in or consent-style flows that need to send the caller's browser somewhere else.
