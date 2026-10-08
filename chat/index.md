---
title: puq Chat
description: Talk to the puq.ai Assistant to build, edit, and run workflows, browse your conversation history, and track your daily usage.
nav_order: 4.6
---

# puq Chat

{: .note }
puq Chat is in **Alpha**. Behavior and limits described here may change.

**puq Chat** is the **puq.ai Assistant** — a chat interface that can read, create, and edit your workflows, look up available pieces and connections, and run steps or whole workflows on your behalf, all from a conversation.

---

## Opening Chat

You can use the assistant in two places:

- **Chat page** — click **Chat** in the sidebar to open it full-page at `/chat`.
- **Workflow builder drawer** — while editing a workflow, click the round teal chat button in the bottom-right corner of the canvas (**Open puq.ai Chat**). The assistant opens as a side panel next to the canvas so you can keep watching the workflow while you talk. Closing the drawer (the **X** in its header) returns it to page mode.

When the assistant is opened from inside a workflow, it works on **that** workflow's draft; messages sent from the drawer are tied to the open workflow.

---

## Starting and Managing Conversations

Each conversation is a separate **thread**.

- **New Chat** — the plus/message icon in the header, or **Start New Chat** at the top of the history panel, clears the view and starts a new thread the moment you send your first message.
- **Chat History** — the clock icon opens a list of your threads, grouped into **Today**, **Yesterday**, **Previous 7 Days**, **Previous 30 Days**, and **Older**, newest first. The list is paginated; use the arrows at the bottom to move between pages.
- **Thread titles** are generated automatically from your first message when a thread is created — there is no manual rename.
- **Delete a conversation** — hover a thread in the history list and click the trash icon, then confirm in the **Delete Conversation** dialog. Deletion cannot be undone.
- **Reasoning toggle** — the eye icon in the header shows or hides the assistant's intermediate "thinking" steps in the current view.
- **Usage** — the gauge icon opens a dialog showing your daily output token usage (see [Limits](#limits) below).

---

## What the Assistant Can Do

Inside a conversation, the assistant can:

- **Read and discuss your workflows** — list your workflows, open one, and read its current steps, trigger, and connections.
- **Build and edit workflows** — create a new draft workflow, set the trigger, and append, replace, or remove steps (including code, branch, and loop steps) based on what you ask for.
- **Look up building blocks** — list available pieces (integrations) and read details about a specific piece before using it.
- **Run things for you** — execute a single step or the whole workflow, and report back what happened.
- **Publish** — publish the workflow once it's ready.
- **Request a connection** — if a step needs a connection you don't have yet, the assistant pauses and asks you to pick or create one (see [Connection Requests](#connection-requests) below) instead of guessing or failing silently.

When the assistant creates or changes a workflow, the change is saved to the workflow's draft automatically, and if you're chatting from the full-page view about a specific workflow, opening it jumps you straight into the builder with that draft loaded.

---

## Reading a Response

While the assistant is working, the conversation shows:

- Your messages and the assistant's replies.
- **Thinking steps** — a collapsible trace of its reasoning, shown only when the reasoning toggle is on.
- **Tool activity cards** — one card per action the assistant takes (for example, reading a workflow, creating a step, or running it), each showing its inputs, result, and — for workflow edits — a diff of what changed.
- A **Stop** button (replacing **Send**) while a reply is streaming, to cancel generation.

### Connection Requests

When a step needs a connection you haven't set up, an **Input required** card appears in the conversation with an **Approval required** badge, asking you to choose or confirm a connection. The request **expires after 15 minutes** — after that it can no longer be resumed, and you'll need to ask again. You can also **cancel** the request from the same card.

---

## Limits

{: .warning }
puq Chat enforces a **daily output token** allowance per account. There is currently no way to select a different model for chat — every conversation uses the platform's single configured assistant model.

- Your usage is tracked against a **daily output token limit** that resets at midnight. Check the **Usage Status** dialog (gauge icon) for your current used/remaining tokens and reset time.
- A warning banner appears above the message box once you've used **80%** of your daily allowance.
- When the daily limit is reached, sending a new message or resuming a paused request returns a `CHAT_CREDIT_LIMIT` error and is blocked until the allowance resets.
- **One active run per thread** — a thread can only process one message at a time. Sending another message while the assistant is still replying, or while a connection request is pending, is rejected until the current run finishes.
- Threads and messages are scoped to your account; you cannot see another user's conversations.

---

## Best Practices

- Open the chat drawer from inside a workflow when you want the assistant to edit *that* workflow specifically.
- Resolve or cancel a pending connection request promptly — it expires after 15 minutes.
- Turn on the reasoning toggle when you want to understand *why* the assistant made a change, and off to keep the conversation compact.
- Watch the usage gauge during heavy chat sessions so you're not interrupted mid-task by the daily limit.
