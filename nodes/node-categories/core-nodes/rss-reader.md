---
title: RSS Reader
description: Read and process RSS feed data inside your workflows using the RSS Reader node.
parent: Core Nodes
nav_order: 13
---

# RSS Reader

The **RSS Reader** node allows you to read and process data from an RSS feed URL.  
It is commonly used to monitor blogs, news sources, release feeds, or any system that publishes updates via RSS.

This node converts RSS feed items into structured data that can be used in downstream workflow steps.

---

## What the RSS Reader Does

The RSS Reader:
- Fetches data from an RSS feed URL
- Parses feed metadata and items
- Returns feed entries as structured output
- Allows filtering and limiting of returned items

It is ideal for building **event-driven content workflows**.

---

## Configuration Fields

### URL *
The URL of the RSS feed to read.

Examples:
- `https://blog.example.com/rss`
- `https://news.ycombinator.com/rss`
- `https://github.com/user/repo/releases.atom`

---

## Options

### Custom Fields
A comma-separated list of additional fields to include in the output.

Example:
```
author,contentSnippet
```

This allows you to enrich the output with extra RSS attributes if available.

---

### Ignore SSL Issues (Insecure)
When enabled:
- SSL/TLS certificate validation errors are ignored

Use this option only for:
- Internal feeds
- Test environments

---

### Timeout
Request timeout in seconds.

- Default: **30 seconds**
- Prevents long-running requests on slow or unavailable feeds

---

### Max Items
Maximum number of feed items to return.

- Leave empty for unlimited items
- Useful when processing large feeds or limiting execution size

---

## Output

The RSS Reader returns:
- Feed metadata (title, description, link)
- An array of feed items
- Each item typically includes:
  - Title
  - Link
  - Publish date
  - Description/content
  - Custom fields (if configured)

This output can be:
- Iterated using a **Loop** node
- Filtered using a **Router**
- Stored or forwarded to other systems

---

## Common Use Cases

- Monitor blog updates
- Trigger workflows on new content
- Aggregate news sources
- Track release notes or changelogs
- Automate content distribution

---

## Best Practices

- Combine with **Schedule Trigger** for periodic checks
- Use **Max Items** to control execution size
- Always validate RSS URLs
- Pair with **Loop** and **Router** for advanced processing

---

## Summary

The RSS Reader node enables:
- Reliable RSS feed consumption
- Structured content extraction
- Content-driven automation
- Easy integration with downstream logic

It is a core building block for workflows based on external content updates.