---
title: Schedules
description: See every workflow that runs on a schedule, its next run time, and enable or disable it from one list.
parent: Workflows
nav_order: 11
---

# Schedules

The **Schedules** page lists every workflow whose trigger is a schedule, so you can check what's coming up and turn runs on or off without opening each workflow.

Open it from **Schedules** in the left sidebar (`/schedules`).

---

## What You See

| Column | Description |
|--------|-------------|
| **Status** | **Enabled** or **Disabled** — whether the schedule is currently active. |
| **Workflow Name** | The workflow the schedule belongs to. |
| **Schedule** | The cron expression driving the schedule, shown in monospace. Hover it for a plain-language description (for example "Every 15 minutes", "At 09:00 every day") when puq.ai can describe the pattern; otherwise the raw cron expression is shown. |
| **Time Zone** | The time zone the schedule evaluates in. |
| **Next Run** | The next scheduled run's date and time, plus a relative countdown (for example "in 2 hours"). Shows **Expired** if the calculated next run is already in the past. |

A workflow only appears here if it has a schedule trigger configured — the schedule itself (cron expression and time zone) is set on that trigger step inside the workflow editor, not from this page.

---

## Filtering

Use the **Filter by status** dropdown to show **All Statuses**, **Enabled**, or **Disabled** schedules only. Click **Clear Filter** to reset it.

---

## Actions

Each row has a menu with:

- **Edit Workflow** — opens the workflow in the builder.
- **View Executions** — opens [Execution History](/executions/execution-history/) filtered to that workflow.
- **Enable** / **Disable** — toggles the workflow's status directly from the list (the label and icon switch depending on the current state). This is the same status shown on the Workflows list — disabling it here stops the schedule from triggering new runs.

---

## Empty State

If no workflow has a schedule configured yet, the page shows a prompt to configure a schedule in a workflow's settings.
