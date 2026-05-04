---
title: Workflows
description: "Manage workflows programmatically: list, fetch details, toggle status, and publish versions."
parent: API
nav_order: 3
has_toc: true
---

# Workflows

Manage your workflows programmatically: list them, fetch details, toggle status, and publish new versions.

See [Common Concepts](common) for authentication, pagination, and error responses.

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

| Parameter | Location | Type   | Description  |
| --------- | -------- | ------ | ------------ |
| `id`      | path     | string | Workflow UID |

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

| Parameter | Location | Type   | Description                 |
| --------- | -------- | ------ | --------------------------- |
| `id`      | path     | string | Workflow UID                |
| `status`  | body     | string | `"enabled"` or `"disabled"` |

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

| Parameter        | Location | Type   | Required | Description                             |
| ---------------- | -------- | ------ | -------- | --------------------------------------- |
| `workflow_id`    | path     | string | Yes      | Workflow UID                            |
| `version_id`     | body     | string | Yes      | Version UID to publish                  |
| `commit_message` | body     | string | No       | Optional commit message (max 500 chars) |

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

| Parameter     | Location | Type   | Default | Description              |
| ------------- | -------- | ------ | ------- | ------------------------ |
| `workflow_id` | path     | string | —       | Workflow UID             |
| `page`        | query    | number | `1`     | Page number              |
| `limit`       | query    | number | `20`    | Items per page (max 100) |

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

| Parameter    | Location | Type   | Description |
| ------------ | -------- | ------ | ----------- |
| `version_id` | path     | string | Version UID |

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
