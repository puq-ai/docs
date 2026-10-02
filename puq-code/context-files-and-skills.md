---
title: Context Files & Skills
description: Give puq code project knowledge with AGENTS.md, RULES.md, and skills.
parent: puq code
nav_order: 5
last_modified_date: 2026-10-02
---

# Context Files & Skills

puq code can learn about your project and your preferences from Markdown files. These are loaded automatically when a session starts — you don't need to ask the agent to read them.

---

## `AGENTS.md` — project context

Use `AGENTS.md` for repository background: architecture, code style, build and test commands, and review expectations.

| File | Scope |
|------|-------|
| `~/.puq/agent/AGENTS.md` | You, in every project |
| `<project>/.puq/AGENTS.md` | This project |
| `<project>/AGENTS.md` | This project (also read by other tools) |

Example:

```markdown
# Project notes

- Build with `bun run build`, test with `bun test`.
- API handlers live in `src/api/`; keep them thin.
- Never edit files under `generated/`.
```

### Files from other tools

puq code can also read context files from other AI tools:

- `CLAUDE.md`, `.claude/CLAUDE.md`
- `.gemini/GEMINI.md`
- `.github/copilot-instructions.md`
- `~/.codex/AGENTS.md`, `.agents/AGENTS.md`
- Cursor, Windsurf, and Cline rule files

Project sources are discovered by default unless disabled. User-level sources for Claude Code, Claude plugins, Codex, Gemini CLI, Cursor, Windsurf, OpenCode, and GitHub require opt-in through `enabledProviders`. For example, to load user-level Claude Code and Codex files such as `~/.codex/AGENTS.md`:

```yaml
# ~/.puq/agent/config.yml
enabledProviders:
  - claude
  - codex
```

Native `.puq` and `.agent`/`.agents` sources remain enabled by default. `disabledProviders` takes precedence over opt-in. Explicit legacy capability settings or `CLAUDE_CONFIG_DIR` can also enable the applicable user source.

When several files apply at the same level, `.puq/AGENTS.md` wins. Only the nearest `.puq/` folder is used, so a `.puq/AGENTS.md` in a parent folder is not loaded as well. Plain `AGENTS.md` and `.agents/AGENTS.md` files are different: in a monorepo, those from parent folders and the current package are all loaded.

### `@` imports

Include another file's content with `@path`:

```markdown
Read @docs/architecture.md before changing storage code.
Shared release steps live in @../RELEASE.md.
```

- Paths are relative to the file that contains the import.
- `@` inside code blocks, and email-like text such as `user@example.com`, are ignored.
- Imports can be nested up to five levels.

---

## `RULES.md` — rules that always apply

`AGENTS.md` is loaded once at the start of a session. In long sessions it can move far back in the conversation. Put short, hard requirements in `RULES.md` instead; it is sent with every request.

| File | Scope |
|------|-------|
| `~/.puq/agent/RULES.md` | You, in every project |
| `<project>/.puq/RULES.md` | This project |

```markdown
Never commit or push unless the user explicitly asks.
Do not edit generated files.
```

Keep `RULES.md` short. Edits take effect on the next `/new` or `/clear`.

---

## Skills

A skill is a folder with a `SKILL.md` file that teaches the agent a specific workflow (for example, releasing a package or working with PDFs). The agent sees each skill's name and description and loads the full content only when it is relevant.

### Where to put skills

| Location | Scope |
|----------|-------|
| `~/.puq/agent/skills/<name>/SKILL.md` | You, in every project |
| `<project>/.puq/skills/<name>/SKILL.md` | This project |

Skills must be exactly one folder below `skills/`. Nested folders like `skills/team/<name>/SKILL.md` are not discovered.

### `SKILL.md` format

```markdown
---
name: release
description: Steps for publishing a new version of this package to npm.
---

# Release

1. Run `bun test`.
2. Update `CHANGELOG.md`.
3. Run `scripts/publish.sh`.
```

- `description` is required. Write it so the agent knows when to use the skill.
- Keep scripts and templates inside the skill folder.
- `hide: true` removes the skill from the automatic list but keeps it available by name.

### Using skills

- The agent picks relevant skills automatically.
- Run a skill yourself with `/skill:<name>`, optionally followed by instructions: `/skill:release patch version`.
- Filter skills for a run with `--skills "git-*,docker"`, or disable them with `--no-skills`.

---

## Turning sources off

Disable a whole source (its context files, skills, MCP servers, and settings):

```yaml
# .puq/config.yml
disabledProviders:
  - claude
```

Disable only one context file:

```yaml
disabledExtensions:
  - context-file:user:CLAUDE.md
```

Use `/extensions` in a session to see every discovered file and toggle it.
