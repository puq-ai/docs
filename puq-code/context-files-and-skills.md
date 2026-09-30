---
title: Context Files & Skills
description: Give puq code project knowledge with AGENTS.md, RULES.md, and skills.
parent: puq code
nav_order: 5
---

# Context Files & Skills

puq code can learn about your project and your preferences from Markdown files. These are loaded automatically when a session starts — you don't need to ask the agent to read them.

---

## `AGENTS.md` — project context

Use `AGENTS.md` for repository background: architecture, code style, build and test commands, and review expectations.

| File | Scope |
|------|-------|
| `~/.puq-code/agent/AGENTS.md` | You, in every project |
| `<project>/.puq-code/AGENTS.md` | This project |
| `<project>/AGENTS.md` | This project (also read by other tools) |

Example:

```markdown
# Project notes

- Build with `bun run build`, test with `bun test`.
- API handlers live in `src/api/`; keep them thin.
- Never edit files under `generated/`.
```

### Files from other tools

puq code also reads context files from other AI tools, so existing projects work without changes:

- `CLAUDE.md`, `.claude/CLAUDE.md`
- `.gemini/GEMINI.md`
- `.github/copilot-instructions.md`
- `~/.codex/AGENTS.md`, `.agents/AGENTS.md`
- Cursor, Windsurf, and Cline rule files

When several files apply at the same level, `.puq-code/AGENTS.md` wins. Only the nearest `.puq-code/` folder is used, so a `.puq-code/AGENTS.md` in a parent folder is not loaded as well. Plain `AGENTS.md` and `.agents/AGENTS.md` files are different: in a monorepo, those from parent folders and the current package are all loaded.

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
| `~/.puq-code/agent/RULES.md` | You, in every project |
| `<project>/.puq-code/RULES.md` | This project |

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
| `~/.puq-code/agent/skills/<name>/SKILL.md` | You, in every project |
| `<project>/.puq-code/skills/<name>/SKILL.md` | This project |

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
# .puq-code/config.yml
disabledProviders:
  - claude
```

Disable only one context file:

```yaml
disabledExtensions:
  - context-file:user:CLAUDE.md
```

Use `/extensions` in a session to see every discovered file and toggle it.
