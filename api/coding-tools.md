---
title: Coding Tools
description: Use the puq.ai AI Router with Claude Code, Codex, VS Code, JetBrains Rider, and other coding agents.
parent: API
nav_order: 8
has_toc: true
---

# Coding Tools

Connect your coding agents to the puq.ai AI Router. One API key and one base URL give you every text model in the catalog. The only thing that changes between tools is the **model name**.

---

## Before You Start

### Base URL

| Tool | Base URL |
| ---- | -------- |
| Claude Code (terminal and VS Code), Claude agent in JetBrains Rider | `https://api.puq.ai` |
| Codex and other OpenAI-compatible tools | `https://api.puq.ai/v1` |

{: .important }
Claude tools take the base URL **without** `/v1`. Codex and OpenAI-compatible tools take it **with** `/v1`.

### API Key

Create an API key as described in [Authentication]({% link api/authentication.md %}). The examples on this page read it from the `PUQ_API_KEY` environment variable. Set it once in your shell (for example in `~/.zshrc`):

```bash
export PUQ_API_KEY="your-api-key-here"
```

{: .warning }
Keep the key in your environment or a secret store. Do not write it into config files.

### Model Names

Coding tools address models by their catalog route: `puqai/<family>/<model>`.

| Model | Route |
| ----- | ----- |
| Claude Sonnet 5 | `puqai/anthropic/claude-sonnet-5` |
| Claude Opus 5 | `puqai/anthropic/claude-opus-5` |
| Claude Haiku 4.5 (fast, low cost) | `puqai/anthropic/claude-haiku-4.5` |
| GPT 5.4 mini | `puqai/openai/gpt-5.4-mini` |
| GPT 5.6 Luna | `puqai/openai/gpt-5.6-luna` |
| Gemini 3.5 Flash | `puqai/google/gemini-3.5-flash` |
| Kimi K2.7 Code | `puqai/moonshotai/kimi-k2.7-code` |
| GLM 5.2 | `puqai/zai-org/glm-5.2` |

To list every enabled model, call the [Models]({% link api/models.md %}) endpoint. The `code` field of each entry is the route. The list also includes non-text models (image, audio), which coding tools cannot use.

```bash
curl -s "https://api.puq.ai/v1/models?enabled=1" \
  -H "Authorization: Token $PUQ_API_KEY" | jq -r '.models[].code'
```

### Endpoints by Tool

Each tool speaks its own API format. The router accepts all three, so you can use non-Claude models from Claude Code and Claude models from Codex.

| Tool | Endpoint | Non-Claude models |
| ---- | -------- | ----------------- |
| Claude Code (terminal and VS Code), Claude agent in Rider | `/v1/messages` | Translated by the router |
| Codex | `/v1/responses` | Translated by the router |
| opencode, omp, other OpenAI-compatible tools | `/v1/chat/completions` | Native |

---

## Claude Code

Run a single session through puq.ai:

```bash
ANTHROPIC_BASE_URL=https://api.puq.ai \
ANTHROPIC_AUTH_TOKEN=$PUQ_API_KEY \
ANTHROPIC_MODEL=puqai/anthropic/claude-sonnet-5 \
ANTHROPIC_DEFAULT_HAIKU_MODEL=puqai/anthropic/claude-haiku-4.5 \
claude
```

For everyday use, add a shortcut to `~/.zshrc`:

```bash
claude-puq() {
  ANTHROPIC_BASE_URL=https://api.puq.ai \
  ANTHROPIC_AUTH_TOKEN=$PUQ_API_KEY \
  ANTHROPIC_MODEL=${PUQ_MODEL:-puqai/anthropic/claude-sonnet-5} \
  ANTHROPIC_DEFAULT_HAIKU_MODEL=puqai/anthropic/claude-haiku-4.5 \
  claude "$@"
}
```

```bash
claude-puq                                             # Claude Sonnet 5
PUQ_MODEL=puqai/moonshotai/kimi-k2.7-code claude-puq   # any other model
```

### Things to Know

