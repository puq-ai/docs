---
title: Common Concepts
description: Shared concepts for External API (/v1) including authentication, pagination, and error responses.
parent: API
nav_order: 2
has_toc: true
---

# Common Concepts

These concepts apply to all `/v1` External API endpoints.

---

## Base URL

**Base URL:** `https://api.puq.ai`

All endpoints are relative to this base URL.

---

## Authentication

All endpoints require an API key passed in `Token` header.

```bash
curl https://api.puq.ai/workflows \
  -H "Token: your-api-key-here"
```

Generate API keys via `/keys` endpoint (requires JWT authentication) or through the dashboard under **Account Settings → API Tokens**.

**Error (401 Unauthorized):**

```json
{
  "error": "Unauthorized: Invalid or expired API key"
}
```

---

## Pagination

All list endpoints accept `page` and `limit` query parameters.

| Parameter | Default | Range | Description             |
| --------- | ------- | ----- | ----------------------- |
| `page`    | `1`     | ≥ 1   | Page number to retrieve |
| `limit`   | `20`    | 1–100 | Items per page          |

Paginated responses always include:

```json
{
  "items": [...],
  "total": 150,
  "page": 2,
  "limit": 20
}
```

---

## Common Error Responses

| Status | Code                 | Description                         |
| ------ | -------------------- | ----------------------------------- |
| `400`  | `VALIDATION_ERROR`   | Invalid parameter value             |
| `401`  | —                    | Invalid or expired API key          |
| `402`  | `SUBSCRIPTION_LIMIT` | Plan limit reached                  |
| `403`  | —                    | Resource not found or access denied |
| `404`  | —                    | Resource not found                  |
| `422`  | —                    | Unprocessable entity                |
| `500`  | `INTERNAL_ERROR`     | Unexpected server error             |
