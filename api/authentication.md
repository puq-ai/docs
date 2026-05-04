---
title: Authentication
description: How to create, use, and manage API keys for the puq.ai API.
parent: API
nav_order: 1
---

# Authentication

---

## Creating an API Key (Dashboard)

1. Go to **Account Settings → API Tokens**
2. Click **Generate New Token**
3. Provide a name for your key
4. Copy the token — it will only be shown once

---

## Using Your API Key

Include your key in the `Authorization` header with every request:

```bash
curl https://api.puq.ai/chat/completions \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

Use the `Token` prefix:

```
Authorization: Token <api_key>
```

---

## API Key Lifecycle

- API keys **do not expire** as long as their status is active (`status=1`).
- Keys can be created, listed, and deleted via the dashboard.