- **Keep these variables out of the global `~/.claude/settings.json`.** If you put them there, every Claude Code session goes through puq.ai and your claude.ai connectors are disabled. To use puq.ai in one project only, use a project settings file as shown in [Visual Studio Code](#visual-studio-code); the same file works for the terminal.
- **`ANTHROPIC_DEFAULT_HAIKU_MODEL`** is used for background tasks such as session titles and summaries. Set it to a low-cost catalog model even when your main model is not Claude.
- **Do not switch models mid-session.** For example, Anthropic models reject the tool-call IDs that Kimi generates (`functions.read:0`). To change models, start a new session.

---

## Codex

Use a separate config directory so your existing `~/.codex` settings stay untouched. Create `~/.codex-puq/config.toml`:

```toml
model_provider = "puq"
model = "puqai/anthropic/claude-sonnet-5"

[model_providers.puq]
name = "PUQ"
base_url = "https://api.puq.ai/v1"
env_key = "PUQ_API_KEY"
wire_api = "responses"
```

Then point Codex at it with `CODEX_HOME`:

```bash
CODEX_HOME=~/.codex-puq codex                                    # interactive
CODEX_HOME=~/.codex-puq codex -m puqai/google/gemini-3.5-flash   # another model
CODEX_HOME=~/.codex-puq codex exec "Summarize the README"        # one-off task
```

### Things to Know

- **`wire_api = "responses"` is required.** Recent Codex versions (0.154 and later) no longer support the `chat` wire API.
- **`PUQ_API_KEY` must be set in your environment.** Codex reads the key from the variable named in `env_key`.
- The warning `Model metadata for ... not found` is harmless. Codex does not recognize puq.ai model names but works with them.

---

## Visual Studio Code

The **Claude Code for VS Code** extension runs the same engine as the `claude` command and reads the same settings files. Set up puq.ai per project, so your other projects keep your usual Claude sign-in.

### 1. Add the Project Settings

In the root of the folder you open in VS Code, create `.claude/settings.local.json`:

```json
{
  "apiKeyHelper": "printenv PUQ_API_KEY",
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.puq.ai",
    "ANTHROPIC_MODEL": "puqai/anthropic/claude-sonnet-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "puqai/anthropic/claude-sonnet-5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "puqai/anthropic/claude-opus-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "puqai/anthropic/claude-haiku-4.5"
  }
}
```

`apiKeyHelper` reads the key from the `PUQ_API_KEY` variable you set in [API Key](#api-key), so the key itself never lands in the file.

### 2. Restart VS Code

VS Code reads your shell environment only when it starts. If you added `PUQ_API_KEY` to your shell profile while VS Code was open, quit VS Code completely (**Cmd+Q** on macOS) and open the project again.

### 3. Start a Conversation

Open the Command Palette and run **Claude Code: Open in New Tab**, or click the Claude icon in the editor toolbar. Send a message. Requests now go through puq.ai with the model set in `ANTHROPIC_MODEL`.

### Things to Know

- **The terminal uses the same file.** Running `claude` inside this folder also goes through puq.ai.
- **If the extension asks you to sign in,** add `"claudeCode.disableLoginPrompt": true` to your VS Code user settings. `apiKeyHelper` already handles authentication.
- **To change the model,** edit `ANTHROPIC_MODEL` and start a new conversation. As in the terminal, do not switch models mid-session.
- **The model picker sends aliases** such as Sonnet or Opus. `ANTHROPIC_DEFAULT_SONNET_MODEL` and `ANTHROPIC_DEFAULT_OPUS_MODEL` map them to puq.ai routes; without them the picker sends plain model names such as `claude-sonnet-5` instead of catalog routes.
- **Keep `.claude/settings.local.json` out of version control.** It holds your personal settings, so add it to your `.gitignore`.
- The extension also has a `claudeCode.environmentVariables` setting. It applies to every workspace and needs the key written in plain text, so prefer the project file above.

---

## JetBrains Rider

Rider's AI Chat runs agents as subprocesses over the Agent Client Protocol (ACP). The built-in **Claude Agent** does not go through puq.ai, so you register a custom agent named **Claude (PUQ)** instead.

{: .note }
The steps below are for macOS. They keep the API key in the macOS Keychain and require Node.js (`npx`).

### 1. Store the API Key in the Keychain

```bash
security add-generic-password -U -a "$USER" -s puq-api-key -w
```

The command prompts for the key. Run it again later to replace the key.

### 2. Create the Launcher Script

Create the config directory if it does not exist yet:

```bash
mkdir -p ~/.jetbrains
```

Save the following as `~/.jetbrains/puq-claude-acp.sh`. It reads the key from the Keychain at launch and starts the Claude ACP adapter.

```sh
#!/bin/sh
# Starts the Claude ACP agent for JetBrains AI Chat on puq.ai.
# The API key is read from the macOS Keychain, so it is never stored in a config file.

# An IDE started from the Dock does not get your shell's PATH.
# If npx lives somewhere else, add its directory here (run: dirname "$(which npx)").
export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

KEY="$(security find-generic-password -s puq-api-key -w 2>/dev/null)"
if [ -z "$KEY" ]; then
	echo 'puq.ai API key not found in the Keychain. Run: security add-generic-password -U -a "$USER" -s puq-api-key -w' >&2
	exit 1
fi
export ANTHROPIC_AUTH_TOKEN="$KEY"
export ANTHROPIC_BASE_URL="${ANTHROPIC_BASE_URL:-https://api.puq.ai}"

if [ "$1" = "--check" ]; then
	code="$(curl -s -o /dev/null -m 60 -w '%{http_code}' -X POST "$ANTHROPIC_BASE_URL/v1/messages" \
		-H "Authorization: Bearer $KEY" -H 'content-type: application/json' -H 'anthropic-version: 2023-06-01' \
		-d '{"model":"puqai/anthropic/claude-haiku-4.5","max_tokens":16,"messages":[{"role":"user","content":"Say OK."}]}')"
	echo "key found; $ANTHROPIC_BASE_URL/v1/messages answered HTTP $code"
	[ "$code" = "200" ]
	exit $?
fi

exec npx -y @agentclientprotocol/claude-agent-acp@0.78.0 "$@"
```

Make it executable:

```bash
chmod 700 ~/.jetbrains/puq-claude-acp.sh
```

### 3. Register the Agent

Add the agent to `~/.jetbrains/acp.json`. If the file already exists, add the `"Claude (PUQ)"` entry inside its `agent_servers` object.

```json
{
  "agent_servers": {
    "Claude (PUQ)": {
      "command": "/Users/<your-username>/.jetbrains/puq-claude-acp.sh",
      "args": [],
      "env": {
        "ANTHROPIC_BASE_URL": "https://api.puq.ai",
        "ANTHROPIC_MODEL": "puqai/anthropic/claude-sonnet-5",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "puqai/anthropic/claude-sonnet-5",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "puqai/anthropic/claude-opus-5",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "puqai/anthropic/claude-haiku-4.5",
        "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
      }
    }
  }
}
```

`command` must be an absolute path, because `~` is not expanded in JSON. Replace `<your-username>` with your macOS username.

### 4. Check the Setup

```bash
~/.jetbrains/puq-claude-acp.sh --check
```

Expected output:

```
key found; https://api.puq.ai/v1/messages answered HTTP 200
```

### 5. Use It in Rider

1. Open **AI Chat** and pick **Claude (PUQ)** from the agent list at the top.
2. If it is not listed, restart Rider. If it is still missing, open the menu in the top right of AI Chat and click **Add Custom Agent**. This opens your `acp.json`; close it without changes.
3. Send a message. Rider asks for permission before the agent writes files.

### Changing the Model

Change `ANTHROPIC_MODEL` in `~/.jetbrains/acp.json`. To keep several models in the agent list, copy the entry under a different name:

```json
"Kimi (PUQ)": {
  "command": "/Users/<your-username>/.jetbrains/puq-claude-acp.sh",
  "args": [],
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.puq.ai",
    "ANTHROPIC_MODEL": "puqai/moonshotai/kimi-k2.7-code",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "puqai/anthropic/claude-haiku-4.5"
  }
}
```

---

## Other OpenAI-Compatible Tools

Tools that use the Chat Completions format, such as opencode and omp, work with the same settings:

- **Base URL:** `https://api.puq.ai/v1`
- **API key:** your puq.ai API key
- **Model:** any route from [Model Names](#model-names), for example `puqai/openai/gpt-5.4-mini`

{: .note }
On `/v1/chat/completions`, Claude models default to a maximum of 1024 output tokens. If responses are cut off, set `max_tokens` in your tool or request.

---

## Troubleshooting

| Symptom | Cause and fix |
| ------- | ------------- |
| HTTP 401 | The API key is wrong or has been revoked. Check `PUQ_API_KEY` (or the Keychain entry for Rider). |
| HTTP 402 | Your balance is 0 or below. See [Credits]({% link api/credits.md %}). |
| HTTP 429, rate limit exceeded | The upstream provider is rate limiting. Wait a moment and retry, or choose another model. |
| Tool-call ID error after switching models | Models were changed mid-session. Start a new session. |
| Codex: `stream closed before response.completed` | The upstream model returned an error. Retry, or switch to another model. |
| VS Code: the extension asks you to sign in | Set `"claudeCode.disableLoginPrompt": true` in your VS Code user settings. |
| VS Code: `apiKeyHelper` fails or HTTP 401 | VS Code cannot see `PUQ_API_KEY`. Quit VS Code completely and open it again. |
| VS Code: requests do not go through puq.ai | `.claude/settings.local.json` must be in the root of the folder open in that VS Code window. Settings from other folders are not read. |
| Rider: the agent does not respond | Run `~/.jetbrains/puq-claude-acp.sh --check`. |
| Rider: **Claude (PUQ)** is not in the agent list | Restart Rider. |
| Rider: requests do not seem to go through puq.ai | The built-in **Claude Agent** may be selected. Select **Claude (PUQ)** instead. |
