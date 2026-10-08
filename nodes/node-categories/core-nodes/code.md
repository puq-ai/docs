---
title: Code
description: Run custom JavaScript inside a workflow to transform data, combine previous steps, or loop over an array — once for all items or once per item.
parent: Core Nodes
nav_order: 0.7
---

# Code

The **Code** step runs a small JavaScript script inside a workflow. Use it when no built-in node does exactly what you need: reshaping data, combining the output of several previous steps, doing a calculation, or implementing custom logic.

It's listed in the Add Step panel as **Code** ("Write custom code") under the **Core** category.

---

## How It Works

1. Add a Code step and choose an **Execution Mode**.
2. Write a script that reads the `input` and `steps` variables and `return`s a value.
3. puq.ai runs the script in a sandbox and uses the returned value as the step's output.

The editor only accepts a safe subset of JavaScript (ES2020) — see [What You Can't Use](#what-you-cant-use).

---

## Settings

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Execution Mode** | Yes | Run Once for all items | **Run Once for all items** or **Run once for each item** |
| **Property Name** | Only in "Run once for each item" mode | — | Name of the array property on `input` to loop over, for example `items` |
| **Script** | Yes | `return true;` | The JavaScript to run |

---

## Execution Modes

### Run Once for all items

> The script runs once and receives the full input data. Use this when you want to process or transform the entire dataset together.

### Run once for each item

> The script runs separately for each element in an array property. Use this when you want to process items one by one. Each run has access to an `item` variable representing the current element.

- **Property Name** tells the step which property of `input` holds the array — for example `items` if your input is `{ "items": [...] }`. It also accepts a value mapped from a previous step.
- If `input` isn't an object, the property is missing, or it isn't an array, the step fails.
- The output is an **array**, one entry per item, in the same order as the input array.
- If any single item's script throws, the whole step fails — it does not skip the failing item and keep going.

---

## Context Variables

| Variable | Available in | Description |
|----------|---------------|--------------|
| `input` | Both modes | The step's input data |
| `steps` | Both modes | Outputs of previous steps, keyed by step name (only steps that have produced output) |
| `item` | Run once for each item | The current array element |

---

## Return Value

- **Run Once for all items** — the script must `return` an **Object or Array**. Any other type (string, number, boolean…) fails the step with an error such as `Script output must be an Object or Array, got string`.
- **Run once for each item** — each run can return any value; the step's output is the array of per-item results.
- An empty script succeeds immediately with a `null` output.

---

## What You Can't Use

The Code step runs in a restricted JavaScript sandbox, not a browser or Node.js:

- No `async`/`await` — code runs synchronously.
- No `fetch`, `XMLHttpRequest`, `require`, or `import` — use an [HTTP Utilities](/nodes/node-categories/core-nodes/http-utilities/) step for external calls.
- No `window`, `document`, `localStorage`, or `sessionStorage` — no browser or DOM access.
- No `eval` or the `Function` constructor.

The editor underlines these as errors as you type.

{: .note }
A script that runs for about 30 seconds or longer, or that allocates roughly 16 MB or more, fails with an execution timeout or memory limit error.

---

## Output

- **Run Once for all items**: the returned Object/Array becomes the step's output directly.
- **Run once for each item**: an array of the values returned for each item, in order.

---

## Errors

The step fails when:
- The script throws, has a syntax error, or uses a disabled feature.
- **Run Once for all items** returns something other than an Object or Array.
- **Run once for each item** is selected and the Property Name is missing from `input`, not found, or not an array.
- The script exceeds the execution time or memory limit.

The step does **not** fail just because the script is empty — an empty script succeeds with a `null` output.

---

## Example

```js
// Execution Mode: Run Once for all items
// input: { "firstName": "Ana", "lastName": "Lopez" }

return {
  fullName: `${input.firstName} ${input.lastName}`,
  initials: `${input.firstName[0]}${input.lastName[0]}`.toUpperCase(),
};
```

```js
// Execution Mode: Run once for each item, Property Name: items
// input: { "items": [{ "price": 10 }, { "price": 25 }] }

return {
  ...item,
  priceWithTax: item.price * 1.2,
};
// Output: [{ "price": 10, "priceWithTax": 12 }, { "price": 25, "priceWithTax": 30 }]
```

---

## Best Practices

- Keep scripts small and focused; use a [Router](/nodes/node-categories/core-nodes/router/) for branching instead of encoding it in the script.
- Prefer **Run once for each item** over looping manually inside the script — it keeps each item's result (and failure) separate.
- Avoid building very large strings or arrays; the sandbox has a fixed memory ceiling.
- Use an HTTP Request or a connector node for calls to external services instead of trying to call out from the script.
