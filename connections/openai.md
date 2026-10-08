---
title: OpenAI
description: Learn how to connect to OpenAI in puq.ai
parent: Connections
nav_order: 10
---

# OpenAI
Learn how to connect OpenAI to puq.ai.

The OpenAI connection lets workflow steps call the OpenAI API: model responses, legacy chat completions, embeddings, image generation, conversations, assistants, threads and messages, project/user administration, and audio (speech, transcription, translation).

{: .note }
This connection is only needed for the **OpenAI** integration steps, which call OpenAI with your own API key and are billed by OpenAI. To use OpenAI models without your own key, use the [Model Router](/nodes/node-categories/core-nodes/model-router/) node instead; it needs no connection and is billed to your puq.ai balance.

## Prerequisites
- An OpenAI account with API access at [platform.openai.com](https://platform.openai.com/).
- Billing configured on the account (OpenAI requires this before API keys can make requests).

## Step 1
Go to [platform.openai.com](https://platform.openai.com/) and sign in.

## Step 2
Open **API Keys**.

## Step 3
Click **Create new secret key**, name it, and click **Create secret key**.

## Step 4
Copy the key (it starts with `sk-`). OpenAI shows it only once — store it safely before closing the dialog.

## Step 5 (optional) — Organization ID
If your account belongs to more than one organization, open your organization settings on platform.openai.com and copy the Organization ID. It is only needed when you belong to multiple organizations; otherwise leave it blank.

## Step 6 — Add the connection in puq.ai
1. Open **Connections** in the sidebar and click **New Connection**.
2. Search for and select **OpenAI**.
3. The dialog "Connect to OpenAI" opens and shows: *Authentication for OpenAI API. Provide your API key, organization ID (optional), and base URL.*
4. Fill in the **Connection Name** (prefilled, editable) and the fields below.
5. Click **Save**.

## Fields

| Field | Required | Description |
|-------|----------|--------------|
| **Connection Name** | Yes | Name used to identify this connection in puq.ai |
| **API Key \*** | Yes | API key from `platform.openai.com > API Keys > Create new secret key` |
| **Organization ID (optional)** | No | Only required if you belong to multiple organisations |
| **Base URL** | No | OpenAI API base URL. Defaults to `https://api.openai.com/v1`; change it only if you route requests through an OpenAI-compatible endpoint |

## Common Errors
- **"OpenAI API key is required for authentication."** — the API Key field was left empty.
- **`OpenAI API Error (HTTP 401)`** — the key is invalid, revoked, or was pasted with extra whitespace. Create a new key and update the connection.
- **`OpenAI API Error (HTTP 429)`** — the account hit OpenAI's rate limit or has insufficient quota/billing.
- **`OpenAI API Error (HTTP 404)` on an action** — usually means the requested model, assistant, thread, or file ID doesn't exist for this account/organization.
- **Connection/timeout errors** — usually caused by a custom **Base URL** that is unreachable or misconfigured; leave it at the default unless you specifically need a proxy.

{: .note }
There is no separate "test connection" step — errors from an invalid key only surface the first time a workflow step using this connection actually runs.
