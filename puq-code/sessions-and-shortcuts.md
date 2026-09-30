---
title: Sessions & Shortcuts
description: Resume, fork, export, and share puq code sessions, and use keyboard shortcuts.
parent: puq code
nav_order: 8
---

# Sessions & Shortcuts

## Sessions

puq code saves every session automatically under `~/.puq-code/agent/sessions/`. Use `--no-session` to run without saving. To revert file changes made by the agent, see [Undoing changes](/puq-code/working-in-a-session/#undoing-changes).

### From the command line

| Command | Description |
|---------|-------------|
| `puq --continue` | Continue the most recent session |
| `puq --resume` | Choose a session from a list |
| `puq --resume <id>` | Open a session by ID prefix or path |
| `puq --fork <id>` | Copy a saved session into a new one |
| `puq --from-claude` / `--from-codex` | Import a Claude Code or Codex session |
| `puq --export <session.jsonl>` | Export a session file to HTML |
| `puq share` | Share a saved session through an encrypted link |

### Inside a session

| Command | Description |
|---------|-------------|
| `/new` | Start a new, empty conversation |
| `/clear` | Clear the conversation context (history stays on disk) |
| `/resume` | Switch to another session |
| `/fork` | Copy the current session into a new one |
| `/branch` | Go back to an earlier message and branch from it |
| `/tree` | Move to another point in the current session |
| `/export [path]` | Save the session as an HTML file |
| `/share` | Create an encrypted share link |
| `/dump` | Copy the session as text to the clipboard |
| `/delete` | Delete the current session |
| `/restart` | Restart puq and continue this session |

### Working together

Share a live session so others can watch or help from a browser:

| Command | Description |
|---------|-------------|
| `/collab` | Share with full control |
| `/collab view` | Share read-only |
| `/collab status` | Show the link and participants |
| `/collab stop` | Stop sharing |
| `/join <link>` | Join someone else's session |

---

## Keyboard shortcuts

Run `/hotkeys` to see all shortcuts for your version.

| Shortcut | Action |
|----------|--------|
| `Enter` | Send the message |
| `Ctrl+Enter` / `Ctrl+Q` | Queue a follow-up while the agent is working |
| `Esc` | Stop the current response |
| `Shift+Tab` | Cycle approval mode (Manual → Auto-edit → Plan → Yolo) |
| `Alt+Shift+P` | Toggle plan mode |
| `Alt+M` | Open the model selector |
| `Alt+P` | Pick a model for this session |
| `Ctrl+P` / `Shift+Ctrl+P` | Cycle models forward / backward |
| `Ctrl+N` | Cycle thinking level |
| `Ctrl+T` | Show or hide thinking |
| `Ctrl+O` | Expand or collapse tool output |
| `Ctrl+R` | Search prompt history |
| `Ctrl+G` | Edit the prompt in your `$EDITOR` |
| `Ctrl+V` | Paste (images supported) |
| `F5` or `Alt+R` | Retry the last failed response |
| `Alt+A` or `Ctrl+S` | Open the Agent Hub (subagents) |
| `Ctrl+C` | Clear the prompt (press `Up` to recover it); twice to exit |

Change shortcuts in `~/.puq-code/agent/keybindings.yml` — see [Configuration](/puq-code/configuration/#keybindings).

{: .note }
On Windows Terminal, `Ctrl+V` and `Ctrl+Enter` may be captured by the terminal. Use `Alt+V` to paste images and `Ctrl+Q` to queue a follow-up.
