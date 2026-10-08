---
title: Building Agents
description: Create an agent and configure its model, memory, tools, and output parser on the agent canvas.
parent: Agents
nav_order: 1
---

# Building Agents

Agents are built visually on a canvas: a central **Agent** node connects to a **Model**, optionally a **Memory** source, any number of **Tools**, and an optional **Output Parser**. This page covers creating an agent and configuring every node.

---

## Creating an Agent

Click **New Agent** on the [Agents page](/agents/). This creates a new agent immediately — named `Untitled Agent` (or `Untitled Agent (2)`, `Untitled Agent (3)`, … if that name is already taken) — and opens it in the editor.

A new agent starts pre-wired with:
- A **Model** node set to OpenAI / gpt-4o (temperature `0.7`, max tokens `4096`) — no connection selected yet
- A **Short-term Memory** node

Add a connection to the model before running it — see [Running Agents](/agents/running-agents/).

---

## The Editor

The editor has three parts:

| Area | Contents |
|---|---|
| Header | Agent name, save status, **Save**, **Run**, and a button to hide/show the settings panel |
| Canvas | The node graph — the Agent node and everything connected to it |
| Settings panel | Configuration for whichever node is selected (or **Agent Configuration** when nothing is selected) |

The name field saves as soon as you click away or press Enter. The status pill next to it reads **Unsaved changes** or **All changes saved**.

- **Save** is enabled only while there are unsaved changes.
- **Run** switches the settings panel to [Run Agent](/agents/running-agents/) mode. If you have unsaved changes, it saves them first.

If you try to leave the editor with unsaved changes, a dialog asks you to **Save**, **Discard**, or **Cancel**.

On narrow windows (under about 1100px wide), the canvas and settings panel become two full-width views you switch between with **Canvas** / **Settings** buttons under the header.

---

## The Canvas

The **Agent** node sits in the center and can't be removed. It has four ports:
- **Model**, **Memory**, and **Parser** inputs on the left
- A **Tools** output on the right

Everything else — Model, Memory, Tool, and Output Parser nodes — connects into one of those ports.

### Adding nodes

Add nodes from the toolbar in the top-left of the canvas (**Tool**, **Model**, **Memory**, **Parser**), or right-click an empty area of the canvas for the same options, labeled **Add Tool**, **Add AI Model** / **Replace AI Model**, **Add Memory** / **Replace Memory**, and **Add Output Parser** / **Replace Output Parser** depending on what's already connected.

Right-click an existing node for node-specific actions:
- Model nodes: **Replace Model**
- Memory nodes: **Replace Memory**
- Any node except the Agent node: **Remove Node**

### Selecting and moving nodes

Click a node to open its settings in the right panel. Nodes are locked in place by default; click the lock icon in the canvas controls (bottom-left) to unlock them and drag them to new positions — layout otherwise rearranges automatically as you add or remove nodes. Pan by dragging empty canvas space, and zoom between 40% and 170% with your scroll wheel.

---

## Agent Configuration

Selecting the Agent node itself (or nothing) shows **Agent Configuration** — the agent's core instructions:

| Field | Required | Limit | Notes |
|---|---|---|---|
| Name | Yes | 255 characters | Shown in the header and on the agent's card |
| Description | No | 255 characters | Shown on the agent's card |
| System Prompt | Yes | 20,000 characters | Defines the agent's personality, capabilities, and constraints |

---

## Model

Every agent needs a model to think with — new agents start with one already connected. Add or swap it from the toolbar's **Model** / **Replace Model** button (the label and icon change once a model exists), which opens **Select AI Model**, a searchable grid of available providers and models. Providers that need an API key show an **API Key** badge.

