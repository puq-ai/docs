---
title: API
description: Introduction to puq.ai API usage.
nav_order: 5
has_children: true
has_toc: true
---

# API

The puq.ai API provides access to AI models, audio processing, and image generation through a unified Model Router. You can manage your API keys and interact with various AI providers using a single base URL.

- [API Overview](overview) -- Base URL, authentication, and key concepts
- [Authentication](generating-api-tokens) -- Create and manage API keys
- [API Endpoints](endpoints) -- Full endpoint reference with examples

---

# External API

The puq.ai External API (`/v1`) lets you manage workflows, inspect run history, check credit balance, and list available AI models — all from your own code or CI/CD pipelines.

**Base URL:** `https://api.puq.ai/v1`

---

## Authentication

All `/v1` endpoints require an API key passed in the `Token` header.

```bash
curl https://api.puq.ai/v1/workflows \
  -H "Token: your-api-key-here"
```

Generate API keys via the `/keys` endpoint (requires JWT authentication) or through the dashboard under **Account Settings → API Tokens**.

**Error (401 Unauthorized):**

```json
{
  "error": "Unauthorized: Invalid or expired API key"
}
```

---

## Pagination

All list endpoints accept `page` and `limit` query parameters.

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| `page` | `1` | ≥ 1 | Page number to retrieve |
| `limit` | `20` | 1–100 | Items per page |

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

| Status | Code | Description |
|--------|------|-------------|
| `400` | `VALIDATION_ERROR` | Invalid parameter value |
| `401` | — | Invalid or expired API key |
| `402` | `SUBSCRIPTION_LIMIT` | Plan limit reached |
| `403` | — | Resource not found or access denied |
| `404` | — | Resource not found |
| `422` | — | Unprocessable entity |
| `500` | `INTERNAL_ERROR` | Unexpected server error |

---

# Workflows

Manage your workflows programmatically: list them, fetch details, toggle status, and publish new versions.

---

## GET /v1/workflows

List all workflows for the authenticated user.

### Request

No query parameters.

```bash
curl -X GET "https://api.puq.ai/v1/workflows" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface WorkflowMetadata {
  id: string;           // Workflow UID
  name: string;
  description: string | null;
  webhook_url: string;  // Full webhook URL
  created_at: string;   // ISO 8601
  updated_at: string;   // ISO 8601
}

type ListWorkflowsResponse = WorkflowMetadata[];
```

**Success (200):**

```json
[
  {
    "id": "workflow_abc123",
    "name": "My First Workflow",
    "description": "Process customer orders",
    "webhook_url": "https://api.puq.ai/h/wf_abc123",
    "created_at": "2025-01-04T09:00:00Z",
    "updated_at": "2025-01-04T10:30:00Z"
  }
]
```

---

## GET /v1/workflows/{id}

Get full details for a specific workflow.

### Request

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | path | string | Workflow UID |

```bash
curl -X GET "https://api.puq.ai/v1/workflows/workflow_abc123" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface WorkflowDetails {
  id: string;
  active_version_id: string | null;
  webhook_url: string;
  name: string;
  description: string | null;
  metadata: string | null;
  schedule_options: string | null;
  next_run_at: string | null;
  status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string;
}
```

**Success (200):**

```json
{
  "id": "workflow_abc123",
  "active_version_id": "version_xyz456",
  "webhook_url": "https://api.puq.ai/h/wf_abc123",
  "name": "My First Workflow",
  "description": "Process customer orders",
  "metadata": null,
  "schedule_options": null,
  "next_run_at": null,
  "status": "enabled",
  "created_at": "2025-01-04T09:00:00Z",
  "updated_at": "2025-01-04T10:30:00Z"
}
```

**Error (404):**

```json
{ "error": "Workflow not found or access denied" }
```

---

## POST /v1/workflows/{id}/status

Enable or disable a workflow.

### Request

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | path | string | Workflow UID |
| `status` | body | string | `"enabled"` or `"disabled"` |

```bash
curl -X PATCH "https://api.puq.ai/v1/workflows/workflow_abc123/status" \
  -H "Token: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{ "status": "enabled" }'
```

### Response

```typescript
interface UpdateWorkflowStatusResponse {
  message: string;
  workflow_id: string;
  status: 'enabled' | 'disabled';
}
```

**Success (200):**

