---
title: Customization
description: Custom slash commands, system prompt changes, hooks, and plugins for puq code.
parent: puq code
nav_order: 10
last_modified_date: 2026-10-02
---

# Customization

## Custom slash commands

Save a prompt you use often as a Markdown file and run it as a slash command.

| Location | Scope |
|----------|-------|
| `<project>/.puq/commands/<name>.md` | This project |
| `~/.puq/agent/commands/<name>.md` | You, in every project |

The file name becomes the command name. Example `.puq/commands/review.md`:

```markdown
Review the changes in $1 for bugs, missing tests, and unclear naming.
Focus on: $ARGUMENTS
```

Run it:

```
/review src/api/users.ts "error handling"
```

| Placeholder | Replaced with |
|-------------|---------------|
| `$1`, `$2`, … | First, second, … argument |
| `$ARGUMENTS` or `$@` | All arguments |

Use quotes to keep spaces inside one argument. If the file uses no placeholder, the arguments are appended to the end.

When a `.puq/commands/` project command and user command have the same name, the project command wins. Commands from `.claude/commands/`, `.codex/commands/`, `.agent/commands/`, and `.agents/commands/` are also loaded; for `.claude/` and `.codex/` commands, the user command wins instead.

---

## Changing the system prompt

| File or flag | Effect |
|--------------|--------|
| `APPEND_SYSTEM.md` / `--append-system-prompt` | **Adds** your text to the default prompt (recommended) |
| `SYSTEM.md` / `--system-prompt` | **Replaces** the default instructions |

Put the files in `<project>/.puq/` or `~/.puq/agent/`. The project file wins.

{: .warning }
`SYSTEM.md` removes puq code's built-in instructions for tool use and workflow. Context files, skills, and rules are still included. To add a few instructions, prefer `APPEND_SYSTEM.md`.

For short rules that must always apply, use [`RULES.md`](/puq-code/context-files-and-skills/#rulesmd--rules-that-always-apply) instead.

---

## Hooks

Hooks run your own scripts when something happens — for example, before a tool runs or when a session starts. Use them to block risky commands, run a formatter after edits, or add context.

puq code runs **Claude Code–format command hooks**, so existing hooks keep working. Define them in `.claude/settings.json` or `.claude/settings.local.json` (project), or `~/.claude/settings.json` (user):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "./scripts/check-command.sh" }]
      }
    ]
  }
}
```

Supported events: `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `SessionStart`, `SessionEnd`, `Stop`, `PreCompact`.

The hook receives event details as JSON on stdin:

| Exit code | Result |
|-----------|--------|
| `0` | Continue |
| `2` | Block (stderr is shown as the reason) |
| Other | Warning only; continues |

{: .note }
Project hooks run only after you trust them. puq code asks once for each set of project hooks. In headless runs, set `hooks.trustProject: true` or trust the hooks in an interactive session first.

For advanced cases, puq code also loads TypeScript hooks from `.puq/hooks/pre/*.ts` and `.puq/hooks/post/*.ts` (project) or `~/.puq/agent/hooks/pre/*.ts` and `~/.puq/agent/hooks/post/*.ts` (user). Files placed directly in `hooks/` are ignored.

---

## Plugins and marketplaces

Plugins bundle skills, slash commands, agents, hooks, and MCP servers. puq code is compatible with Claude Code plugin marketplaces.

**Inside a session:**

```
/marketplace                                            # browse and install
/marketplace add anthropics/claude-plugins-official     # add a marketplace
/marketplace install code-review@claude-plugins-official
/plugins list
```

**From the terminal:**

```sh
puq plugin marketplace add anthropics/claude-plugins-official
puq plugin install code-review@claude-plugins-official
puq plugin install --scope project name@marketplace   # this project only
puq plugin list
puq plugin upgrade
puq plugin doctor --fix                                # diagnose problems
```

After installing, run `/reload-plugins` to load new skills, commands, and MCP servers. Restart the session for new tools, hooks, and extensions.

| Scope | Where it applies |
|-------|------------------|
| `user` (default) | All projects |
| `project` | Only the current project |

### Extensions

Extensions are TypeScript modules that add tools, commands, and UI. Load one for a single run:

```sh
puq -e ./my-extension.ts
```

Or place it under `.puq/extensions/` (project) or `~/.puq/agent/extensions/` (user). Use `/extensions` to see and toggle everything that was loaded.
