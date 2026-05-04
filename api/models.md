---
title: Models
description: List all available AI models grouped by provider with pricing information.
parent: API
nav_order: 6
has_toc: true
---

# Models

List all available AI models grouped by provider.

See [Common Concepts](common) for authentication and error responses.

---

## GET /v1/models

List all available AI models grouped by provider.

### Request

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| `enabled` | number | Optional. `1` = enabled models only, omit for all |

```bash
# All models
curl -X GET "https://api.puq.ai/v1/models" \
  -H "Token: your-api-key-here"

# Enabled models only
curl -X GET "https://api.puq.ai/v1/models?enabled=1" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface ModelProvider {
  id: number;
  name: string;
  description: string;
  code: string;
  status: number; // 1 = enabled, 0 = disabled
}

interface Model {
  id: number;
  name: string;
  description: string;
  code: string;
  status: number;
  input_price: number | null;  // Price per 1M input tokens
  output_price: number | null; // Price per 1M output tokens
  provider: ModelProvider;
}

interface ListModelsResponse {
  models: Model[];
}
```

**Success (200):**

```json
{
  "models": [
    {
      "id": 1,
      "name": "GPT-4o",
      "description": "OpenAI's GPT-4o model",
      "code": "openai/gpt-4o",
      "status": 1,
      "input_price": 0.00005,
      "output_price": 0.00015,
      "provider": {
        "id": 1,
        "name": "OpenAI",
        "description": "OpenAI provider",
        "code": "openai",
        "status": 1
      }
    },
    {
      "id": 2,
      "name": "GPT-3.5-turbo",
      "description": "OpenAI's GPT-3.5 Turbo model",
      "code": "openai/gpt-3.5-turbo",
      "status": 1,
      "input_price": 0.00003,
      "output_price": 0.00010,
      "provider": {
        "id": 1,
        "name": "OpenAI",
        "description": "OpenAI provider",
        "code": "openai",
        "status": 1
      }
    }
  ]
}
```

**Error (401):**

```json
{ "error": "Unauthorized: Invalid or expired API key" }
```
