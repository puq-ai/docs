---
title: Getting Started
description: Set up puq code, log in to a model provider, and run your first session.
parent: puq code
nav_order: 1
last_modified_date: 2026-10-02
---

# Getting Started with puq code

## 1. Install and verify

Install puq code with the official install script on macOS or Linux:

```sh
curl -fsSL https://puq.sh/install.sh | sh
```

To review the script before running it:

```sh
curl -fsSL https://puq.sh/install.sh -o install.sh
less install.sh
sh install.sh
```

Prebuilt binaries are also listed in the [release repository](https://github.com/puq-ai/code/releases) if you prefer a manual install.

After installation, open a new terminal (so your `PATH` is refreshed) and check:

```sh
puq --version
```

If the command prints a version such as `puq/1.0.0`, puq code is installed and on your `PATH`. Development builds can include an additional version suffix.

Keep puq code up to date with:

```sh
puq update            # update from the selected release channel
puq update --plugins  # update installed plugins
```

The default update channel is `stable`, which can lag behind the latest published release. Package-manager installations, native Windows binaries, and source checkouts can require the external upgrade or build steps reported by `puq update`.

### Optional components

Some features need extra dependencies. Install them with `puq setup`:

```sh
puq setup           # run onboarding setup
puq setup python    # enable the Python tool
puq setup speech    # enable speech features
puq setup --check   # check which dependencies are installed
```

Shell completion scripts are available for bash, zsh, and fish. Load them from your shell config:

```sh
eval "$(puq completions zsh)"                          # zsh (~/.zshrc)
eval "$(puq completions bash)"                         # bash (~/.bashrc)
puq completions fish > ~/.config/fish/completions/puq.fish
```

---

## 2. Log in with your puq API key

A puq API key gives you access to enabled models in the puq catalog, including models from Anthropic, OpenAI, Google, and other providers. Direct Anthropic API-key access is also supported; see [Models & Providers](/puq-code/models-and-providers/).

**Log in from the terminal:**

```sh
puq login puq
```

**Log in inside a session:**

```
/login puq
```

**Or pass the key for a single run** (useful in scripts and CI):

```sh
puq -p --model puq/claude-sonnet-5 --api-key "your-api-key-here" "Summarize the README"
```

See [Models & Providers](/puq-code/models-and-providers/) for details.

---

## 3. Start a session

Open your project directory and run `puq`:

```sh
cd path/to/your/project
puq
```

You can also pass an initial prompt, and attach files or images with `@`:

```sh
puq "Explain how authentication works in this project"
puq @screenshot.png "Why does this page look broken?"
```

Inside the session, type your request and press **Enter**. The agent reads files, runs commands, and edits code to complete the task.

Useful first commands inside a session:

| Command | What it does |
|---------|--------------|
| `/login` | Add or change your puq API key |
| `/settings` | Open the settings panel |
| `/hotkeys` | Show all keyboard shortcuts |
| `/mcp` | Manage MCP servers |
| `/new` | Start a new conversation |
| `/resume` | Switch to a previous session |

---

## 4. Run without the interactive UI

Use print mode (`-p`) for scripts, automation, and CI. puq code processes the prompt, prints the result, and exits:

```sh
puq -p "List every TODO in src/"
echo "review this diff" | puq -p
```

See [CLI Reference](/puq-code/cli-reference/) for all flags.

---

## 5. Continue later

Sessions are saved automatically.

```sh
puq --continue     # continue the most recent session
puq --resume       # pick a session from a list
```

See [Sessions & Shortcuts](/puq-code/sessions-and-shortcuts/) for more.
