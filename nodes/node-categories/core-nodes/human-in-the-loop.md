---
title: Human in the Loop
description: Pause a workflow until a person approves or rejects a request sent by Email, Slack, Gmail, Telegram, or Discord.
parent: Core Nodes
nav_order: 6.5
---

# Human in the Loop

The **Human in the Loop** node adds a manual approval step to a workflow.
Its **Request Approval** action pauses the execution, notifies one or more reviewers, and continues only after someone approves or rejects the request — or after an optional timeout.

Use it when a person should check a step before the workflow continues:
- Review AI-generated content before it is published or sent
- Approve payments, refunds, or discounts above a threshold
- Confirm destructive or irreversible operations
- Escalate support cases to a human reviewer

---

## How It Works

1. The workflow reaches the **Request Approval** step.
2. puq.ai creates an approval request with a unique, private approval link.
3. A notification containing the title, body, and link is sent through the selected channel.
4. The execution is **Paused** and no further steps run.
5. A reviewer opens the link and clicks **Approve** or **Reject**.
6. The workflow resumes from the next step. The decision is available as the step output.

The workflow continues after **both** approval and rejection. To handle them differently, add a [Router](/nodes/node-categories/core-nodes/router/) after this step (see [Branching on the Decision](#branching-on-the-decision)).

---

## Notification Channels

| Channel | Connection | Recipients |
|---------|------------|------------|
| **Email (System)** | Not required — sent by puq.ai's email service | Email addresses |
| **Slack** | [Slack connection](/connections/slack/) | `#channel-name`, channel IDs (`C…`), user IDs (`U…`), or user emails |
| **Gmail** | [Gmail connection](/connections/gmail/) — sent from your Gmail account | Email addresses |
| **Telegram** | [Telegram bot connection](/connections/telegram/) | Numeric chat IDs (recommended) or `@usernames` |
| **Discord** | [Discord webhook connection](/connections/discord/) | None — posted to the webhook's channel |

Every channel except **Email (System)** requires a connection. If you have none, create one first in [Connections](/connections/add-connection/).

### Recipient rules

- Separate recipients with commas or new lines.
- Up to **10** unique recipients per step. Duplicates are removed.
- **Email** and **Gmail**: entries that are not valid email addresses are ignored.
- **Telegram**: entries that are not numeric chat IDs or `@usernames` are ignored. A user must start a conversation with your bot before the bot can message them.
- **Slack**: user emails are resolved to Slack users. The bot must be able to post in the target channel.
- If no valid recipient remains, the step fails with `No valid recipients found`.

---

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| **Notification Channel** | Yes | Email (System) | Email (System), Slack, Gmail, Telegram, or Discord |
| **Channel Connection** | For non-email channels | — | Connection used to send the notification |
| **Recipients** | Except Discord | — | Who receives the notification (field depends on the channel) |
| **Title** | Yes | `Approval Required` | Subject of the notification. Maximum **150** characters |
| **Body** | Yes | — | Message for reviewers. Maximum **3000** characters. Links and URLs become clickable |
| **Approve Button Label** | No | `Approve` | Text of the approve button on the approval page |
| **Reject Button Label** | No | `Reject` | Text of the reject button on the approval page |
| **Allow Content Editing** | No | Off | Lets the reviewer edit the body before deciding |
| **Enable Timeout** | No | Off | Decide automatically if nobody responds in time |
| **Timeout Value** | No | `24` | Number of units to wait. The effective minimum is **2 minutes** |
| **Timeout Unit** | No | Hours | Minutes, Hours, or Days |
| **Timeout Action** | No | Fail Workflow | Fail Workflow, Auto-Approve, or Auto-Reject |

Title and Body accept data mapped from previous steps, so the request can include values such as an order total or AI-generated text.

The timeout fields are used only when **Enable Timeout** is on.

---

## What Reviewers Receive

Each notification includes the title, the body, a button or link that opens the approval page, and the expiry time when a timeout is set.

| Channel | Format |
|---------|--------|
| Email / Gmail | Subject `Approval Required: <title>`, the body, and an **Open** button |
| Slack | "Approval Required" message with the title, body, and an **Open** button |
| Telegram | Title, body, and an **Open Approval** button |
| Discord | Embed titled `Approval Required: <title>` with an **Open Approval** link |

Reviewers make the decision on the approval page, not inside the chat or email client.

---

## The Approval Page

The link opens a public approval page on puq.ai. Reviewers **do not need a puq.ai account**.

The page shows:
- The request title and body
- A countdown when a timeout is set
- The approve and reject buttons with your custom labels
- An editable text area instead of the read-only body when **Allow Content Editing** is on

Behavior to know:
- **The first decision wins.** Later visitors see that the request was already approved or rejected.
- When the timeout passes, the page shows **Request Expired** and the buttons are disabled.
- Decisions made through the link are recorded with `decidedBy: "anonymous"`.

{: .warning }
Anyone who has the link can approve or reject the request. Send it only to the people who should decide, and avoid posting it in public channels.

---

## Output

When the workflow resumes, the step returns:

| Field | Type | Description |
|-------|------|-------------|
| `decision` | string | `approved` or `rejected` |
| `editedContent` | string \| null | Body submitted by the reviewer when editing is allowed (even if unchanged); otherwise `null` |
| `originalContent` | object | The original `title` and `body` |
| `decidedBy` | string | `anonymous` for decisions made through the link, `system:timeout` for automatic decisions |
| `decidedAt` | string | Decision time in ISO 8601 format |
| `isTimeout` | boolean | `true` when the decision was made automatically by the timeout |

Example:

```json
{
  "decision": "approved",
  "editedContent": "Hi Anna, your refund of $120 has been approved.",
  "originalContent": {
    "title": "Refund request #4821",
    "body": "Hi Anna, your refund of $120 has been processed."
  },
  "decidedBy": "anonymous",
  "decidedAt": "2026-10-08T09:41:12+00:00",
  "isTimeout": false
}
```

When editing is allowed, map `editedContent` into the following steps so they use the reviewer's version.

---

## Branching on the Decision

Add a **Router** directly after the approval step:

- **Branch 1** — `decision` equals `approved` → continue the main process
- **Otherwise** → handle the rejection (notify the requester, log the result, stop)

Check `isTimeout` when automatic decisions should be handled differently from human ones.

---

## Timeouts

Without a timeout, the execution waits until someone decides.

With **Enable Timeout** on, an unanswered request is decided automatically shortly after the deadline:

| Timeout Action | Result |
|----------------|--------|
| **Fail Workflow** (default) | The execution ends with status **Failed** |
| **Auto-Approve** | The workflow resumes with `decision: "approved"`, `isTimeout: true` |
| **Auto-Reject** | The workflow resumes with `decision: "rejected"`, `isTimeout: true` |

Automatic decisions use `decidedBy: "system:timeout"`.

---

## Pending Approvals

The **Approvals** page in the app sidebar lists every pending request from your workflows. A badge on the menu item shows how many requests are waiting.

Each row shows the title, workflow, assignees, creation time, and remaining time. Click a row to open its approval page in a new tab.

This page is also the fallback when a notification could not be delivered: the request still exists and can be decided from here.

---

## Executions

While waiting for a decision, the execution has the status **Paused** in [Execution History](/executions/execution-history/). It returns to running as soon as a decision is made, or fails if the timeout action is **Fail Workflow**.

---

## Errors and Limitations

The step fails before sending anything when:
- **Title** or **Body** is empty
- **Title** exceeds 150 characters or **Body** exceeds 3000 characters
- A connection is required but not selected
- No valid recipient is found, or more than 10 recipients are given

Other limitations:
- If the notification cannot be delivered (for example, an invalid bot token), the step does **not** fail. The request stays pending and can be opened from the **Approvals** page.
- **Continue on failure** and **Retry on failure** are not available for this step.
- Only the body can be edited by the reviewer; the title cannot.
- Request Approval cannot be used as an AI Agent tool. It works only inside workflows.

---

## Example: Review AI Content Before Publishing

1. **Trigger** — a new blog topic arrives
2. **AI node** — generates a draft
3. **Human in the Loop → Request Approval**
   - Channel: Slack, recipients: `#content-review`
   - Title: `New draft ready for review`
   - Body: the generated draft
   - Allow Content Editing: on
   - Timeout: 1 day, action: Auto-Reject
4. **Router**
   - `decision` equals `approved` → publish using `editedContent`
   - Otherwise → notify the author that the draft was rejected

---

## Best Practices

- Put everything the reviewer needs to decide in the body — they see only the title and body.
- Use clear button labels such as **Publish** / **Discard**.
- Always follow the step with a Router; rejection does not stop the workflow by itself.
- Set a timeout for time-sensitive processes, and choose **Auto-Reject** or **Fail Workflow** when doing nothing is safer than proceeding.
- Prefer numeric chat IDs for Telegram and channel IDs for Slack; they do not depend on name lookups.
