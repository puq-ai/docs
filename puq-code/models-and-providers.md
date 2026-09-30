---
title: Models & Providers
description: Connect puq code with your puq API key and choose models from the puq catalog.
parent: puq code
nav_order: 3
---

# Models & Providers

puq code accepts only a **puq API key**. Logins and API keys from other model providers (Anthropic, OpenAI, Google, OpenRouter, and so on), local engines, and custom endpoints are not supported.

You are still free to pick your model: through the **puq model catalog** you can use models from Anthropic, OpenAI, Google, xAI, DeepSeek, Mistral, and others, all billed to your single puq API key. puq models are selected with the `puq/` prefix, for example `puq/claude-sonnet-5` or `puq/openai/gpt-5.4`. Run `puq models` to see the exact names.

The only exception is [web search]({% link puq-code/configuration.md %}#web-search), which can optionally use its own search provider keys.

---

## Logging in

```sh
puq login puq
```

Inside a session, use `/login puq` and `/logout`. Credentials are stored in `~/.puq-code/agent/agent.db`.

Create an API key as described in [Authentication]({% link api/authentication.md %}).

---

## Using the key without logging in

For scripts and CI, pass the key for a single run with `--api-key`. It is not saved, and a model must be given with `--model`:

```sh
puq -p --model puq/claude-sonnet-5 --api-key "your-api-key-here" "Summarize the README"
```

Keep the key in your shell or CI secret store and pass it through, for example `--api-key "$PUQ_API_KEY"`. puq code does not read the key from environment variables or `.env` files on its own.

### Credential order

When several credentials exist, puq code uses the first match:

1. `--api-key` flag
2. API key saved with `puq login puq` or `/login puq`

---

## Choosing a model

**On the command line:**

```sh
puq --model puq/claude-sonnet-5
puq --model puq/claude-sonnet-5 --thinking high
```

**Inside a session:**

| Shortcut | Action |
|----------|--------|
| `/model` or `Alt+M` | Open the model selector and set roles |
| `Alt+P` | Pick a model for this session only |
| `Ctrl+P` | Cycle through your role models |
| `Ctrl+N` | Cycle the thinking level |

**List available models:**

```sh
puq models                 # all puq models
puq models find claude     # search by name
puq models refresh         # refresh the model catalog
```

### Model roles

Roles let puq code use different puq models for different jobs. Set them under `modelRoles` in `config.yml`:

```yaml
# ~/.puq-code/agent/config.yml
modelRoles:
  default: puq/claude-sonnet-5
  smol: puq/claude-haiku-4-5
  slow: puq/claude-sonnet-5:high
  plan: "@slow"
```

| Role | Used for |
|------|----------|
| `default` | Main conversation |
| `smol` | Fast, lightweight tasks |
| `slow` | Deep reasoning |
| `plan` | Plan mode |
| `vision` | Image and screenshot questions |
| `commit` | Commit messages |
| `task` | Subagents |
| `tiny` | Background chores such as session titles |
| `memory` | Memory |
| `advisor` | Advisor and watchdog checks |
| `web` | Web search |

The model selector (`/model`) also shows roles for image generation, speech, dictation, and judging.

- `@role` points one role at another (quote it in YAML).
- A `:low`, `:medium`, or `:high` suffix sets the thinking level for that role.
