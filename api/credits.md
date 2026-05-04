---
title: Credits
description: Check current credit balance for your account.
parent: API
nav_order: 5
has_toc: true
---

# Credits

Check your account's current credit balance.

See [Common Concepts](common) for authentication and error responses.

---

## GET /v1/credits/balance

Get current credit balance for the authenticated user.

### Request

No parameters required.

```bash
curl -X GET "https://api.puq.ai/v1/credits/balance" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface GetCreditBalanceResponse {
  success: true;
  balance: number; // Current balance as float
}
```

**Success (200):**

```json
{
  "success": true,
  "balance": 1234.56
}
```

**Error (401):**

```json
{ "error": "Unauthorized: Invalid or expired API key" }
```
