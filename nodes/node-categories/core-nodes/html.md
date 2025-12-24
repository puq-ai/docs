---
title: HTML
description: Extract structured data from HTML and generate HTML tables from JSON arrays.
parent: Core Nodes
nav_order: 5
---

# HTML Nodes

The **HTML** nodes help you work with raw HTML inside puq.ai workflows.

They are useful when:
- You receive HTML from an API response, email template, scraped page, or webhook payload
- You need to extract specific values from HTML using selectors (like price, title, links, IDs)
- You want to generate a clean HTML table from JSON data (for email reports, dashboards, exports)

puq.ai provides two HTML nodes:
1. **Extract HTML Content**
2. **Convert to HTML Table**

---

# 1) Extract HTML Content

### Description
Extract data from an HTML string using simple CSS selectors.

### Parameters

**HTML Source**  
HTML string to extract content from.

**Number of Rules**  
How many extraction rules to configure (1–10).

**Extraction Rules**
- Key  
- CSS Selector  
- Return (text, html, attribute, value attribute)  
- Attribute Name (required when return is attribute)  
- Skip Selectors  
- Return Array  

**Cleanup Options**
- Trim Values  
- Clean Up to Text  

---

# 2) Convert to HTML Table

### Description
Render an array of objects into an HTML table.

### Parameters
- Rows (JSON array)
- Caption
- Capitalize Headers
- Custom Styling
- Table Attributes
- Header Attributes
- Row Attributes
- Cell Attributes

---

## Summary

HTML nodes allow you to extract structured information from HTML and generate clean HTML tables for downstream usage.