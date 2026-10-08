---
title: Variables
description: Store reusable values — global or scoped to a single workflow — and reference them from any step.
parent: Workflows
nav_order: 10
---

# Variables

Variables store a reusable value — an API key, a default email address, a feature flag — so you don't have to retype or hardcode it in every step. A variable can be **Global** (available to every workflow) or scoped to a single **Workflow**.

---

## Where to Manage Variables

- **Global Variables** — click **Global Variables** in the left sidebar (`/variables`). Only global variables are shown here.
- **Workflow Variables** — open a workflow's **Variables** page (`/workflows/:id/variables`). It shows three tabs: **All**, **Global Variables**, and **Workflow**, so you can see and manage both scopes for that workflow in one place.
- **In the builder** — the **Variables** panel in the workflow editor's sidebar lists the same variables (workflow-scoped first, then global), with search and a type filter, for quick reference while building.

---

## Fields

| Field | Description |
|-------|-------------|
| **Name** | Uppercased automatically (for example `API_KEY`). Must be unique within its scope. |
| **Type** | `String`, `Number`, `Boolean`, or `JSON`. JSON values must be a valid object or array — not a primitive. |
| **Value** | The stored value. For JSON, use the JSON editor; for Boolean, a true/false dropdown. |
| **Description** | Optional free text shown in the table. |
| **Sensitive** | When on, the value is masked as `***HIDDEN***` everywhere it's displayed or returned by the API after saving. When editing a sensitive variable, leave the value field empty to keep the current value. |
| **Status** | `Active` or `Inactive` (edit only). This is a label for your own organization — an inactive variable is still resolved and usable in workflow runs. |
| **Scope** | `Global` or `Workflow`, shown as a badge. Scope is fixed at creation — create it from the Global Variables page for a global variable, or from a workflow's Variables page for a workflow-scoped one. |

---

## Referencing a Variable in a Step

Map or type a variable into any input field using:

```
{% raw %}{{variables.VARIABLE_NAME}}{% endraw %}
```

For a JSON-type variable, use bracket or dot notation to reach a nested value, the same as referencing a previous step's output — for example `{% raw %}{{variables.CONFIG['retries']}}{% endraw %}`.

If no variable with that name exists for the run, the placeholder resolves to `null`.

### Global vs. Workflow Scope

If a workflow has its own variable with the **same name** as a global variable, the workflow-scoped value is used during that workflow's runs — it takes priority over the global one.

---

## Searching and Filtering

- The management pages (`/variables` and `/workflows/:id/variables`) list every variable in a table with Name, Description, Type, Scope, Sensitive, Status, Created, and Updated columns.
- The in-builder **Variables** panel has a search box (matches name or description) and a type filter (String / Number / Boolean / JSON), both client-side.
- The underlying list also supports server-side filtering by type, status, and sensitivity, and sorting by name, type, scope, or date — available wherever the app exposes those controls.

---

## Deleting a Variable

Deleting a variable is a soft delete — it's removed from every list and can no longer be referenced. Any step still mapping `{% raw %}{{variables.NAME}}{% endraw %}` for a deleted variable resolves to `null` on its next run.
