---
title: Agents
description: Build autonomous AI agents that plan their own steps and call tools to complete a task, and see how they differ from workflows.
nav_order: 4.2
has_children: true
has_toc: true
---

# Agents

An **Agent** is an AI that works toward a goal on its own instead of following a fixed sequence of steps. You give it a system prompt, a model, and optionally tools and memory. When you run it with a task, it plans its next action, calls a tool if it needs to, reads the result, and decides whether to continue or stop — repeating that loop until it has an answer or hits a limit.

## Agents vs. Workflows

| | Workflow | Agent |
|---|---|---|
| Steps | You design the exact sequence of nodes | The agent decides what to do next at each step |
| Best for | Processes where the steps are known in advance | Tasks where the right steps depend on what happens along the way |
| Started by | Webhooks, schedules, connected apps, manual runs | A task or question, from the agent editor or its run page |

A [Workflow](/workflows/) is deterministic — the same trigger always runs the same nodes in the same order. An agent is given a goal and works out the path itself, choosing from the tools you've allowed it to use.

{: .note }
Agents aren't limited to the Agents section — add an [Agent](/nodes/node-categories/core-nodes/agent/) step to a workflow to call one of your agents as part of a larger automation, with its prompt mapped from earlier step data.

---

## Opening Agents

Open **Agents** from the sidebar (`/agents`). The page lists every agent in your account as a grid of cards.

Each card shows:
- Name and description
- An **Active** status badge
- A colored badge naming the AI provider the agent's model uses (OpenAI, Claude, Gemini, …)
- When the agent last ran — `Just now`, `12m ago`, `3h ago`, `5d ago`, a full date once it's more than a week old, or `Never run`
- **Edit** and **Delete** icons, shown on hover

Click a card, or its edit icon, to open it in the [agent editor](/agents/building-agents/).

### Header: stats, new agent, sorting

Above the grid:
- **Total** — how many agents you have
- **Active** — how many of them are active
- **New Agent** — creates a blank agent and opens it in the editor immediately
- A sort dropdown: **Newest** (default), **Oldest**, **Name A-Z**, **Name Z-A**, **Most Runs**

### Pagination

Choose **8**, **16** (default), **32**, or **64** agents per page. The footer shows the current range, for example "Showing 1-16 of 42 agents", with page number navigation.

### Deleting an agent

The trash icon opens a confirmation dialog — **Delete Agent**: "This action cannot be undone. Are you sure? All agent data, runs, and configurations will be permanently removed." Confirm with **Delete** to permanently remove the agent, its runs, and its configuration.

---

## Next Steps

- **[Building Agents](/agents/building-agents/)** — create an agent and configure its model, memory, tools, and output parser on the canvas.
- **[Running Agents](/agents/running-agents/)** — start a run, read the live run monitor, respond to approval or input requests, and cancel a run.
