---
title: Publishing Workflow Apps
description: Turn a published workflow into a Workflow App, manage its settings and connections, and archive it when you're done.
parent: Workflow Apps
nav_order: 2
---

# Publishing Workflow Apps

Publishing turns one of your workflows into a Workflow App — a page at `puq.ai/apps/<slug>` with its own input form, connection setup, and result view.

{: .note }
Apps you create this way are private: only you can open or run them, from **My Apps** or the App's own address. The public **Browse Apps** catalog only lists Apps published by the puq.ai team — there's currently no option to submit yours to it.

---

## Before You Start

The **Create App** option (in the Visual Builder's **⋯** menu) is disabled until:

- The workflow has a **Published** version. Otherwise puq.ai shows "Publish this workflow version first" — see [Publishing Flows](/workflows/publishing-flows/).
- There are no unsaved or unpublished changes. Otherwise: "Publish or discard the current workflow changes first."
- At least one step has been run with Live Testing, so puq.ai has sample output to build the App from — see [Building Flows](/workflows/building-flows/) and [Debugging Executions](/workflows/debugging-executions/).

---

## Creating an App

1. Open the workflow in the Visual Builder.
2. Click the **⋯** (Workflow actions) menu in the toolbar, then **Create App**.
3. Complete the wizard:

### Step 1 — App Details
Title, Slug (the App's address becomes `puq.ai/apps/<slug>`; puq.ai adjusts it if that slug is already taken), Category, Tags, and Description.

### Step 2 — User Fields
puq.ai scans your tested workflow and automatically turns every trigger value your steps actually use into an input field — detected as Short text, Long text, Number, Yes / no, Selection, Multiple selection, Structured data, or File. You can edit each field's **Visible label** and **Description**; its technical path and type are locked, since changing them would break the workflow. If nothing in the workflow reads trigger data, puq.ai shows "No user fields are needed" and the App runs without asking for input.

### Step 3 — Output
Choose which already-tested step's output the App should return, optionally narrow it to one value with a JSON path, and set **Fixed credits per run** (0 by default — see [Credits and Pricing](#credits-and-pricing)).

### Step 4 — Connections
For every connection the workflow needs, choose whether:
- **you** provide it — your own account is used for every run, and the person running the App never sees this step for it, or
- **each runner** connects their own account before they can run the App.

This step is skipped if the workflow needs no connections.

4. The App is created and appears in **My Apps**.

---

## Credits and Pricing

- **Fixed credits per run** is the flat price, in puq.ai credits, charged the moment someone's run starts.
- At 0, runners see **No fixed App fee**, and the workflow's own usage (AI calls, external requests, and so on) is billed to them normally as **Workflow usage charged separately**.
- Above 0, runners see **Workflow usage included** — the fixed price is meant to cover what the workflow itself spends.

---

## Managing Your App

Open **My Apps** → the App → **Settings** (or the **Settings** button on the App's own page) to edit it after creation:

- **App details** — name, description, category, fixed credits per run, and up to 20 tags.
- **User inputs** — each field's visible name, description, examples, and default value. The technical key and type stay locked.
- **App output** — which tested step (and optional JSON path) the App returns, independent of the rest of the workflow.
- **Connections** — switch any requirement between your own connection and "ask each runner," choose which of your connections to use, and edit its visible title and description.

Changes apply immediately — there's no separate publish step. **Discard changes** reverts everything to what's saved; **Save changes** applies your edits.

{: .warning }
Changing an App's connections, output, or user fields takes effect for every run immediately, including for anyone who already has the App's link.

### Archiving an App
At the bottom of Settings, click **Archive App** and confirm. This immediately stops the App's address from working. Past runs stay in your Run History and aren't deleted, and archiving can't be undone from the app.

---

## Best Practices

- Test every step you plan to expose with Live Testing before creating the App — only tested steps are offered as the output or detected as input.
- Keep fixed credits at 0 unless you specifically want to charge a flat fee per run; workflow usage is billed to the runner either way.
- Prefer "each runner connects their own account" for connections tied to a specific person (a personal Gmail inbox, for example), and reserve your own account for shared services the App should always use the same way.
