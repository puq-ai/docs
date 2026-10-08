---
title: Discord
description: Learn how to connect to Discord in puq.ai
parent: Connections
nav_order: 4.5
---

# Discord
Learn how to connect Discord to puq.ai.

The Discord connection lets a workflow send a message to a Discord channel through a channel webhook, with an optional username/avatar override and text-to-speech flag. Discord can also be used as a notification channel for [Human in the Loop](/nodes/node-categories/core-nodes/human-in-the-loop/) approval requests.

Unlike Slack or Telegram, this connection does not use a bot account — it posts directly to one fixed channel through its webhook URL, and there are no triggers.

## Prerequisites
- A Discord server where you have the **Manage Webhooks** permission.

## Step 1
In Discord, open your server and go to **Server Settings > Integrations > Webhooks**.

## Step 2
Click **New Webhook** (or select an existing one). Choose the channel it should post to, and optionally set a name and avatar for it.

## Step 3
Click **Copy Webhook URL**.

## Step 4 — Add the connection in puq.ai
1. Open **Connections** in the sidebar and click **New Connection**.
2. Search for and select **Discord**.
3. The dialog "Connect to Discord" opens and shows: *Configure Discord webhook for sending messages. Create a webhook in your Discord server: Server Settings > Integrations > Webhooks > New Webhook*.
4. Fill in the **Connection Name** (prefilled, editable) and paste the URL from Step 3 into the **Webhook URL** field.
5. Click **Save**.

## Fields

| Field | Required | Description |
|-------|----------|--------------|
| **Connection Name** | Yes | Name used to identify this connection in puq.ai |
| **Webhook URL** | Yes | Discord webhook URL from `Server Settings > Integrations > Webhooks`. Must be a valid `discord.com/api/webhooks/...` URL |

## Common Errors
- **"Discord webhook URL is required for authentication."** — the Webhook URL field was left empty.
- **"Invalid Discord webhook URL format."** — the value isn't a valid URL or doesn't contain `discord.com/api/webhooks/`; copy it again from Discord.
- **HTTP 404 from Discord** — the webhook was deleted or the channel it pointed to was removed; create a new webhook and update the connection.
- **HTTP 401 from Discord** — the webhook token in the URL is invalid; create a new webhook.

## Using Discord as a Human in the Loop Channel
Select **Discord** as the Notification Channel on a **Request Approval** step and choose this connection. There is no Recipients field for Discord — the approval message is always posted to the channel the webhook was created for.

## Best Practices
- Create one webhook per destination channel; a webhook URL cannot be redirected to a different channel later without recreating it.
- Treat the webhook URL as a secret — anyone who has it can post messages to that channel without a Discord account.
