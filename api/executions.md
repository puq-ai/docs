---
title: Executions
description: List and inspect workflow execution history including per-step breakdown.
parent: API
nav_order: 4
has_toc: true
---

# Executions

List and inspect execution history, including per-step breakdown.

See [Common Concepts](common) for authentication, pagination, and error responses.

---

## GET /v1/executions

List all workflow runs with optional filtering and pagination.

### Request

| Parameter     | Type   | Default | Description                                                                                    |
| ------------- | ------ | ------- | ---------------------------------------------------------------------------------------------- |
| `page`        | number | `1`     | Page number                                                                                    |
| `limit`       | number | `20`    | Items per page (max 100)                                                                       |
| `workflow_id` | string | —       | Filter by workflow UID                                                                         |
| `status`      | string | `all`   | Filter by status: `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `PAUSED`, or `all` |

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

| Parameter | Location | Type   | Description |
| --------- | -------- | ------ | ----------- |
| `id`      | path     | string | Run UID     |

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
