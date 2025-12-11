---
title: Workflow Versioning
description: Manage and roll back versions of your workflows safely.
parent: Workflows
nav_order: 6
---

# Workflow Versioning

puq.ai includes a full versioning system that allows you to safely manage, branch, compare, and roll back workflow changes.  
Every time you publish a workflow, you decide whether to **update the current version** or **create a brand-new version**.

This gives you complete control over your automation history and allows you to experiment without breaking production.

---

# How Versioning Works

Versioning only occurs when you **Publish** a workflow.

The process:

1. Make changes  
2. Click **Save**  
3. Click **Publish**  
4. Choose **how** the new version should be created  

During publishing, you see two options:

## 1. Update Current Version
Updates the existing version in-place.  
- Version number does **not** change  
- The branch stays the same  
- Good for small fixes  
- Keeps version tree clean

## 2. Create New Version
Creates a new version alongside the existing ones.  
- A *new version number* is created  
- A *new branch* appears under the version tree  
- You can switch between branches anytime  
- Perfect for experimenting, testing, or major changes

After choosing this, you add a **commit message**, which helps track what changed (e.g., *“add trigger”, “fix webhook”, “update mapping”*).

---

# Branch-Based Version Tree

Workflow versioning in puq.ai works similarly to Git-style branching.

Each published version belongs to a **branch**.

### Example:

- You start with **v1**  
- You publish with *Create New Version* → system creates **v1.1** under the same branch  
- You publish again → **v1.2**, **v1.3**, etc.

Each branch forms a linear timeline of changes.

![Workflow Versioning]({{ '/assets/images/workflows/workflow-versioning/000001.png' | relative_url }}){: width="360" }

### You can create parallel branches:

- From **v1**, you can branch off into a new version series  
- From **v1.1**, you can create a sibling branch  
- From **any version**, you can create a new branch and evolve it separately  

This allows **safe experimentation** while keeping production stable.

---

# Viewing and Switching Versions

The **Versions Panel** shows the full version tree.

You can:

- Click any version to **view** it  
- Switch branches instantly  
- Compare commit messages  
- See timestamps for when each version was created  
- Identify which version is currently **Published**, **Viewing**, or **Draft**

Published versions appear with a green **Published** badge.

---

# Rollback to Any Previous Version

Rollback is simple:

1. Open the **Versions Panel**  
2. Select an older version  
3. Click **Publish**  
4. Choose **Update Current Version** or **Create New Version**  

This lets you revert your workflow instantly if:

- A new integration breaks  
- A test fails  
- A recent change behaves unexpectedly  
- You want to return to a known stable state  

Rollback does *not* delete future versions — it simply activates whichever version you choose.

---

# Commit Messages

Each time you publish a new version, you are prompted to add a **Commit Message**.

Commit messages help you:

- Describe what changed  
- Track why you created this version  
- Understand the purpose of each update  
- Collaborate with team members more effectively  

Examples:
- “Add Slack notification”
- “Fix CRM contact mapping”
- “Optimize API calls”
- “New experiment branch”

![Workflow Versioning]({{ '/assets/images/workflows/workflow-versioning/000001.png' | relative_url }}){: width="360" }

![Workflow Versioning]({{ '/assets/images/workflows/workflow-versioning/000002.png' | relative_url }}){: width="360" }
---

# Practical Example

Let’s walk through a real example based on your screenshots:

### Scenario:
You modify a workflow and publish it.

1. You click **Publish**  
2. You choose **Create New Version**  
3. You add commit message: `test 2v`  
4. The system creates a new version under the version tree  
5. The version appears as **Published**  
6. Older versions (v1, v1.1, etc.) remain accessible  
7. You can now switch between **test111**, **test 2v**, and **v2** (all branches)

At any time, you can return to **v2** or **test111**, publish them, or continue building on top of them.

---

# Summary

puq.ai’s versioning system provides:

- Safe, Git-like branching  
- Explicit version publishing  
- Separate experiment and production versions  
- Easy rollback  
- Commit messages for tracking changes  
- Clear version tree visualization  
- Ability to switch between branches anytime  

Use versioning to confidently experiment, deploy, and maintain clean automation history.
