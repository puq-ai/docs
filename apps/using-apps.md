---
title: Using Workflow Apps
description: Browse the Apps catalog, run a Workflow App, connect the accounts it needs, read the result, and review run history.
parent: Workflow Apps
nav_order: 1
---

# Using Workflow Apps

A Workflow App is a workflow published with a simple input form and result page. You don't need to understand the underlying workflow to use one — fill in the inputs, connect any accounts it asks for, and run it.

---

## Browsing Apps

Open **Apps** from the sidebar (`puq.ai/apps`). The page has two tabs:

- **Browse Apps** — the public catalog of Apps published by puq.ai. No account is needed to look around.
- **My Apps** — the Apps you've published yourself (see [Publishing Workflow Apps](/apps/publishing-apps/)). Only shown once you're signed in.

In Browse Apps you can:
- Search by title or description.
- Filter by **Category** — All categories, Automation, Data Processing, Communication, Marketing, Development, Productivity, E-Commerce, Analytics, Business, Social Media, Other.
- Filter by **Tags** (comma-separated) and click **Apply**.
- Click **Clear filters** to reset.

Each card shows the App's cover image, title, publisher, description, category, price, and whether workflow usage is included — see [Credits and Workflow Usage](#credits-and-workflow-usage). Click a card to open the App.

---

## The App Page

Every App page (`puq.ai/apps/<slug>`) has three tabs:

- **Playground** — run the App. Opens by default.
- **Overview** — pricing, version, total run count, an example result, and the full list of inputs and connections the App needs before you run it.
- **History** — your past runs of this App. Requires sign-in.

If you're signed in and own the App, a **Settings** button also appears — see [Managing Your App](/apps/publishing-apps/#managing-your-app).

---

## Running an App

### Fill In the Input

If the App needs information from you, it shows a form built from the fields its publisher defined:

| Field type | What you provide |
|---|---|
| Short text | A single line of text |
| Long text | Multiple lines of text |
| Number | A number, optionally within a minimum/maximum set by the publisher |
| Yes / no | A checkbox |
| Selection | One choice from a list |
| Multiple selection | One or more choices from a list |
| Structured data | A block of JSON |
| File | A file, by drag-and-drop or browsing — the publisher sets which types are accepted and the maximum size (up to 20 MB) |

Fields marked **Required** must be filled in; everything else is optional. If the App needs no input at all, puq.ai shows "This App does not need input before it starts" and you can run it right away.

You need to be signed in to run an App — if you're not, the button reads **Sign in to start**; it takes you to Login and brings you back to the same App afterward.

### Connect Any Accounts It Needs

If the workflow behind the App uses connected accounts (Slack, Gmail, Stripe, and so on), you'll see a **Connections** step after the input — one entry per account the App actually asks you for. Some connections are fixed by the App's publisher to their own account and are never shown to you here.

For each entry:
- Pick one of your existing compatible connections, shown as **Connected and ready**, or
- Click **Connect another `<Provider>` account** to add a new one — the same dialog used in [Connections](/connections/add-connection/) opens.
- Click **Reconnect** next to an account to re-authorize it without creating a duplicate — useful when a connection like Gmail needs you to sign in again, for example after an OAuth grant expires or is revoked.

A connection marked **Required** must be ready before you can continue; an optional one can be left unconnected. If puq.ai rejects your chosen connection when the run starts, you're brought back to this step with the reason, and that connection is marked unavailable until you pick a different one or reconnect it.

### Credits and Workflow Usage

Above the Run button, puq.ai shows two things:
- The **App price** — a flat number of credits charged once your run starts, or "No fixed App fee."
- Whether **workflow usage** (the AI calls, requests, and other work the workflow itself performs) is **included** in that price or **charged separately** as the workflow runs.

See [Billing](/account/billing/) for how your credit balance works.

### Run and Watch Progress

Click **Run App** (or **Continue** / **Next connection** while input and connections remain). The result panel shows live progress — Starting run, then Pending or Running — and a **Cancel run** button while it's in progress (see [Cancelling a Run](#cancelling-a-run)). If you leave the page and come back, an in-progress run picks up where it left off.

### Read the Result

When a run succeeds, you get:
- A **Preview** tab — the output formatted into readable sections, each with its own **Copy** button.
- A **JSON** tab — the same output as an expandable, copyable JSON tree.
- **Copy all**, **Run again**, and a **More** menu with **View raw JSON**, **Download Markdown**, and **Download JSON**.
- The run's created date, source (UI or API), version, duration, App price, and charge status.

---

## Run History

Open the **History** tab to see every past run of this App: what was sent, what came back, its status, and when it was created. Click a row to open the full run, including the exact input values and the complete result.

Only runs that actually started are recorded here. A run that never starts — for example because your balance was too low, see [If Your Balance Is Too Low](#if-your-balance-is-too-low) — is never added to History.

---

## Cancelling a Run

While a run is **Pending** or **Running**, click **Cancel run** in the Playground's result panel. puq.ai shows **Cancellation requested** while the current step finishes, then **Cancelled**. If the run already finished by the time your cancellation is processed, puq.ai simply shows you the finished result instead.

If the App charges a fixed price and you cancel before the run actually starts processing, that charge is refunded automatically.

From a cancelled or failed result, click **Run again** / **Try again** to start over from the input step.

---

## If Your Balance Is Too Low

If your puq.ai balance doesn't cover the App's fixed price, the run never starts. You immediately see **Run failed — Insufficient balance. Please top up your account.** with a **Try again** button.

Nothing is charged and no run is created, so it won't appear in Run History. [Top up your balance](/account/billing/) and click **Try again**.

---

## Best Practices

- Use **Reconnect** instead of adding a new account when an existing connection stops working — it keeps the App pointing at the same credential.
- Check the **Overview** tab before running an unfamiliar App to see exactly what input and connections it expects, and what a typical result looks like.
- If a run fails or is cancelled, use **Try again** / **Run again** rather than refilling the form from scratch — your last input stays in place.
