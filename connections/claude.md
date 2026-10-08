---
title: Claude
description: Learn how to connect to Claude (Anthropic) in puq.ai
parent: Connections
nav_order: 3.5
---

# Claude
Learn how to connect Claude (Anthropic) to puq.ai.

The Claude connection lets workflow steps call the Anthropic API to generate and manage messages, work with message batches and files, look up available models, and run puq.ai's prompt-helper actions (Generate Prompt, Improve Prompt, Templatize Prompt).

{: .note }
This connection is only needed for the **Claude** integration steps, which call Anthropic with your own API key and are billed by Anthropic. To use Claude models without your own key, use the [Model Router](/nodes/node-categories/core-nodes/model-router/) node instead; it needs no connection and is billed to your puq.ai balance.

## Prerequisites
- An Anthropic account with API access at [console.anthropic.com](https://console.anthropic.com/).
- Billing configured on the account if your usage requires it (Anthropic enforces this on their side).

## Step 1
Go to [console.anthropic.com](https://console.anthropic.com/) and sign in.

## Step 2
Open **Settings > API Keys** ([console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)).

## Step 3
Click **Create Key**, give it a name, and click **Create**.

## Step 4
Copy the key (it starts with `sk-ant-`). Anthropic shows it only once — store it safely before closing the dialog.

## Step 5 — Add the connection in puq.ai
1. Open **Connections** in the sidebar and click **New Connection**.
2. Search for and select **Claude**.
3. The dialog "Connect to Claude" opens and shows: *Connect to Claude AI using your Anthropic API key. Get your API key from https://console.anthropic.com/*.
4. Fill in the **Connection Name** (prefilled, editable) and the **API Key** field with the key from Step 4.
5. Click **Save**.

## Fields

| Field | Required | Description |
|-------|----------|--------------|
| **Connection Name** | Yes | Name used to identify this connection in puq.ai |
| **API Key** | Yes | Your Anthropic API key from `console.anthropic.com/settings/keys` |

## Common Errors
- **"Claude API key is required for authentication."** — the API Key field was left empty.
- **`Claude API Error (HTTP 401)` with `Type: authentication_error`** — the key is invalid, revoked, or was pasted with extra whitespace. Create a new key and update the connection.
- **`Claude API Error (HTTP 429)`** — the account hit Anthropic's rate or usage limit for the key's organization.
- **`Invalid JSON response from Claude API`** — Anthropic returned a non-JSON response; retry, and check [status.anthropic.com](https://status.anthropic.com/) if it persists.

{: .note }
There is no separate "test connection" step — errors from an invalid key only surface the first time a workflow step using this connection actually runs.
