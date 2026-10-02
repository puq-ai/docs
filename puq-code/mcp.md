---
title: MCP Servers
description: Connect external tools to puq code with Model Context Protocol (MCP) servers.
parent: puq code
nav_order: 6
last_modified_date: 2026-10-02
---

# MCP Servers

MCP (Model Context Protocol) servers give puq code extra tools, such as access to GitHub, Slack, databases, or your file system.

---

## Adding a server

The easiest way is the guided setup inside a session:

```
/mcp add
```

Or edit the configuration file directly:

| File | Scope |
|------|-------|
| `<project>/.puq/mcp.json` | This project |
| `~/.puq/agent/mcp.json` | You, in every project |

A `mcp.json` or `.mcp.json` in the project root is also read. puq code can also read MCP servers configured for Claude Code, Codex, Gemini CLI, Cursor, Windsurf, VS Code, and OpenCode. Project configurations are discovered unless disabled. User-level configurations from Claude Code, Codex, Gemini CLI, Cursor, Windsurf, and OpenCode require the corresponding source in `enabledProviders`; see [Files from other tools]({% link puq-code/context-files-and-skills.md %}#files-from-other-tools).

---

## File format

```json
{
  "$schema": "https://docs.puq.ai/puq-code/mcp-schema.json",
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "some-mcp-server"]
    }
  }
}
```

The optional `$schema` line gives autocomplete and validation in editors like VS Code. This documentation includes the [MCP schema]({{ '/puq-code/mcp-schema.json' | relative_url }}); omit `$schema` if your editor cannot fetch it. puq code does not need the schema URL to load the configuration.

### Local server (stdio)

Starts a program on your machine. A configuration with `command` and no explicit `type` is treated as stdio.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/absolute/path/one"]
    }
  }
}
```

Fields: `command` (required), `args`, `env`, `cwd`.

### Remote server (HTTP)

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

Fields: `url` (required), `type: "http"` (recommended explicitly for editor validation), and optional `headers`. The older `type: "sse"` is also supported.

{: .note }
Set `"type": "http"` explicitly for clarity and editor validation. At runtime, puq code infers HTTP when `url` is present without `command`, although the schema requires an explicit remote type. An explicit `"type": "stdio"` requires `command`.

### Common options

| Field | Description |
|-------|-------------|
| `enabled` | Set `false` to turn the server off |
| `timeout` | Request timeout in milliseconds (`0` = no timeout) |
| `instructions` | Set `false` to leave the server's instructions out of the prompt |
| `oauth` | OAuth client settings for servers that need them |

---

## Secrets

Don't put tokens directly in a shared `mcp.json`. Use one of these instead:

**`${VAR}` placeholders:**

```json
"headers": { "Authorization": "Bearer ${GITHUB_TOKEN}" }
```

**Environment variable name** — if the value is the name of a set variable, its value is used:

```json
"env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "GITHUB_PERSONAL_ACCESS_TOKEN" }
```

**Shell command** — a value starting with `!` runs the command and uses its output:

```json
"headers": { "Authorization": "!printf 'Bearer %s' \"$GITHUB_TOKEN\"" }
```

For OAuth servers, run `/mcp reauth <name>` to sign in. The login is stored in your profile, not in the config file, so a project `mcp.json` can be committed safely.

---

## Managing servers

| Command | Description |
|---------|-------------|
| `/mcp list` | Show servers and which file each one comes from |
| `/mcp add` | Add a server with a guided setup |
| `/mcp remove <name>` | Remove a server |
| `/mcp test <name>` | Test one server |
| `/mcp reload` | Reload all configs and reconnect |
| `/mcp reconnect <name>` | Reconnect one server |
| `/mcp enable <name>` / `/mcp disable <name>` | Turn a server on or off |
| `/mcp reauth <name>` / `/mcp unauth <name>` | Replace or remove OAuth credentials |
| `/mcp resources`, `/mcp prompts` | Show server resources and prompts |

MCP tools appear to the agent as `mcp__<server>_<tool>`. You can control them with [tool approval rules](/puq-code/configuration/#per-tool-rules).

---

## Troubleshooting

- **Server doesn't connect:** run `/mcp test <name>`. Check that the program or Docker image exists, required environment variables are set, the URL is reachable, and the token is valid.
- **Server from another tool is missing:** run `/mcp list`. Check `enabledProviders` for user-level foreign sources, `disabledProviders`, `disabledServers` in your user `mcp.json`, and `mcp.enableProjectConfig`.
- **Browser servers (Playwright, Puppeteer) are ignored:** puq code has a built-in browser tool and skips these servers. Set `browser.enabled: false` to use an MCP browser server instead.