```json
{
  "message": "Workflow status updated successfully",
  "workflow_id": "workflow_abc123",
  "status": "enabled"
}
```

**Error (400):**

```json
{
  "error": "Invalid status parameter. Must be either 'enabled' or 'disabled'",
  "code": "VALIDATION_ERROR"
}
```

**Error (404):**

```json
{ "error": "Workflow not found or access denied" }
```

---

## POST /v1/workflows/{workflow_id}/publish

Publish a specific version as the active version for a workflow.

### Request

| Parameter | Location | Type | Required | Description |
|-----------|----------|------|----------|-------------|
| `workflow_id` | path | string | Yes | Workflow UID |
| `version_id` | body | string | Yes | Version UID to publish |
| `commit_message` | body | string | No | Optional commit message (max 500 chars) |

```bash
curl -X POST "https://api.puq.ai/v1/workflows/workflow_abc123/publish" \
  -H "Token: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "version_id": "version_xyz456",
    "commit_message": "Fixed email formatting issue"
  }'
```

### Response

```typescript
interface PublishWorkflowVersionResponse {
  message: string;
  workflow_id: string;
  version_id: string;
}
```

**Success (200):**

```json
{
  "message": "Workflow version published successfully",
  "workflow_id": "workflow_abc123",
  "version_id": "version_xyz456"
}
```

**Error (402 — plan limit):**

```json
{
  "error": "You have reached the maximum number of workflows allowed by your plan.",
  "code": "SUBSCRIPTION_LIMIT",
  "details": {
    "workflow_limit": 10,
    "current_workflows": 10
  }
}
```

**Error (404):**

```json
{ "error": "Workflow not found or access denied" }
```

**Error (422):**

```json
{ "error": "Version not found or does not belong to this workflow" }
```

---

## GET /v1/workflows/{workflow_id}/versions

List all versions for a specific workflow.

### Request

| Parameter | Location | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `workflow_id` | path | string | — | Workflow UID |
| `page` | query | number | `1` | Page number |
| `limit` | query | number | `20` | Items per page (max 100) |

```bash
curl -X GET "https://api.puq.ai/v1/workflows/workflow_abc123/versions?page=1&limit=20" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface WorkflowVersion {
  id: string;           // Version UID
  display_name: string;
  revision: number;
  state: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

interface ListWorkflowVersionsResponse {
  items: WorkflowVersion[];
  total: number;
  page: number;
  limit: number;
}
```

**Success (200):**

```json
{
  "items": [
    {
      "id": "version_xyz789",
      "display_name": "Feature Addition",
      "revision": 2,
      "state": "published",
      "created_at": "2025-01-04T11:00:00Z",
      "updated_at": "2025-01-04T11:00:00Z"
    },
    {
      "id": "version_xyz456",
      "display_name": "Initial Version",
      "revision": 1,
      "state": "published",
      "created_at": "2025-01-04T10:30:00Z",
      "updated_at": "2025-01-04T10:30:00Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 20
}
```

**Error (404):**

```json
{ "error": "Workflow not found or access denied" }
```

---

## GET /v1/workflows/versions/{version_id}

Get detailed information about a specific workflow version.

### Request

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `version_id` | path | string | Version UID |

```bash
curl -X GET "https://api.puq.ai/v1/workflows/versions/version_xyz456" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface VersionDetails {
  id: string;
  display_name: string;
  revision: number;
  state: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  parent?: {
    id: string;
    uid: string;
    display_name: string;
    revision: number;
    state: string;
    created_at: string;
  };
  commit_message?: string | null;
}

interface GetWorkflowVersionResponse {
  version: VersionDetails;
}
```

**Success (200):**

```json
{
  "version": {
    "id": "version_xyz456",
    "display_name": "Initial Version",
    "revision": 1,
    "state": "published",
    "created_at": "2025-01-04T10:30:00Z",
    "updated_at": "2025-01-04T10:30:00Z",
    "parent": null,
    "commit_message": "Initial commit"
  }
}
```

**Error (404):**

```json
{ "error": "Workflow version not found or does not belong to this workflow" }
```

---

# Executions

List and inspect execution history, including per-step breakdown.

---

## GET /v1/executions

List all workflow runs with optional filtering and pagination.

