---
title: Configuration
description: Configure puq code settings, profiles, and tool approval.
parent: puq code
nav_order: 4
last_modified_date: 2026-10-02
---

# Configuration

puq code settings are stored in YAML files. You can edit them directly, use the `/settings` panel inside a session, or use the `puq config` command.

---

## Settings files

| File | Scope |
|------|-------|
| `~/.puq/agent/config.yml` | Global (all projects) |
| `<project>/.puq/config.yml` | Project only |
| `--config <file>` | Extra file for a single run |

These paths show the default layout. Profiles, directory overrides, and Linux XDG settings can redirect configuration, credential, and session storage. `puq config path` prints the active agent configuration directory.

### Migration from `.puq-code`

Current releases use `.puq` for user and project configuration. On startup, the default global `~/.puq-code` directory is moved to `~/.puq` when the destination has no data. Legacy XDG roots named `puq-code` are also migrated where configured. Existing populated destinations are left separate instead of being merged or overwritten.

Project-local `.puq-code` folders are not automatically renamed. Review and move their configuration into `<project>/.puq` yourself, preserving any settings already there. Run `puq config path` to inspect the active agent configuration directory, especially when using profiles or directory overrides.

### Precedence

When the same setting is defined in several places, the highest one wins:

1. Environment override declared for the setting (fallback-only variables yield to configured values)
2. Runtime flags (e.g. `--approval-mode`)
3. `--config` files (later files win)
4. Project `.puq/config.yml`
5. Global `~/.puq/agent/config.yml`
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
puq config path                          # show the active agent configuration directory
```

Add `--json` for machine-readable output.

---

## Tool approval

puq code classifies each tool call into a tier:

- **read**: reads data (e.g. reading or searching files)
- **write**: changes files but does not run arbitrary code
- **exec**: runs commands or code, drives a browser, starts subagents

The approval mode supplies the default for calls without a tool-specific or user policy:

| Mode | Runs automatically | Asks first |
|------|--------------------|------------|
| `always-ask` | read | write, exec |
| `write` | read, write | exec |
| `auto` | read, write | exec (a safety check may approve it) |
| `yolo` (default) | all tiers when the resolved policy allows the call | calls whose resolved policy is `prompt` |

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

Set user policies for individual tools with `allow`, `deny`, or `prompt`:

```yaml
tools:
  approvalMode: write
  approval:
    bash: prompt
    read: allow
    mcp__filesystem_delete: deny
```

`deny` from either a tool or user settings blocks the call. Otherwise, a tool's explicit policy takes precedence over a user `allow` or `prompt` setting. Calls without an explicit tool policy use the user setting, then the mode default. Outside `yolo`, a tool can also require an approval check regardless of the user setting.

{: .warning }
In `yolo` mode (the default), shell commands and other calls run automatically unless the resolved policy requires a prompt or denies them. A user `prompt` setting can be overridden by an explicit tool `allow`; user `deny` still blocks the call. Recognized dangerous shell commands prompt in other modes, but that built-in check is skipped in `yolo`. Approval decides whether a call may run; it does not sandbox the command or reduce your user permissions.

---

## Profiles

Profiles keep separate credentials, sessions, settings, and caches — useful for separating work and personal accounts.

```sh
puq --profile work                          # use the "work" profile
puq --profile work --alias puq-work         # create a shell shortcut
```

A profile stores its files in `~/.puq/profiles/<name>/agent/` instead of `~/.puq/agent/`. Project-level files (`<project>/.puq/`) apply to every profile.

---

## Keybindings

Remap shortcuts in `~/.puq/agent/keybindings.yml`:

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

The agent can search the web. The default priority starts with `web/puq` when puq credentials are available, so search can use your puq balance. Other configured backends and free search engines are fallback options; the default is not a guarantee of free searches.

You can add a key for a separate search provider:

| Provider | Environment variable |
|----------|----------------------|
| Exa | `EXA_API_KEY` |
| Brave | `BRAVE_API_KEY` |
| Tavily | `TAVILY_API_KEY` |
| Perplexity | `PERPLEXITY_API_KEY` |
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

puq code detects secrets from environment variables (names containing `KEY`, `TOKEN`, `SECRET`, `PASSWORD`, …), common token formats (GitHub, OpenAI, AWS, JWT, private keys, …), and passwords in connection URLs. Add your own values in `~/.puq/agent/secrets.yml` or `<project>/.puq/secrets.yml`.

### Memory

With memory enabled, puq code remembers lessons and decisions from earlier sessions in the same project and adds them to new sessions.

```yaml
memory:
  backend: local
```

Memory is off by default. Manage it with `/memory` (`view`, `sync`, `clear`).
