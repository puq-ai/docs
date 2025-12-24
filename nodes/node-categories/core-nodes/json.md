---
title: JSON
description: Parse, stringify, extract, and merge JSON data inside your workflows.
parent: Core Nodes
nav_order: 8
---

# JSON

JSON is one of the most common data formats you will handle in automation: API responses, webhook payloads, configuration objects, and structured text.
The **JSON** node provides simple tools to **convert**, **inspect**, and **combine** JSON safely without writing custom code.

---

## When to Use This Node

Use the JSON node when you need to:

- Turn a JSON string into a structured object you can map into other node inputs
- Build a JSON string from items (for APIs, storage, or logs)
- Extract a deeply nested value using a dot-notation path
- Merge two JSON objects (or arrays) into a single output

---

# Actions

## 1) Parse JSON

**Purpose:** Parse a JSON string into a structured object (or associative array) so you can select fields and map them into the next steps.

### Inputs
- **JSON String\***  
  The raw JSON string you want to parse.

- **Return as Array** (toggle)  
  If enabled, the parsed result is returned as an associative array style structure.  
  If disabled, the parsed result is returned as an object style structure.

### Example

**JSON String**
```json
{
  "user": {
    "id": 42,
    "profile": { "name": "Jane", "isActive": true }
  }
}
```

**Result**  
You can now select values like:
- `user.id`
- `user.profile.name`
- `user.profile.isActive`

> Tip: Parse JSON right after a webhook or HTTP request if the output is returned as a string.

---

## 2) Stringify JSON

**Purpose:** Convert structured data into a JSON string. This is useful when you need to send JSON in an API request body or store it as plain text.

### Inputs
- **Data\*** (**+ Add Item**)  
  Add one or more fields that will be converted into a JSON string output.

- **Pretty Print** (toggle)  
  If enabled, formats JSON with indentation for readability.

### Example

**Data**
- `name` = `Jane`
- `age` = `28`

**Output**
```json
{"name":"Jane","age":28}
```

With **Pretty Print** enabled:
```json
{
  "name": "Jane",
  "age": 28
}
```

---

## 3) Extract JSON Value

**Purpose:** Extract a specific value from JSON using a dot-notation path.  
This is ideal when you only need one field out of a large payload.

### Inputs
- **JSON Data\***  
  The JSON you want to extract from.

- **Path\***  
  A dot-notation path to the target value.  
  Example: `user.profile.name` or `items.0.id`

- **Default Value** (optional)  
  The value returned if the path does not exist.

### Example

**JSON Data**
```json
{
  "items": [
    { "id": "A1", "price": 10 },
    { "id": "B2", "price": 20 }
  ]
}
```

**Path**
```text
items.1.price
```

**Result**
```text
20
```

If you use a missing path and set **Default Value** to `0`, the output will be `0`.

---

## 4) Merge JSON Objects

**Purpose:** Combine two JSON objects (or arrays) into one result.

### Inputs
- **First JSON\***  
  The first JSON object/array to merge.

- **Second JSON\***  
  The second JSON object/array to merge.

### Example: Merge Objects

**First JSON**
```json
{ "user": { "id": 1 }, "tags": ["new"] }
```

**Second JSON**
```json
{ "user": { "name": "Jane" }, "country": "TR" }
```

**Merged Result (example)**
```json
{
  "user": { "id": 1, "name": "Jane" },
  "tags": ["new"],
  "country": "TR"
}
```

> Note: If both objects contain the same key, the merge behavior follows the node’s internal merge strategy (for example, overriding or deep-merging).  
> If you need a specific merge rule, use **Parameter Mapping** to control the final structure explicitly.

---

# Best Practices

- **Parse early, map later:** Convert JSON strings into structured data first, then use Data Selector / Parameter Mapping in later nodes.
- **Use Extract for performance:** If you only need a single field, extracting is often clearer than mapping through a large object.
- **Pretty print only for readability:** For production API requests, pretty print is usually unnecessary unless required.

---

# Quick Summary

- **Parse JSON** → string → structured data  
- **Stringify JSON** → structured data → string  
- **Extract JSON Value** → get one field using a path  
- **Merge JSON Objects** → combine two payloads into one