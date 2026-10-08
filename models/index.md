---
title: AI Models
description: Browse puq.ai's model catalog, compare pricing, and try any model in the browser playground before using it from your workflows or the API.
nav_order: 4.8
---

# AI Models

The **AI Models** page is puq.ai's catalog of every model available through the platform. Use it to see what each model does, compare prices in the same billing unit, copy a model's ID, and try it live in a built-in playground — all without writing code.

Open it from the sidebar (**All Models**) at `/router/models`.

---

## Browsing the Catalog

The catalog toolbar lets you narrow down and sort the list:

- **Search** — matches a model's name, description, ID, author, task type, and tags.
- **Author** — filter by the model's provider (for example OpenAI, Anthropic). The picker is searchable and shows how many models match each author.
- **Price** — filter by billing unit (see [Pricing](#pricing) below), by input or output rate, and by a min/max price range. Prices only compare within the same billing unit, so the filter narrows to one unit at a time.
- **Sort** — Newest first, Name (A–Z/Z–A), Input/Output price (low↔high), or Largest/Smallest context window.
- **View** — switch between **Card view** and **Table view** (table view is available on wider screens only).
- **Type tabs** — a row of tabs under the toolbar filters by task type: Text generation, Image generation, Video generation, Image to video, Text to speech, Speech to text, Music generation, Decisions, and Uncategorized. Each tab shows a live count.

Filters, sort, and view are kept in the page URL, so a filtered link can be shared or bookmarked. The list paginates 50 models per page.

Each card or row shows the model's icon, name, author, task type, a short description, its price (see below), its context window (for text models), and its model ID with a **Copy ID** button — the ID you pass as `model` in API calls.

---

## Model Details Page

Click a model to open its details page. The header shows the model's icon, name, author, task badge, description, and a few facts: **Context window** (if applicable), **Request body** format (JSON or multipart), **Last updated**, **Documentation** link (if the provider publishes one), and capability tags (for example *Tool calling*).

A side panel shows the model's **ID** (with **Copy**) and its **Pricing**, and a **Try in playground** button that jumps straight to the Playground tab.

The page has three tabs:

### Overview

Shows a worked example when the model has one: an example **Request** (copyable cURL snippet) next to its **Response**. The response is rendered as a **Preview** — images in a gallery, audio with a waveform player, video with a player, text as rendered Markdown, or a structured view for Decisions models — with a **Raw JSON** tab alongside it for the unprocessed response body. If no example is provided, the tab tells you to try the playground instead.

### API reference

Lists the model's documented **Input** and **Output** fields (segmented tabs, each showing a field count). Some models define multiple request/response shapes (**Variants**, for example different endpoints or modes) — pick a variant to see its fields. This tab only appears when the model has documented fields.

{: .note }
This page documents the app experience only. For the HTTP request/response format itself, see the [API documentation](/api/).

### Playground

Lets you run the model directly from your browser using one of your own API keys:

- **API key** — the field is pre-filled with your most recently created key if you have one; otherwise paste a key or click **Create key** to generate one without leaving the page.
- **Variant** — if the model has more than one input shape, pick which one to run.
- **Input fields** — generated from the model's schema. Required fields with no default (and any field the example fills in) appear first under **Input**; everything else is grouped under a collapsible **Settings** section. Object/array fields are edited as JSON and validated before you can run.
- **Run** — sends the request (`Ctrl`/`Cmd`+`Enter` also works) and shows a live elapsed timer, then the response status and timing.
- **Output** — a **Preview** tab renders the result (image gallery with full-size zoom, waveform audio player, video player, rendered Markdown with GitHub-flavored formatting and LaTeX math, or the structured Decisions view) alongside a **Raw** tab with the full JSON response. If the request fails, the status and error message from the API are shown instead.

{: .warning }
**Playground runs are real API requests**, sent straight to puq.ai's public API with your API key — the same request your code would make. They are metered and billed to your account exactly like any other API call; nothing about playground usage is free or simulated.

---

## Pricing

Prices are shown per **billing unit**, and a model is always priced in exactly one unit:

| Unit | Shown as |
|---|---|
| Tokens | per 1M tokens |
| Image | per image |
| Megapixel | per megapixel |
| Tile / tile step | per tile / per tile step |
| Second | per second of video |
| Character | per 1K characters |
| Minute | per minute of audio |
| Request | per request |

Models with separate input/output rates (most text models) show both; single-rate models (most image, audio, and video models) show one price labeled with its unit. A video model with per-resolution tiers shows its cheapest tier prefixed with "from." A price of **$0.00** displays as **Free**; pricing not yet configured for a model shows **Pricing isn't listed for this model yet.**

Because prices only compare meaningfully within the same unit, the price filter and the price-based sort options always operate within one billing unit at a time.

---

## Decisions Models

Models of type **Decisions** return structured answers instead of free text. Their output (in the Overview example, the playground preview, or the model card) is rendered per answer as a probability, a chosen option with confidence, or a score with ranked options — plus the token usage for that call — rather than as plain text or an image.

---

## Best Practices

- Filter by **Price** before comparing models with different billing units — a raw sort mixes per-token and per-image prices, which aren't comparable.
- Use **Copy ID** on a card, or the model page, to get the exact string to pass as `model` in your code.
- Try a model in the **Playground** before wiring it into a workflow or integration, so you can see its real output shape and timing first.
- Remember playground runs spend from the same balance as your production API usage.
