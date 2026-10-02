---
title: Models & Providers
description: Connect puq code with your puq API key and choose models from the puq catalog.
parent: puq code
nav_order: 3
last_modified_date: 2026-10-02
---

# Models & Providers

Use a **puq API key** for models routed through puq.ai. The current provider policy also supports direct **Anthropic API keys**. Other direct model providers, local engines, and custom endpoints are not part of the standard provider policy.

You are still free to pick your model: through the **puq model catalog** you can use models from Anthropic, OpenAI, Google, xAI, DeepSeek, Mistral, and others, all billed to your single puq API key. puq models are selected with the `puq/` prefix, for example `puq/claude-sonnet-5` or `puq/openai/gpt-5.4`. Run `puq models` to see the exact names.

[Web search]({% link puq-code/configuration.md %}#web-search) can also use optional search-provider keys.

---

## Logging in

```sh
puq login puq
```

Inside a session, use `/login puq` and `/logout`. The default local profile stores credentials in `~/.puq/agent/agent.db`. Profiles, directory overrides, Linux XDG settings, or an authentication broker can change where credentials are stored; see [Configuration]({% link puq-code/configuration.md %}#settings-files).

Create an API key as described in [Authentication]({% link api/authentication.md %}).

---

## Using the key without logging in

For scripts and CI, pass the key for a single run with `--api-key`. It is not saved. Select a model explicitly, for example with `--model`:

```sh
puq -p --model puq/claude-sonnet-5 --api-key "your-api-key-here" "Summarize the README"
```

Keep the key in your shell or CI secret store and pass it through, for example `--api-key "$PUQ_API_KEY"`. Setting `PUQ_API_KEY` alone does not automatically load a puq key; pass it explicitly or reference it in provider configuration. Direct Anthropic credentials have separate environment-variable support below.

### puq credential order

When several credentials exist, puq code uses the first match:

1. `--api-key` flag
2. `providers.puq.apiKey` in `models.yml`
3. API key saved with `puq login puq` or `/login puq`

## Direct Anthropic API access

Set `ANTHROPIC_API_KEY` in your environment to use a direct Anthropic model. Run `puq models find claude` to see available identifiers, then select an `anthropic/` model with `--model` or the model selector.

Direct Anthropic requests use that provider's API billing rather than your puq credit balance. A Claude Pro/Max subscription is not an Anthropic API key. Claude subscription OAuth login is disabled in standard release builds and should not be treated as a supported release sign-in method.

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
puq models                 # models available under the current provider policy
puq models find claude     # search by name
puq models refresh         # refresh the model catalog
```

### Model roles

Roles let puq code use different puq models for different jobs. Set them under `modelRoles` in `config.yml`:

```yaml
# ~/.puq/agent/config.yml
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
