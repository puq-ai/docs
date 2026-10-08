---
title: Running Agents
description: Run an agent, read the live run monitor, respond to approval or input requests, and cancel a run.
parent: Agents
nav_order: 2
---

# Running Agents

Once an agent has a model — and any tools or memory it needs — you can run it with a task and watch it work in real time.

---

## Starting a Run

In the [agent editor](/agents/building-agents/), click **Run** in the header. If you have unsaved changes, they're saved first; the right panel then switches to **Run Agent**.

Type a task or question — for example *"Get the weather in Istanbul and summarize in 3 bullets."* — then press **Ctrl+Enter** (**Cmd+Enter** on Mac) or click **Run Agent**.

A full-page version of the same screen is also available by appending `/run` to the agent's editor URL (`/agents/<agent-id>/run`). It shows the agent's name, model, and status in a header, with the same prompt box ("What can I help you with?") above the run monitor.

---

## The Run Monitor

The run monitor shows a running transcript:

- Your message, under **You**
- The agent's response, under **Agent**, with a badge showing the model it used (`Provider / model`, for example `OpenAI / gpt-4o`)

While the agent is working, a thinking indicator shows the current phase: *Initializing...*, *Planning next action...*, *Executing action...*, *Analyzing results...*, *Deciding next step...*, or *Working...*.

### Tool calls

Each tool the agent calls appears as a card with its action name, the piece it belongs to, and — when recognized — a short summary of the key argument (such as a location, channel, search query, or message). A status icon shows whether the call is still running, succeeded, or failed. Click a card to expand its **Parameters**, **Result**, and, on failure, **Error**.

### Final answer and output

- The agent's final answer renders as Markdown.
- If the agent has an [Output Parser](/agents/building-agents/#output-parser), the parsed result appears below it as formatted JSON with a **Copy** button.
- If the run fails, the error message appears in its own block.
- Once the run finishes (completed or failed), a footer shows the step count, tool call count, and total duration.

A connection indicator near the input shows whether the live stream is connected.

---

## Run Status

| Status | Shown as | Meaning |
|---|---|---|
| `pending` | No badge yet | Run created, not yet started |
| `running` | **Running** | The agent is actively working |
| `waiting_approval` | **Waiting for approval** | The run is paused for an approval decision |
| `waiting_input` | **Waiting for input** | The run is paused for more information from you |
| `completed` | **Completed** | The agent finished and returned a final answer |
| `failed` | **Failed** | The run stopped because of an error or an exceeded limit |
| `cancelled` | **Cancelled** | You stopped the run |

---

## Approval and Input Requests

If a run is **Waiting for approval**, an **Approval Required** dialog opens over the monitor, showing a risk badge (**Low**, **Medium**, or **High**), the proposed action's description, the tool name, and its details as JSON.

- **Approve** — optionally add a note in **Response (Optional)** first.
- **Reject** — switches the dialog to a required **Reason for Rejection** field; confirm with **Confirm Rejection**.

If a run is **Waiting for input**, an **Input Required** dialog shows the agent's question under **Agent's Question**, with a **Your Response** box to type your answer (**Ctrl+Enter** submits) and a **Submit** button.

The run resumes automatically once you respond.

---

## Cancelling a Run

While a run is active, click **Stop** in the header to cancel it — you'll see a confirmation: "Agent run has been cancelled." **Stop** is only shown while the run is active; it's replaced once the run finishes.

---

## Starting Over

Once a run ends, **New Chat** (full-page view) or **Reset** (editor run panel) clears the transcript so you can send a new task to the same agent.

---

## Limits and Credits

Every run has built-in limits that aren't configurable from the editor: **50 steps**, **100 tool calls**, and a **5-minute** total time budget. A run that hits any of these stops automatically and fails with a budget-exceeded error.

{: .note }
Each planning step calls the agent's selected AI model using your puq.ai balance, the same as other AI features on the platform. If your balance runs out mid-run, the run fails. See [Billing](/account/billing/).

---

## Best Practices

- Keep tasks specific — the clearer the instruction, the fewer planning steps the agent needs.
- Watch the tool call cards during a run to catch a wrong tool choice early; cancel and adjust the system prompt or tools if it's heading the wrong way.
- If a run keeps hitting the step or tool-call limit, the task is probably too broad for a single run — split it into smaller agents or steps.
