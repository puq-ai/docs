---
title: Slack
description: Learn how to connect to Slack in puq.ai
parent: Connections
nav_order: 15.15
---

# Slack
Learn how to connect Slack to puq.ai.

The Slack connection lets workflows send and manage messages, reactions, files, and conversations, and lets Slack events (new messages, app mentions, reactions, channel creation, members joining a channel) start or continue workflows. Slack can also be used as a notification channel for [Human in the Loop](/nodes/node-categories/core-nodes/human-in-the-loop/) approval requests.

## Prerequisites
- A Slack workspace you can install apps to (or an admin who can install the app for you).
- Permission to create apps at [api.slack.com](https://api.slack.com/apps).

## Step 1
Go to [api.slack.com/apps](https://api.slack.com/apps) and sign in.

## Step 2
Click **Create New App > From scratch**, give the app a name, and pick the workspace to install it to.

## Step 3 — Add Bot Token Scopes
Open **OAuth & Permissions** in the left sidebar and scroll to **Scopes > Bot Token Scopes**. Add the scopes for the puq.ai actions and triggers you plan to use:

| puq.ai action / trigger | Bot Token Scope | Notes |
|---|---|---|
| Send Message, Send Me Message, Schedule Message | `chat:write` | |
| Add Reaction | `reactions:write` | |
| List Users | `users:read` (add `users:read.email` for email addresses) | |
| Lookup User by Email | `users:read.email` | |
| Kick User from Conversation (private channels) | `groups:write` | |
| New Message / Channel Message trigger | `channels:history` | Bot must be added to the channels to monitor |
| App Mention trigger | `app_mentions:read` | |
| Channel Created trigger | `channels:read` | |
| Member Joined Channel trigger | `channels:read` (public), `groups:read` (private), `mpim:read` (multi-party DM) | |
| Reaction Added / Reaction Removed trigger | `reactions:read` | |

{: .note }
**Set User Profile** requires a **User Token** (`xoxp-`) with `users.profile:write` — bot tokens are not supported. **Search Messages** requires a **User Token** with `search:read`. **Unarchive Conversation** requires an admin-level token with `admin.conversations:write`. These are different token types from the regular Bot User OAuth Token used for everything else below.

For any other action, if a call fails with `missing_scope`, add the scope Slack names in the error and reinstall the app.

## Step 4 — Install the app
At the top of **OAuth & Permissions**, click **Install to Workspace** and approve the requested scopes.

## Step 5 — Copy the Bot Token
On the same page, copy the **Bot User OAuth Token** — it starts with `xoxb-`.

## Step 6 (only if you use Slack triggers) — Event Subscriptions
Under **Features > Event Subscriptions**, turn on Events and set the **Request URL** to the webhook URL puq.ai shows you after you add the trigger step to a workflow and save it (Slack verifies this URL automatically). Under **Subscribe to Bot Events**, add the event matching your trigger (for example `message.channels` for the Channel Message trigger, `app_mention` for App Mention), then reinstall the app.

## Step 7 — Add the connection in puq.ai
1. Open **Connections** in the sidebar and click **New Connection**.
2. Search for and select **Slack**.
3. The dialog "Connect to Slack" opens and shows the Bot User OAuth Token instructions.
4. Fill in the **Connection Name** (prefilled, editable) and paste the Bot Token from Step 5 into the field labeled **Secret Text**.
5. Click **Save**.

## Fields

| Field (shown in dialog) | Required | What to enter |
|---|---|---|
| **Connection Name** | Yes | Name used to identify this connection in puq.ai |
| **Secret Text** | Yes | The Bot User OAuth Token (`xoxb-...`), or a User Token (`xoxp-...`) for actions that require one |

## Common Errors
- **"Bot token is required for Slack authentication."** — the token field was left empty.
- **`missing_scope`** — the token doesn't have the scope the action needs; add it under OAuth & Permissions and reinstall the app.
- **`invalid_auth`** — the token is incorrect or was revoked; copy it again from the app's OAuth & Permissions page.
- **`not_in_channel`** — the bot must be invited to (or join) the channel before it can post, update, or delete messages there.
- **`channel_not_found`** — the channel ID/name is wrong, or the bot can't see that channel.

## Using Slack as a Human in the Loop Channel
Select **Slack** as the Notification Channel on a **Request Approval** step and choose this connection. Recipients can be a channel (`#channel-name` or channel ID `C…`), a user ID (`U…`), or a user email (resolved to a Slack user). The bot must be able to post in the target channel, which means the `chat:write` scope must be granted and, for private channels, the bot must already be a member.

## Best Practices
- Create a dedicated Slack app for puq.ai rather than reusing one with unrelated scopes, so the scope list stays easy to audit.
- Grant only the scopes the actions and triggers you actually use require; add more later if you add actions.
- Prefer channel IDs over channel names in action inputs — they don't change if a channel is renamed.
