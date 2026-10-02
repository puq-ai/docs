---
title: Working in a Session
description: Everyday use of puq code — giving context, steering the agent, undoing changes, and managing long sessions.
parent: puq code
nav_order: 7
---

# Working in a Session

## Giving the agent context

| In the prompt | What it does |
|---------------|--------------|
| `@path/to/file` | Attach a file |
| `Ctrl+V` | Paste an image or text (screenshots work) |
| `/skill:<name>` | Use a [skill](/puq-code/context-files-and-skills/#skills) |
| `^` | Pick a model to handle part of the request (see [Subagents](/puq-code/plan-mode-and-subagents/#asking-a-specific-model)) |

You can also run commands yourself without asking the agent:

| Prefix | What it does |
|--------|--------------|
| `!` | Run a shell command, e.g. `!git status` |
| `$` | Run Python code (requires `puq setup python`) |

---

## Steering while the agent works

You don't have to wait for the agent to finish.

| Key | Effect |
|-----|--------|
| `Enter` | Send a message now; the agent reads it at its next step |
| `Ctrl+Enter` / `Ctrl+Q` | Queue a message for after the current task finishes |
| `Alt+Up` | Take the last queued message back into the editor |
| `Esc` | Stop the current response |

### Side questions

Ask something without disturbing the main conversation:

```
/btw what does the retry option in fetchUser do?
```

The answer uses the current session's context but is not added to the conversation. Run `/btw` alone to see earlier side questions.

---

## Undoing changes

puq code takes a snapshot of your files before each message you send.

| Command | Effect |
|---------|--------|
| `/undo` | Restore files to how they were before your last message |
| `/redo` | Re-apply what `/undo` reverted |

Snapshots are stored in your project's git repository under a separate internal ref. They never touch your branches, staging area, or commit history.

{: .note }
Undo works in git repositories. You can still use `git` directly (`!git diff`, `!git checkout -- file`) at any time.

To go back in the **conversation** instead of the files, use `/branch` (pick an earlier message) or `/tree`. See [Sessions & Shortcuts](/puq-code/sessions-and-shortcuts/).

---

## Tracking progress

For multi-step work the agent keeps a todo list, shown above the prompt.

| Command | Effect |
|---------|--------|
| `/todo` | Show the list |
| `/todo edit` | Edit the list in your editor |
| `/todo expand` | Show every item |
| `/todo collapse` | Show a short preview |

---

## Long sessions

Every model has a limited context window. When a session gets long, puq code automatically **compacts** it: older messages are replaced by a summary so the agent can keep working.

Compact manually at any time, optionally telling it what to keep:

```
/compact
/compact keep the database migration details
```

Tips:
- Start a new conversation with `/new` when you switch to an unrelated task.
- `/clear` empties the conversation but keeps the session on disk.
- Put rules that must survive long sessions in [`RULES.md`](/puq-code/context-files-and-skills/#rulesmd--rules-that-always-apply).

---

## Magic keywords

Some words in your prompt give the agent extra instructions for that message:

| Keyword | Effect |
|---------|--------|
| `ultrathink` | Think carefully step by step; uses the highest reasoning level when thinking is on `auto` |
| `orchestrate` | Split the work into parts, delegate to subagents in parallel, and verify each part |

```
ultrathink about the failure modes before changing this API
orchestrate the migration described in docs/plan.md
```

Keywords must be lowercase, standalone words. Words inside code (`` `ultrathink` ``) or file names are ignored. Turn them off in `/settings` → Interaction → Magic Keywords, or with `puq config set magicKeywords.enabled false`.

---

## Voice

| Action | How |
|--------|-----|
| Dictate a prompt | Hold `Space`, speak, release |
| Live voice conversation | `Ctrl+L` or `/live` |

Install the speech components first with `puq setup speech`.

---

## Other useful commands

| Command | Description |
|---------|-------------|
| `/model` | Choose the model and set model roles |
| `/settings` | Open the settings panel |
| `/review` | Ask the agent to review your current changes |
| `/copy` | Copy a message or code block |
| `/hotkeys` | Show all keyboard shortcuts |
| `/extensions` | Show loaded context files, skills, and extensions |
| `/exit` | Quit puq code |
