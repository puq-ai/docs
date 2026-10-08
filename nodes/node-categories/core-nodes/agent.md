---
title: Agent
description: Run one of your agents as a single workflow step, with its prompt mapped from earlier step data and its final answer available to later steps.
parent: Core Nodes
nav_order: 0.5
---

# Agent

The **Agent** step runs one of your [Agents](/agents/) from inside a workflow. Give it a prompt — built from static text, data from earlier steps, or both — and the workflow waits for the agent to plan, call its tools, and produce a final answer before continuing.

Use it when part of a workflow needs an AI to reason over several steps and decide which tools to use, rather than a single fixed AI call.

---

## How It Works

1. Add an **Agent** step and pick one of your agents from **Select Agent**.
2. Enter a **Prompt** — the task or question to give the agent.
3. When the workflow reaches this step, it runs the agent exactly as if you had clicked **Run** in the [agent editor](/agents/building-agents/), using your prompt as the input.
4. The step runs synchronously — the workflow waits while the agent works through its own plan → act → observe → decide loop.
5. Once the agent finishes, its final answer and usage numbers become this step's output for later steps to use.

Only **active** agents can be selected, and the step uses the agent's own model, tools, memory, and output parser exactly as configured in the [agent editor](/agents/building-agents/) — there's nothing to reconfigure on the step itself beyond the prompt.

---

## Settings

| Setting | Required | Description |
|---|---|---|
| **Select Agent** | Yes | Which of your active agents to run. The gear icon (**Configure Agent**) opens that agent in its own editor — to change its model, tools, memory, or system prompt — without leaving the workflow. The **+** icon (**Create New Agent**) creates a new agent on the spot and selects it automatically. |
| **Prompt** | Yes | The task or question to send to the agent. A long-text field — type plain text and map in data from earlier steps the same way as any other field; see [Parameter Mapping](/data/parameter-mapping/). |

If you have no agents yet, **Select Agent** shows "No agents yet. Click **+** to create one."

---

## Output

When the agent completes successfully, the step returns:

| Field | Type | Description |
|---|---|---|
| `agent_uid` | string | UID of the agent that ran |
| `agent_name` | string | The agent's name at the time it ran |
| `run_uid` | string | UID of the agent run |
| `output` | string | The agent's final answer |
| `tokens_used` | number | Total tokens the run used |
| `steps_completed` | number | Number of planning/acting steps the agent completed |
| `tool_calls` | number | Number of tool calls the agent made |

{: .note }
This is the agent's final answer text only. If the agent has an [Output Parser](/agents/building-agents/#output-parser) configured, its structured result isn't included in the step output — only `output`.

---

## Errors and Limitations

The step fails before running the agent when:
- No agent is selected, or **Prompt** is empty
- The selected agent no longer exists or belongs to a different account
- The selected agent isn't active

The step fails after running the agent when:
- The agent's run fails or is cancelled — the step's error message is the agent's own error (for example, an exceeded step, tool-call, or time limit, or a model call that failed because of insufficient puq.ai balance — see [Billing](/account/billing/))
- The agent pauses to ask for approval or more input — interactive approval and input requests aren't supported inside a workflow step, so the step fails instead of pausing the workflow

Other limitations:
- The step runs synchronously, so it can take as long as the agent's own run — up to its [step, tool-call, and time limits](/agents/running-agents/#limits-and-credits).
- **Continue on failure** and **Retry on failure** are not available for this step.

---

## Best Practices

- Build and test the agent on its own in [Agents](/agents/) first — it's easier to iterate on its model, tools, and system prompt there than inside a workflow run.
- Keep the mapped **Prompt** specific; vague prompts lead to longer agent runs and less predictable output.
- Add a step after this one to branch on failure (for example with a [Router](/nodes/node-categories/core-nodes/router/)) if the agent not completing shouldn't stop the rest of the workflow.
