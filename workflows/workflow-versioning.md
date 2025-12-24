---
title: Workflow Versioning
description: Manage and track workflow versions created during publishing.
parent: Workflows
nav_order: 6
---

# Workflow Versioning

puq.ai uses an **automatic versioning system** that creates new workflow versions when meaningful changes are published.  
This allows you to track the evolution of a workflow over time while keeping execution behavior predictable and safe.

Versioning is tightly coupled with the **Save** and **Publish** process.

---

## How Versioning Works

Versioning happens during **Publish**.

The general workflow is:

1. Make changes to your workflow  
2. Click **Save** (optional)  
3. Click **Publish**  

Important behaviors to understand:

- Publishing **automatically saves** your changes  
- Not every publish creates a new version  
- Versions are created only when changes exist  

---

## When Is a New Version Created?

A **new version is automatically created** when:

- You make changes to the workflow  
- Then click **Publish**  

In this case:
- The workflow is published
- A **new version entry** appears in the Versions panel
- That version becomes the **latest version**
- If the workflow is enabled, this version is immediately used for executions

There is **no manual option** to choose between “current” or “new” version anymore.

---

## When Is a New Version *Not* Created?

A new version is **not created** when:

- You click **Publish**  
- But **no changes** were made since the last publish  

In this case:
- The workflow is marked as **Published**
- The previously published version remains active
- No additional version entry is added to the version history

This prevents unnecessary version clutter.

---

## Save vs Publish

Understanding the difference is critical:

### Save
- Stores your current changes locally
- Does **not** affect executions
- Does **not** create a version
- Workflow continues running the last published version

### Publish
- Automatically saves the workflow
- Marks the workflow as published
- Creates a new version **only if changes exist**
- Updates the version used by enabled workflows

---

## Enabled Workflows and Active Versions

When a workflow is **enabled**:

- The **latest published version** is always used
- You do not need to select a version manually
- Publishing new changes immediately updates the running version

Scenarios:

- Workflow enabled → publish changes → new version created → executions use it
- Workflow enabled → publish without changes → same version continues running
- Workflow disabled → publish → version updated, but no executions run

---

## Version History

The **Versions Panel** displays:

- All created versions
- Version order (newest to oldest)
- Timestamps
- Commit messages (if provided)
- Which version is currently published

You can click any version to:
- View its configuration
- Inspect historical logic
- Understand how the workflow evolved

---

## Rolling Back to a Previous Version

Rollback is done by **republishing an older version**.

Steps:

1. Open the **Versions Panel**
2. Select a previous version
3. Click **Publish**

What happens:
- That version becomes the latest published version
- If the workflow is enabled, executions immediately use it
- No data is lost
- Existing versions remain in history

Rollback does not delete newer versions.

---

## Commit Messages

Each time a new version is created, you can add a **commit message**.

Commit messages help you:
- Describe what changed
- Track why a version exists
- Identify important updates quickly
- Collaborate with teammates

Examples:
- “Add Slack notification”
- “Fix payload mapping”
- “Optimize API request”
- “Initial production version”

---

## Key Takeaways

- Versioning is automatic
- New versions are created only when changes exist
- Publishing always saves
- Enabled workflows always run the latest published version
- Publishing without changes does not create a new version
- Rollback is done by republishing an older version

---

## Summary

puq.ai’s workflow versioning is designed to be simple, safe, and predictable.  
You focus on building and publishing — puq.ai handles version tracking automatically.

This ensures:
- Clean version history
- No accidental overwrites
- Safe production updates
- Easy rollback when needed