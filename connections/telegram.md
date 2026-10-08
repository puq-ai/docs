---
title: Telegram
description: Learn how to connect to Telegram in puq.ai
parent: Connections
nav_order: 15.25
---

# Telegram
Learn how to connect Telegram to puq.ai.

The Telegram connection lets workflows send text messages and photos, manage chats (get chat info, administrators, a member, leave a chat, set title/description), edit and pin/unpin or delete messages, and react to incoming updates through triggers (new message, edited message, channel post, edited channel post, inline query, callback query, poll, poll answer). Telegram can also be used as a notification channel for [Human in the Loop](/nodes/node-categories/core-nodes/human-in-the-loop/) approval requests.

## Prerequisites
- A Telegram account.
- A bot created through Telegram's own @BotFather bot — puq.ai does not create the bot for you.

## Step 1
Open Telegram and start a chat with **@BotFather**.

## Step 2
Send the command `/newbot`.

## Step 3
Reply with a display name for your bot, then a username for it (must end in `bot`).

## Step 4
BotFather replies with the bot's access token (a string like `123456789:ABCdefGhIJKlmNoPQRstuVWXyz`). Copy it and keep it private — anyone with this token can control the bot.

## Step 5 — Add the connection in puq.ai
1. Open **Connections** in the sidebar and click **New Connection**.
2. Search for and select **Telegram**.
3. The dialog "Connect to Telegram" opens and shows: *Configure Telegram Bot API token*.
4. Fill in the **Connection Name** (prefilled, editable) and the **Bot Token** field with the token from Step 4.
5. Click **Save**.

## Fields

| Field | Required | Description |
|-------|----------|--------------|
| **Connection Name** | Yes | Name used to identify this connection in puq.ai |
| **Bot Token** | Yes | Access token from `@BotFather`: start a chat with @BotFather, send `/newbot`, provide a bot name and username, then copy the token it returns |

## Common Errors
- **"Bot token is required for Telegram authentication."** — the Bot Token field was left empty.
- **`Telegram API error: Unauthorized`** — the token is invalid or was regenerated/revoked in @BotFather; get a fresh token and update the connection.
- **`Telegram API error: chat not found`** — the chat ID or `@username` is wrong, or the target user/chat has never interacted with the bot.
- **`Telegram API error: bot was blocked by the user`** — the recipient blocked the bot; they must unblock it to receive messages again.

{: .warning }
Telegram bots cannot start a conversation. A user must send the bot a message first (for example, by opening its `t.me/<username>` link and pressing **Start**) before the bot can message that user directly.

## Using Telegram as a Human in the Loop Channel
Select **Telegram** as the Notification Channel on a **Request Approval** step and choose this connection. Recipients must be numeric chat IDs (recommended) or `@usernames`; anything else is ignored. As above, each recipient must have already started a conversation with the bot — the bot cannot message someone who hasn't done this.

## Best Practices
- Use numeric chat IDs instead of `@usernames` where possible; they don't depend on a username lookup and keep working if the user renames their account.
- Keep the bot token out of shared documents — treat it like a password, since it is the only credential needed to control the bot.
