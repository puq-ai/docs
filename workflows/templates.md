---
title: Templates
description: Browse workflow templates by category, preview what they do, create a workflow from one, and publish your own workflow as a template.
parent: Workflows
nav_order: 7
---

# Templates

A **Template** is a saved copy of a workflow's structure — its trigger, steps, and canvas layout — that you can copy into a brand-new workflow with one click. Templates never carry connections or credentials: those are removed when a template is created, so you reconnect accounts in the new workflow yourself.

---

## Browsing Templates

Open **Templates** from the sidebar (`puq.ai/templates`). The page has two tabs:

- **Browse Templates** — public templates anyone signed in can use.
- **My Templates** — templates you've published yourself (see [Publishing Your Own Template](#publishing-your-own-template)).

On either tab you can:
- Search by title or description.
- Filter by category: All, Automation, Data Processing, Communication, Marketing, Development, Productivity, E-Commerce, Analytics, Social Media, Other.
- Click **Discover More** to load further results without losing your place.

Each card shows the category, title, description, the logos of the components the workflow uses, and its step count. In **My Templates**, hover a card to reveal a **Delete** button.

---

## Template Detail

Click a card to open the template. The left panel shows:
- Title and creator — puq.ai's own templates show a **Verified** badge; otherwise the creator's name.
- **Try It** and **Share** (copies the page's link) buttons.
- An **Overview** description, **Tags**, and **Used Components**.
- **Steps**, **Used** (how many times the template has been turned into a workflow), and **Category**.

The right panel shows a read-only preview of the workflow's canvas — you can pan and zoom, but nothing can be run or edited from here.

---

## Using a Template

1. Open a template and click **Try It**.
2. Confirm **Create Workflow** in the dialog.
3. puq.ai creates a new workflow — prefilled with the template's name and description — and opens it directly in the Workflow Editor.

What carries over:
- Every trigger and step, their settings, and the canvas layout.

What doesn't:
- **Connections.** puq.ai strips API keys and OAuth connections from a template when it's created, so every step that needs an account (Slack, Gmail, Stripe, and so on) arrives without one. Open each of those steps and connect an account — see [Connections](/connections/add-connection/) — before you save and [publish](/workflows/publishing-flows/) the workflow.

The new workflow starts like any other new workflow: disabled and unpublished until you publish and enable it yourself. Using a template doesn't change the original — it stays available for others, and its **Used** count goes up by one.

---

## Template Preview

Public templates also have a dedicated, read-only preview at `puq.ai/template-preview/<id>` that shows just the workflow canvas, full-screen, without the app's sidebar — no account required. It's meant for sharing or embedding a template's structure outside of puq.ai.

---

## Publishing Your Own Template

From the Visual Builder:

1. Open your workflow, click the **⋯** (Workflow actions) menu, then **Create Template**.
2. Fill in **Title** (required), **Description**, **Category** (Automation, Data Processing, Communication, Marketing, Development, Productivity, E-commerce, Analytics, Social Media, Finance, Other), and up to 10 **Tags**.
3. Click **Create Template**. puq.ai saves a template from the workflow's current saved configuration, with connections stripped the same way as in [Using a Template](#using-a-template).

{: .note }
New templates are saved privately to **My Templates**. They don't automatically appear in the public **Browse Templates** catalog — that list only shows templates puq.ai has made public.

### Managing Your Templates
**My Templates** lists everything you've created; open a card to view or try it like any other template. There's no way to edit a template's title, description, category, or tags after it's created — **Delete** it (hover the card, click the trash icon, confirm) and publish a new one if you need to change those.

---

## Best Practices

- Test and save the workflow the way you want it before turning it into a template — a template is a snapshot, not a link back to the original workflow.
- Use a clear title and an accurate category and tags; they're the only way others can find your template in Browse Templates.
- After using a template, reconnect every account it needs before publishing the new workflow — an unpublished workflow can't run even if every step looks configured.
