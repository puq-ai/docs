---
title: Generating API Tokens
description: How to create and manage API tokens in puq.ai.
parent: API
nav_order: 2
---

# Generating API Tokens

1. Go to **Account Settings → API Tokens**
2. Click **Generate New Token**
3. Copy the token (it will only be shown once)

### Token Scopes

| Scope | Permission |
|--------|-------------|
| `read:flows` | Read workflows and executions |
| `write:flows` | Create or update workflows |
| `execute:flows` | Trigger workflows |
| `admin` | Full access |

⚠️ **Do not expose tokens** publicly or store them in client-side code.

### Example API Call