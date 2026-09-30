---
title: Configuration
description: Configure puq code settings, profiles, and tool approval.
parent: puq code
nav_order: 4
---

# Configuration

puq code settings are stored in YAML files. You can edit them directly, use the `/settings` panel inside a session, or use the `puq config` command.

---

## Settings files

| File | Scope |
|------|-------|
| `~/.puq-code/agent/config.yml` | Global (all projects) |
| `<project>/.puq-code/config.yml` | Project only |
| `--config <file>` | Extra file for a single run |

### Precedence

When the same setting is defined in several places, the highest one wins:

1. Environment variable for the setting
2. Runtime flags (e.g. `--approval-mode`)
3. `--config` files (later files win)
4. Project `.puq-code/config.yml`
5. Global `~/.puq-code/agent/config.yml`
6. Built-in default

{: .note }
Lists (arrays) are replaced, not merged. A project list completely replaces the global list for that setting.

---

## `puq config` command

```sh
puq config list                          # show all settings
puq config get disabledProviders         # show one setting's effective value
puq config set tools.approvalMode write  # change a global setting
puq config reset tools.approvalMode      # return to the default
puq config path                          # show where config files live
```

Add `--json` for machine-readable output.

---

## Tool approval

puq code classifies each tool call into a tier:

- **read**: reads data (e.g. reading or searching files)
- **write**: changes files but does not run arbitrary code
- **exec**: runs commands or code, drives a browser, starts subagents

The approval mode decides which tiers run automatically:

| Mode | Runs automatically | Asks first |
|------|--------------------|------------|
| `always-ask` | read | write, exec |
| `write` | read, write | exec |
| `auto` | read, write | exec (a safety check may approve it) |
| `yolo` (default) | everything | nothing |

Set the mode in `config.yml`:

```yaml
tools:
  approvalMode: write
```

Or per run:

```sh
puq --approval-mode always-ask
puq --auto-approve     # same as yolo
```

Inside a session, press `Shift+Tab` to cycle between modes.

### Per-tool rules

Override individual tools regardless of mode with `allow`, `deny`, or `prompt`:

```yaml
tools:
  approvalMode: write
  approval:
    bash: prompt
    read: allow
    mcp__filesystem_delete: deny
```

{: .warning }
In `yolo` mode (the default) every tool call runs without asking, including shell commands. In the other modes, dangerous commands (such as `rm -rf /`) always ask first. Approval only controls prompting: an approved command runs with your normal user permissions.

---

## Profiles

Profiles keep separate credentials, sessions, settings, and caches — useful for separating work and personal accounts.

```sh
puq --profile work                          # use the "work" profile
puq --profile work --alias puq-work         # create a shell shortcut
```

A profile stores its files in `~/.puq-code/profiles/<name>/agent/` instead of `~/.puq-code/agent/`. Project-level files (`<project>/.puq-code/`) apply to every profile.

---

## Keybindings

Remap shortcuts in `~/.puq-code/agent/keybindings.yml`:

```yaml
app.model.cycleForward: Ctrl+P
app.plan.toggle: Alt+Shift+P
app.history.search: []     # disable an action
```

Run `/hotkeys` in a session to see all active shortcuts. See [Sessions & Shortcuts](/puq-code/sessions-and-shortcuts/#keyboard-shortcuts) for the common ones.

### Vim mode

Enable Vim-style editing in the prompt:

```yaml
tui.vimMode: true
```

Or turn on **Vim Editing Mode** in `/settings` → Interaction → Input.

---

## Optional features

### Web search

The agent can search the web. Without any setup it uses free search engines. For better results, add a key for a search provider:

| Provider | Environment variable |
|----------|----------------------|
| Exa | `EXA_API_KEY` |
| Brave | `BRAVE_API_KEY` |
| Tavily | `TAVILY_API_KEY` |
| Perplexity | `PERPLEXITY_API_KEY` (or `/login perplexity`) |
| Firecrawl | `FIRECRAWL_API_KEY` |

To force one provider, set the `web` model role:

```yaml
modelRoles:
  web: web/exa
```

Turn web search off with `web_search.enabled: false`.

### Hiding secrets from the model

When enabled, API keys, tokens, and passwords are replaced with placeholders before anything is sent to the model provider. Values are restored locally when the agent uses them in a tool call.

```yaml
secrets:
  enabled: true
```

puq code detects secrets from environment variables (names containing `KEY`, `TOKEN`, `SECRET`, `PASSWORD`, …), common token formats (GitHub, OpenAI, AWS, JWT, private keys, …), and passwords in connection URLs. Add your own values in `~/.puq-code/agent/secrets.yml` or `<project>/.puq-code/secrets.yml`.

### Memory

With memory enabled, puq code remembers lessons and decisions from earlier sessions in the same project and adds them to new sessions.

```yaml
memory:
  backend: local
```

Memory is off by default. Manage it with `/memory` (`view`, `sync`, `clear`).
