---
title: Troubleshooting
description: Solutions for common puq code problems.
parent: puq code
nav_order: 12
last_modified_date: 2026-10-02
---

# Troubleshooting

## General checks

```sh
puq --version            # installed version
puq update               # update from the selected release channel
puq setup --check        # check optional dependencies
puq config list          # effective settings
puq models               # models you can use right now
```

Inside a session, `/restart` restarts puq code and continues the current session.

---

## The agent made unwanted changes

Run `/undo` to restore your files to how they were before your last message (`/redo` re-applies them). See [Undoing changes](/puq-code/working-in-a-session/#undoing-changes).

To make file changes and command execution ask for approval by default, use `puq --approval-mode always-ask`, or press `Shift+Tab` to select it. Explicit tool and user policies can change these defaults; see [tool approval](/puq-code/configuration/#tool-approval).

## The agent forgets earlier instructions

Long sessions are compacted automatically, so early details can be summarized away. Put lasting rules in `RULES.md`, start unrelated tasks with `/new`, or run `/compact <what to keep>` yourself.

---

## Models and login

**"No credentials" / a model is missing from the list**
- Run `puq login puq` or `/login puq`. In scripts and CI, pass the key with `--api-key` together with `--model`.
- Use a puq key for `puq/` models, or `ANTHROPIC_API_KEY` for direct `anthropic/` models. Other direct provider keys, such as `OPENAI_API_KEY`, are outside the standard provider policy. Setting `PUQ_API_KEY` alone is not enough — pass it with `--api-key` or reference it in provider configuration.
- Claude Pro/Max subscription OAuth login is disabled in standard release builds. See [Models & Providers]({% link puq-code/models-and-providers.md %}) for supported credentials.
- Refresh the model list: `puq models refresh`.

**The wrong API key is used**
A key passed with `--api-key` takes precedence, followed by `providers.puq.apiKey` in `models.yml`, then the key saved with `/login puq`. To replace the saved key, run `/logout` and then `/login puq` again. See [credential order]({% link puq-code/models-and-providers.md %}#puq-credential-order).

---

## Context files and skills

**`AGENTS.md` is not loaded**
- Only one `.puq/AGENTS.md` is read: the one in the nearest non-empty `.puq/` folder.
- `.claude/CLAUDE.md` and `.gemini/GEMINI.md` are only read from the folder where you started puq.
- Check `enabledProviders` for user-level foreign sources, `disabledProviders`, and `disabledExtensions`. `/extensions` lists every discovered file and whether it is active.

**Changes to `RULES.md` have no effect**
`RULES.md` is reloaded on `/new` or `/clear`.

**A skill is not found**
Skills must be at `skills/<name>/SKILL.md` (exactly one folder deep). Skills in `.puq/skills/` also need a `description`.

---

## MCP servers

**A server doesn't connect**
Run `/mcp test <name>`. Check that the command or Docker image exists, required environment variables are set, and the URL and token are valid.

**"stdio server requires command"**
Check for an explicit `"type": "stdio"` without `command`, or a configuration with neither `command` nor `url`. For a remote server, use `"type": "http"` and `url` explicitly for editor validation; runtime also infers HTTP from `url` when no `command` is present.

**A server from Claude/Cursor/VS Code is missing**
Run `/mcp list`. Check `enabledProviders` for user-level foreign sources, `disabledProviders`, `disabledServers` in `~/.puq/agent/mcp.json`, and `mcp.enableProjectConfig`.

---

## Terminal and input

**puq code starts in a temporary folder**
Starting in your home folder (`~`) switches to a temporary folder. Start inside a project, or use `--allow-home`.

**Image paste doesn't work on Windows Terminal**
Use `Alt+V` instead of `Ctrl+V`.

**`Ctrl+Enter` doesn't queue a follow-up**
Some terminals capture it. Use `Ctrl+Q`.

**The display is garbled**
Press `Alt+L` to reset the display.

**I cleared my prompt by accident**
Press `Up` right after `Ctrl+C` to get it back.

---

## Plugins and hooks

**A plugin doesn't work after installing**
Run `/reload-plugins`, or restart the session for new tools and hooks. Diagnose with `puq plugin doctor --fix`.

**Project hooks don't run**
Project hooks need to be trusted once in an interactive session. For headless runs, set `hooks.trustProject: true`.

**A TypeScript hook is ignored**
It must be in `hooks/pre/` or `hooks/post/` under `.puq/` (project) or `~/.puq/agent/` (user), not directly in `hooks/`.
