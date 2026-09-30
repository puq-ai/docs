---
title: Automation & Integrations
description: Use puq code in scripts, CI, GitHub, and editors.
parent: puq code
nav_order: 11
---

# Automation & Integrations

## Scripts and CI

Print mode (`-p`) runs one prompt without the interactive UI and exits. Combine it with an approval mode and a time limit for unattended runs:

```sh
puq -p --approval-mode yolo --max-time 10m \
  "Run the test suite and fix any failing tests"
```

Get machine-readable results:

```sh
# JSON event stream
puq -p --mode json "List every TODO in src/" > todos.json

# Final answer validated against a JSON Schema
puq -p --output-schema @schema.json "Check whether the build passes"
```

Tips for automated runs:

- Pass your puq API key with `--api-key` and choose a model with `--model`, e.g. `--model puq/claude-sonnet-5 --api-key "$PUQ_API_KEY"`. puq code does not read the key from environment variables on its own, so pass it explicitly from your CI secret.
- Use `--no-session` if you don't need the session saved.
- Use `--config ci.yml` to apply CI-only settings without changing your own config.
- Set `hooks.trustProject: true` if project hooks must run headless.

---

## GitHub Actions

Let collaborators ask puq code for help directly in issues and pull requests:

```sh
puq github install
```

This creates `.github/workflows/puq.yml`. After you commit it:

1. Add a repository secret named `PUQ_API_KEY`.
2. Comment `/puq <request>` on an issue, a pull request, or a line in a PR diff.
3. puq code runs, replies with a comment, and:
   - on a pull request from the same repository, pushes its changes to that PR;
   - on an issue, opens a new pull request.

Only the repository owner, members, and collaborators can trigger it. The workflow runs on Linux runners.

| Option | Description |
|--------|-------------|
| `--trigger <prefix>` | Use a different comment prefix, e.g. `--trigger /agent` |
| `--force` | Overwrite an existing workflow file |

---

## Commit messages

Generate a commit message from your staged changes and update changelogs:

```sh
puq commit
```

For an interactive diff viewer, staging, and commit editor:

```sh
puq git
```

---

## Editors (ACP)

puq code can run as an [Agent Client Protocol](https://agentclientprotocol.com) server, so editors and tools that support ACP can use it as their agent:

```sh
puq acp
```

Configure your editor to start `puq acp` as an external agent. The session uses your normal settings, credentials, and project config.

To let the agent run tools without the editor asking for permission:

```sh
puq acp --approval-mode yolo
```

Without this, the editor asks you before the agent runs commands or edits files.

---

## Programmatic control (RPC)

For your own tools and integrations, run puq code as a JSON-RPC server over stdio:

```sh
puq --mode rpc
```

Add `--no-ui` to run extensions without interactive dialogs.
