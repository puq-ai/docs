---
title: Loop
description: Iterate over lists and process each item individually in your workflows.
parent: Core Nodes
nav_order: 9
---

# Loop

The **Loop** node allows you to iterate over a list of items and execute subsequent workflow steps **once per item**.  
It is essential when you need to process collections such as arrays, lists, or multiple records one by one.

Typical use cases include:
- Processing multiple API results
- Sending messages for each item in a list
- Transforming or validating batch data
- Executing actions per user, order, or record

---

## How Loop Works

The Loop node takes a **list of items** as input and creates a loop block in the workflow.

For each item in the list:
1. The workflow enters the loop
2. Executes all steps inside the loop
3. Moves to the next item
4. Repeats until the list is finished

Once all items are processed, the workflow continues **after the loop**.

> ⚠️ **Limit:** A maximum of **1000 items** can be processed per loop to prevent performance issues.

---

## Inputs

### Items *(required)*

The **Items** input must be a **list (array)**.

This list usually comes from:
- A Trigger (Webhook, Schedule, etc.)
- An HTTP request response
- A CSV / JSON node
- Parameter Mapping output

Example of valid input:
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" },
  { "id": 3, "name": "Charlie" }
]
```

If the input is **not an array**, the loop will not execute.

---

## Loop Structure in the Builder

When you add a Loop node, the visual builder automatically creates a **loop container**.

- Nodes placed **inside the loop** run once per item
- Nodes placed **outside the loop** run only once

---

## Accessing Current Item Data

Inside the loop, each iteration exposes the **current item** automatically.

You can:
- Map fields from the current item into node inputs
- Use Parameter Mapping to manipulate item values
- Combine loop data with global execution data

Example:
```text
currentItem.email
```

---

## Common Use Cases

### Processing API Results
- Fetch a list via HTTP Request
- Loop through results
- Execute actions per record

### Sending Notifications
- Loop over users
- Send Slack, Email, or SMS per user

### Data Transformation
- Loop through CSV rows
- Validate or normalize values

---

## Best Practices

- Ensure the input is always an array
- Keep loop steps efficient
- Avoid exceeding the 1000-item limit
- Use clear step names for debugging

---

## Summary

The Loop node enables controlled iteration over list-based data and is essential for scalable automation logic.

- Executes steps per item
- Fully traceable in execution logs
- Works seamlessly with data mapping
- Supports complex automation scenarios