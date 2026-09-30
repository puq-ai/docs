---
title: Troubleshooting
description: Solutions for common puq code problems.
parent: puq code
nav_order: 12
---

# Troubleshooting

## General checks

```sh
puq --version            # installed version
puq update               # install the latest release (Homebrew/WinGet: prints the upgrade command)
puq setup --check        # check optional dependencies
puq config list          # effective settings
puq models               # models you can use right now
```

Inside a session, `/restart` restarts puq code and continues the current session.

---

## The agent made unwanted changes

Run `/undo` to restore your files to how they were before your last message (`/redo` re-applies them). See [Undoing changes](/puq-code/working-in-a-session/#undoing-changes).

To stop the agent from changing files without asking, switch to a stricter [approval mode](/puq-code/configuration/#tool-approval), e.g. `puq --approval-mode write`, or press `Shift+Tab`.

## The agent forgets earlier instructions

Long sessions are compacted automatically, so early details can be summarized away. Put lasting rules in `RULES.md`, start unrelated tasks with `/new`, or run `/compact <what to keep>` yourself.

---

## Models and login

**"No credentials" / a model is missing from the list**
- Run `puq login puq` or `/login puq`. In scripts and CI, pass the key with `--api-key` together with `--model`.
- puq code works only with a puq API key; keys from other providers (for example `OPENAI_API_KEY`) are not supported. Setting `PUQ_API_KEY` alone is not enough — it must be passed with `--api-key`.
- Refresh the model list: `puq models refresh`.

**The wrong API key is used**
A key passed with `--api-key` overrides the one saved with `/login puq`. To replace the saved key, run `/logout` and then `/login puq` again.

---

## Context files and skills

**`AGENTS.md` is not loaded**
- Only one `.puq-code/AGENTS.md` is read: the one in the nearest non-empty `.puq-code/` folder.
- `.claude/CLAUDE.md` and `.gemini/GEMINI.md` are only read from the folder where you started puq.
- Check `disabledProviders` and `disabledExtensions`. `/extensions` lists every discovered file and whether it is active.

**Changes to `RULES.md` have no effect**
`RULES.md` is reloaded on `/new` or `/clear`.

**A skill is not found**
Skills must be at `skills/<name>/SKILL.md` (exactly one folder deep). Skills in `.puq-code/skills/` also need a `description`.

---

## MCP servers

**A server doesn't connect**
Run `/mcp test <name>`. Check that the command or Docker image exists, required environment variables are set, and the URL and token are valid.

**"stdio server requires command"**
You forgot `"type": "http"` on a remote server.

**A server from Claude/Cursor/VS Code is missing**
Run `/mcp list`. Check `disabledServers` in `~/.puq-code/agent/mcp.json` and the `mcp.enableProjectConfig` setting.

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
It must be in `hooks/pre/` or `hooks/post/` under `.puq-code/` (project) or `~/.puq-code/agent/` (user), not directly in `hooks/`.
