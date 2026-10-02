---
title: CLI Reference
description: Commands and flags for the puq command-line tool.
parent: puq code
nav_order: 2
last_modified_date: 2026-10-02
---

# CLI Reference

```sh
puq [command] [flags] [messages...]
```

If the first argument is not a known command, `puq` starts a session and uses the arguments as the first message. For example, `puq "fix the build"` starts a session with that prompt, while `puq models` runs the `models` command.

- `puq --help` lists commands and common flags.
- `puq <command> --help` shows the flags of a single command.

---

## Starting a session

```sh
puq                                     # interactive session
puq "List all .ts files in src/"        # with an initial prompt
puq @prompt.md @image.png "Describe"    # attach files/images with @
puq -p "List all .ts files in src/"     # non-interactive: print and exit
puq --continue "What did we discuss?"   # continue the previous session
```

- `@<path>` attaches a file or image to the first message.
- Piped input (stdin) is read automatically as the prompt.
- `--` ends flag parsing; everything after it is treated as message text.

---

## Common flags

### Session and workspace

| Flag | Description |
|------|-------------|
| `--cwd <dir>` | Directory to start in |
| `--add-dir <dir>` | Add another workspace directory (repeatable) |
| `--profile <name>` | Use an isolated profile (separate auth, sessions, settings) |
| `--config <file>` | Load an extra `config.yml`-style file for this run (repeatable) |
| `--no-session` | Don't save the session |
| `--session-dir <dir>` | Directory for session storage and lookup |
| `--allow-home` | Allow starting in `~` instead of switching to a temporary folder |
| `-c`, `--continue` | Continue the previous session |
| `-r`, `--resume [id]` | Resume a session by ID, or open the session picker |
| `--from-claude` / `--from-codex` | Import a Claude Code or Codex session |
| `--export <file>` | Export a session file to HTML and exit |

### Models and thinking

| Flag | Description |
|------|-------------|
| `--model <id>` | Model to use, e.g. `puq/claude-sonnet-5`. Fuzzy matching works: `sonnet`, `gpt-5.4`, `puq/openai/gpt-5.4` |
| `--smol <id>` | Fast model for lightweight tasks |
| `--slow <id>` | Reasoning model for thorough analysis |
| `--plan <id>` | Model for planning |
| `--models <a,b,c>` | Models available for `Ctrl+P` cycling |
| `--api-key <key>` | API key for the selected provider for this run (not saved; requires explicit model selection) |
| `--thinking <level>` | `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, or `auto` |
| `--hide-thinking` | Hide thinking blocks in the UI (display only; the model still thinks) |

### Tools and approvals

| Flag | Description |
|------|-------------|
| `--tools <a,b,c>` | Enable only these tools |
| `--no-tools` | Disable all built-in tools |
| `--no-pty` | Run bash commands without an interactive terminal (PTY) |
| `--no-lsp` | Disable language-server features |
| `--approval-mode <mode>` | `always-ask`, `write`, `auto`, or `yolo` (see [Configuration](/puq-code/configuration/#tool-approval)) |
| `--auto-approve` | Use `yolo` approval mode (explicit policies can still prompt or deny; see [Configuration](/puq-code/configuration/#per-tool-rules)) |
| `--max-time <duration>` | Stop after a duration (`600`, `10m`, `1h`) |

### Extensions, skills, and prompts

| Flag | Description |
|------|-------------|
| `-e`, `--extension <path>` | Load an extension (repeatable) |
| `--hook <path>` | Load a hook file (repeatable) |
| `--no-extensions` | Disable extension discovery |
| `--skills <globs>` | Only load matching skills (e.g. `git-*,docker`) |
| `--no-skills` | Disable skills |
| `--no-rules` | Disable rules |
| `--system-prompt <text\|file>` | Replace the system prompt |
| `--append-system-prompt <text\|file>` | Append text to the system prompt |

---

## Print mode (non-interactive)

`-p` / `--print` runs a single prompt, writes the answer to stdout, and exits. Use it for scripts and CI.

```sh
# Plain text answer
puq -p "Summarize the changes in the last commit"

# Structured JSON events
puq -p --mode json "List every TODO in src/" > todos.json

# Read the prompt from stdin
echo "review this diff" | puq -p
```

Useful options in print mode:

| Flag | Description |
|------|-------------|
| `--mode json` | Emit structured JSON events instead of text |
| `--print-thoughts` | Include thinking blocks in the output |
| `--no-title` | Skip session title generation |
| `--output-schema <json\|@file>` | Require the final answer to be JSON matching a JSON Schema |

Example with an output schema:

```sh
puq -p --output-schema '{"type":"object","properties":{"ok":{"type":"boolean"}},"required":["ok"]}' \
  "Do the tests in test/ pass?"
```

If the answer never matches the schema, `puq` exits with code `1`.

### Output modes

| Mode | Description |
|------|-------------|
| `text` | Default. TUI when interactive, plain text with `-p` |
| `json` | JSON event stream |
| `rpc` | JSON-RPC server over stdio |
| `rpc-ui` | RPC with extension UI events |
| `acp` | ACP (Agent Client Protocol) server, same as `puq acp` |

---

## Commands

| Command | Purpose |
|---------|---------|
| `login` | Log in with your puq API key (`puq login puq`) |
| `models` | List, search, and refresh available models |
| `config` | Read and change settings (`list`, `get`, `set`, `reset`, `path`, `init-xdg`) |
| `update` | Install the newest release (`-l` also updates plugins) |
| `setup` | Onboarding and optional dependencies (`python`, `speech`) |
| `commit` | Generate a commit message and update changelogs |
| `git` | Full-screen git UI with diff viewer and commit composer |
| `find` | Semantic code search: describe a behavior, get matching files and lines |
| `worktree`, `wt` | Manage git worktrees |
| `share` | Share a saved session through an encrypted link |
| `join` | Join a shared collaborative session |
| `plugin`, `install` | Install and manage plugins/extensions |
| `agents` | Manage bundled task agents |
| `acp` | Run puq as an ACP (Agent Client Protocol) server |
| `github install` | Add a GitHub Actions workflow so collaborators can comment `/puq <request>` on issues and PRs |
| `usage` | Show provider usage limits |
| `stats` | Usage statistics dashboard |
| `ssh` | Manage SSH host configurations |
| `completions` | Print a shell completion script (bash, zsh, fish) |
| `gc` | Report stored data that can be cleaned up; add `--apply` to delete it |

This table lists the most common commands. Run `puq --help` for the full list and `puq <command> --help` for the options of each command.
