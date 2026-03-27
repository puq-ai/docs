---
title: Data Transformation
description: Clean, transform, and move data between systems using puq.ai.
parent: Usage Help
nav_order: 4
---

# Data Transformation

Move data between systems while cleaning and transforming it along the way.

---

## Use Case

You have data in one system (e.g. a spreadsheet, API, or database) and need to:

1. Extract the data
2. Clean and transform it (rename fields, filter rows, convert formats)
3. Load it into another system

---

## Step 1: Extract Data

Add a trigger or data source node to pull the data.

**Common sources:**
- **Google Sheets** — Pull rows from a spreadsheet
- **HTTP Utilities** — Fetch data from a REST API
- **Webhook Trigger** — Receive data pushed from another system

---

## Step 2: Transform with JSON Node

Add a **JSON** node to reshape the data.

Common transformations:

**Rename fields:**
Map source field names to the names your target system expects.

**Filter rows:**
Use a **Router** node to keep only rows that match your criteria (e.g. status == "active").

**Convert formats:**
Use [Parameter Mapping]({{ '/data/parameter-mapping' | relative_url }}) helper functions to:
- Convert dates between formats
- Parse strings to numbers
- Merge or split text fields

---

## Step 3: Loop Over Records

If your data contains multiple records, use a **Loop** node to process each one individually.

1. Add a **Loop** node
2. Set the input to the array from your data source
3. Inside the loop, add nodes to process each record

---

## Step 4: Load Into Target System

Add a destination node to push the transformed data.

**Common targets:**
- **Google Sheets** — Append rows to a spreadsheet
- **HTTP Utilities** — POST data to an API
- **HubSpot / Salesforce / Pipedrive** — Create or update CRM records
- **Notion** — Create database entries

---

## Step 5: Test and Publish

1. Test with a small dataset first
2. Verify the output in your target system
3. Publish the workflow

---

## Best Practices

- Always test with sample data before processing large datasets
- Use a **Data Validator** node to catch malformed records early
- Add error handling inside loops to prevent one bad record from stopping the entire batch
- Use the **Delay Utilities** node between API calls if your target system has rate limits