Selecting the Model node opens **Model Configuration**:
- The selected provider and model are shown at the top. To switch models, right-click the node and choose **Replace Model** — there's no in-place model switch in the settings panel.
- **Authentication** — if the model requires a key, pick an existing [connection](/connections/add-connection/) or create one inline with the **+** button. A status badge next to the picker shows whether the connection is configured.
- **Model Properties** (collapsible) — fields defined by the model itself, commonly the specific model name, **Temperature** (`0`–`2` in steps of `0.1`), and a max tokens field. Some fields are dropdowns whose options load dynamically (for example, listing the models available on your connected account).

---

## Memory

Memory gives the agent context beyond the current message — new agents start with Short-term Memory already connected. Add or swap it from the toolbar's **Memory** / **Replace Memory** button, which opens **Select Memory** with two kinds of option:

- **Short Term Memory** — "Session-only memory using recent chat history." No further configuration. Tool results and step outputs from earlier in the same run are available to the agent's later planning steps. This is the default for new agents.
- Any long-term memory provider your instance has available, each shown with its own logo and name.

Only one memory source is connected at a time — adding a new one replaces the old.

Choosing a long-term provider opens **Memory Configuration**, which requires, before you can save:
- A [connection](/connections/add-connection/) for the provider (same picker as Model)
- Any input fields the provider defines (text, number, dropdown, or checkbox, depending on the provider)

---

## Tools

Tools let the agent act, not just answer. Add one from the toolbar's **Tool** button, which opens **Add Tool** — the same piece picker used when adding workflow steps, with search, category filters, and a grid/list view toggle. Add as many as you like; each appears as its own node wired into the Agent's Tools port.

Selecting a Tool node opens **Tool Configuration**, showing the tool's name, provider, and description. If it needs authentication, pick or create a [connection](/connections/add-connection/) the same way as for the Model; otherwise it reads "This tool does not require any additional configuration."

### Tools that aren't available to agents

A few pieces are workflow-only and don't appear in the Add Tool list, because they depend on mechanics (pausing, resuming, step navigation) that only apply inside a workflow run:

- [Code](/nodes/node-categories/core-nodes/code/)
- [Router](/nodes/node-categories/core-nodes/router/)
- [Go to Step](/nodes/node-categories/core-nodes/go-to-step/)
- [Delay Utilities](/nodes/node-categories/core-nodes/delay-utilities/) (Delay For and Delay Until)
- [Human in the Loop](/nodes/node-categories/core-nodes/human-in-the-loop/)'s Request Approval action
- [Respond to Webhook](/nodes/node-categories/core-nodes/respond-to-webhook/)
- Loop

---

## Output Parser

An Output Parser turns the agent's final answer into structured data instead of free text. It's optional, and at most one is connected at a time — adding a new one replaces the old. Add it from the toolbar's **Parser** button, which turns into a disabled **Parser Added** button once one exists; replace it instead from the node's right-click menu (**Replace Output Parser**).

Choose a **Parser Type**:

**Item List** — extracts a list from the response. Pick a **List Format**:

| Format | Example |
|---|---|
| Comma Separated | `apple, banana, cherry, date` |
| Numbered List | `1. Apple`<br>`2. Banana`<br>`3. Cherry` |
| Markdown List | `- Apple`<br>`- Banana`<br>`- Cherry` |

**Structured JSON** — parses the response as JSON, optionally validated against a **JSON Schema** you provide. Use **Load example** to start from one of four presets (Simple Object, Product Catalog, Contact Form, Task List). The editor shows **Schema configured** once the JSON is valid, or an error message if it isn't.

Both types accept optional **Format Instructions** — extra guidance appended to what the model is told about formatting (for example, "Return dates in ISO 8601 format").

Click **Disable Output Parser** to remove it.

---

## Best Practices

- Add a connection to the Model node before you try to run the agent — runs fail immediately without one if the model requires authentication.
- Keep the system prompt specific about what the agent should and shouldn't do; it's the main lever you have over its behavior.
- Only add the tools the task actually needs. Fewer tools means fewer wrong choices for the agent to make.
- Use an Output Parser when you need to use the agent's answer programmatically (for example, as input to a later workflow step) instead of parsing free text yourself.