### Request

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Items per page (max 100) |
| `workflow_id` | string | — | Filter by workflow UID |
| `status` | string | `all` | Filter by status: `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `PAUSED`, or `all` |

```bash
# All runs
curl -X GET "https://api.puq.ai/v1/executions" \
  -H "Token: your-api-key-here"

# Filter by workflow
curl -X GET "https://api.puq.ai/v1/executions?workflow_id=workflow_abc123" \
  -H "Token: your-api-key-here"

# Filter by status
curl -X GET "https://api.puq.ai/v1/executions?status=SUCCEEDED" \
  -H "Token: your-api-key-here"

# Paginated
curl -X GET "https://api.puq.ai/v1/executions?page=2&limit=50" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface WorkflowRunMetadata {
  id: string;                   // Run UID
  workflow_id: string;
  version_id: string;
  version_display_name: string;
  type: string;                 // e.g. TEST, WEBHOOK_ASYNC, WEBHOOK_SYNC
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'PAUSED';
  duration: number | null;      // Execution duration in seconds
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

interface ListWorkflowRunsResponse {
  items: WorkflowRunMetadata[];
  total: number;
  succeeded: number;
  failed: number;
  page: number;
  limit: number;
}
```

**Success (200):**

```json
{
  "items": [
    {
      "id": "run_def456",
      "workflow_id": "workflow_abc123",
      "version_id": "version_xyz456",
      "version_display_name": "Initial Version",
      "type": "WEBHOOK_ASYNC",
      "status": "SUCCEEDED",
      "duration": 15.5,
      "created_at": "2025-01-04T12:00:00Z",
      "started_at": "2025-01-04T12:00:05Z",
      "finished_at": "2025-01-04T12:00:20Z"
    }
  ],
  "total": 250,
  "succeeded": 200,
  "failed": 30,
  "page": 1,
  "limit": 20
}
```

**Error (401):**

```json
{ "error": "Unauthorized: Invalid or expired API key" }
```

---

## GET /v1/executions/{id}

Get detailed information about a single execution, including all step executions.

### Request

| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| `id` | path | string | Run UID |

```bash
curl -X GET "https://api.puq.ai/v1/executions/run_def456" \
  -H "Token: your-api-key-here"
```

### Response

```typescript
interface StepExecution {
  id: string;           // Step execution UID
  step_name: string;
  step_type: string;    // 'TRIGGER' | 'PIECE'
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  attempt: number;      // Retry attempt number
  error: string | null;
  duration: number;     // Step duration in seconds
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

interface WorkflowRunDetail {
  id: string;
  workflow_id: string;
  version_id: string;
  version_display_name: string;
  type: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'PAUSED';
  duration: number | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  steps: StepExecution[];
  step_count: number;
}
```

**Success (200):**

```json
{
  "id": "run_def456",
  "workflow_id": "workflow_abc123",
  "version_id": "version_xyz456",
  "version_display_name": "Initial Version",
  "type": "WEBHOOK_ASYNC",
  "status": "SUCCEEDED",
  "duration": 15.5,
  "created_at": "2025-01-04T12:00:00Z",
  "started_at": "2025-01-04T12:00:05Z",
  "finished_at": "2025-01-04T12:00:20Z",
  "steps": [
    {
      "id": "step_exec_123",
      "step_name": "manual_trigger",
      "step_type": "TRIGGER",
      "status": "SUCCEEDED",
      "attempt": 1,
      "error": null,
      "duration": 0.5,
      "created_at": "2025-01-04T12:00:05Z",
      "started_at": "2025-01-04T12:00:05Z",
      "finished_at": "2025-01-04T12:00:06Z"
    },
    {
      "id": "step_exec_124",
      "step_name": "send_email",
      "step_type": "PIECE",
      "status": "SUCCEEDED",
      "attempt": 1,
      "error": null,
      "duration": 1.2,
      "created_at": "2025-01-04T12:00:06Z",
      "started_at": "2025-01-04T12:00:06Z",
      "finished_at": "2025-01-04T12:00:07Z"
    }
  ],
  "step_count": 2
}
```

**Error (404):**

```json
{ "error": "Execution not found or access denied" }
```

---

# Credits & Models

---

## GET /v1/credits/balance

Get the current credit balance for the authenticated user.

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

---

## GET /v1/models

List all available AI models grouped by provider.

### Request

| Parameter | Type | Description |
|-----------|------|-------------|
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
