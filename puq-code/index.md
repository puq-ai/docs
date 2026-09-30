---
title: puq code
description: puq code is the terminal coding agent from puq.ai. Learn how to install, configure, and use it.
nav_order: 9
has_children: true
has_toc: true
---

# puq code

puq code (`puq`) is a terminal-based AI coding agent. It reads your repository, runs commands, edits files, and answers questions about your code from an interactive terminal UI (TUI) or from scripts in headless mode.

With puq code you can:

- Work interactively with an agent that can read, search, edit, and run code in your project
- Run one-off prompts non-interactively for scripts and CI (`puq -p "..."`)
- Use any model in the puq catalog (Anthropic, OpenAI, Google, and more) with a single puq API key
- Give the agent project knowledge through context files (`AGENTS.md`, `RULES.md`) and skills
- Connect external tools through MCP (Model Context Protocol) servers
- Resume, fork, export, and share sessions
- Plan changes before editing, and split large tasks across subagents
- Add your own slash commands, hooks, agents, and plugins
- Answer `/puq` comments in GitHub issues and pull requests, or work inside ACP-compatible editors

---

## Quick Start

```sh
# Check that puq is installed
puq --version

# Log in with your puq API key
puq login puq

# Start an interactive session in your project
cd path/to/your/project
puq

# Or run a single prompt and exit
puq -p "Summarize the changes in the last commit"
```

---

## Where puq code keeps its files

| Location | Purpose |
|----------|---------|
| `~/.puq-code/agent/config.yml` | Global settings |
| `~/.puq-code/agent/mcp.json` | User-level MCP servers |
| `~/.puq-code/agent/AGENTS.md` | User-level context file |
| `~/.puq-code/agent/keybindings.yml` | Keyboard shortcut remaps |
| `~/.puq-code/agent/sessions/` | Saved sessions |
| `<project>/.puq-code/` | Project-level settings, context files, skills, and MCP servers |
| `<project>/.puq-code/agents/`, `commands/`, `skills/` | Project-level custom agents, slash commands, and skills |
