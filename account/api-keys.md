---
title: API Keys
description: Create and manage API keys to call the puq.ai API from external systems.
parent: Account & Billing
nav_order: 1
permalink: /account/api-keys/
---

# API Keys

**Settings → API Keys** lists the API keys on your account and lets you create new ones. Keys
authenticate requests made directly to the puq.ai API from your own code or external systems — see
the [API documentation](/api/) for how to use them in requests.

## Creating a key

1. Click **Create API Key**.
2. Enter a **Name** (3–100 characters) that helps you identify where the key is used.
3. Click **Create API Key** in the dialog.

The new key is shown **once**, in a dialog titled **API Key Created**. Click **Show API key** to
reveal it, then **Copy API key** (or **Copy and close**) to save it somewhere safe.

{: .warning }
The full key value is returned only at creation time. puq.ai does not display it again — if you
lose it, revoke the key and create a new one.

## What's shown in the list

Each key in the table shows:

| Column | Description |
|--------|-------------|
| **Name** | The name you gave the key, with its numeric ID |
| **Created** | When the key was created |
| **Last Used** | The date of its most recent use, or **Never** if it hasn't been used |

## Revoking a key

Open the row's actions menu (**⋯**) and choose **Delete**. Confirm in the dialog. Deleting a key
is permanent — any application still using it immediately loses access and must switch to a new
key.
