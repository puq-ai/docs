---
title: API Overview
description: Base URL, authentication, model naming, and key concepts for the puq.ai API.
parent: API
nav_order: 1
---

# API Overview

The puq.ai API acts as a Model Router, providing unified access to AI models from multiple providers through a single endpoint.

---

## Base URL

```
https://api.puq.ai
```

All endpoints are relative to this base URL.

---

## Authentication

Include your API key in the `Authorization` header of every request. Format:

```
Authorization: Token <api_key>
```

API keys grant access based on the models assigned to them.

---

## Model Naming Convention

Models always use the format `provider/model_name`. For example:

- `openai/gpt-4o`
- `openai/gpt-4o-mini`

Use the [GET /router/models](endpoints#list-available-models) endpoint to see all available models.

---

## Balance Requirement

All endpoints check your account balance before processing a request. If your balance is **0 or below**, the API returns:

```
HTTP 402 Payment Required
```

Key management endpoints (`/keys`) are not balance-gated.

---

## API Key Lifecycle

- API keys **do not expire** as long as their status is active (`status=1`).
- Keys can be created, listed, and deleted via the [API](generating-api-tokens#managing-api-keys-via-the-api) or the dashboard.
- Each API key can be configured with specific model permissions.
