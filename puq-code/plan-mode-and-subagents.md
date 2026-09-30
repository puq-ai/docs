---
title: Plan Mode & Subagents
description: Plan changes before editing, and let puq code split work across subagents.
parent: puq code
nav_order: 9
---

# Plan Mode & Subagents

## Plan mode

In plan mode the agent explores your code and writes a plan **without changing anything**. You review the plan, and only after you approve it does the agent start implementing.

Use plan mode for larger changes, refactors, or when you want to agree on an approach first.

### Turning plan mode on

| How | Description |
|-----|-------------|
| `Alt+Shift+P` | Toggle plan mode |
| `Shift+Tab` | Cycle modes: Manual → Auto-edit → Plan → Yolo |
| `plan.defaultOnStartup: true` | Start every new interactive session in plan mode |

While plan mode is active, subagents can only read and search (`read`, `grep`, `glob`, `web_search`).

### Reviewing the plan

When the agent proposes a plan, a **Plan Review** screen opens. Read the plan, add notes to sections, and approve it or send it back with feedback. Reopen the latest plan with `/plan-review`.

### Planning model

Use a stronger model for planning and a faster one for implementation:

```yaml
# ~/.puq-code/agent/config.yml
modelRoles:
  plan: puq/claude-opus-4-6
  smol: puq/claude-haiku-4-5
```

Or per run: `puq --plan <model>`.

### Headless plan-then-build

`--plan-yolo` starts in plan mode, approves the plan automatically, then switches to a faster model to implement it:

```sh
puq --plan-yolo --plan-yolo-into @smol "Add pagination to the users API"
```

---

## Subagents

For larger tasks the agent can start **subagents**: separate agents that work on parts of the task in parallel (for example, exploring different folders or reviewing several files), then report back.

You don't need to do anything to use them; the agent decides when it helps. You can also ask directly:

> Use subagents to review every file in `src/api/` for missing error handling.

### Watching subagents

Press `Alt+A` (or `Ctrl+S`) to open the **Agent Hub**. It shows each running subagent's status, current activity, model, and usage. Select one to read its transcript or send it a message.

### Custom agents

Define your own agents as Markdown files:

| Location | Scope |
|----------|-------|
| `~/.puq-code/agent/agents/<name>.md` | You, in every project |
| `<project>/.puq-code/agents/<name>.md` | This project |

```markdown
---
name: reviewer
description: Review a change for correctness.
model: "@review"
tools: read, grep, glob
---

Review the assigned change and report concrete findings with file and line references.
```

| Field | Description |
|-------|-------------|
| `name` | Agent name (required) |
| `description` | When to use the agent (required) |
| `model` | Model or role, e.g. `@review` or `puq/openai/gpt-5.4` |
| `tools` | Allowed tools (default: all) |
| `thinking` | Thinking level |

Map the `@review` role to a model in `config.yml`:

```yaml
modelRoles:
  review: puq/openai/gpt-5.4:high
```

Then ask: *"Use the reviewer agent to check my latest changes."*

### Built-in agents

puq code ships with ready-made agents. Copy them into your config to read or customize them:

```sh
puq agents unpack             # to ~/.puq-code/agent/agents
puq agents unpack --project   # to ./.puq-code/agents
```

### Asking a specific model

Type `^` in the prompt to pick a model, for example:

> Have `^GPT-5.4` review this change.

The agent then starts a subagent with that model for the request.
