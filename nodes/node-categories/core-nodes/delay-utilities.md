---
title: Delay Utilities
description: Control execution timing in workflows using delay-based nodes.
parent: Core Nodes
nav_order: 4
---

# Delay Utilities

**Delay Utilities** nodes allow you to control *when* a workflow continues execution.  
They are used to pause a workflow for a specific duration or until a specific date and time.

Delays are essential for:
- Rate limiting API calls
- Scheduling follow-up actions
- Waiting for external systems to update
- Creating time-based automation logic
- Preventing immediate execution of downstream steps

puq.ai provides two delay nodes:
1. **Delay For**
2. **Delay Until**

---

## How Delays Work

When a Delay node is reached during execution:

- The workflow **pauses** at that step
- No further steps are executed until the delay condition is satisfied
- Once the delay completes, execution continues automatically
- Delay nodes do **not** block other workflows or executions

Delays are handled asynchronously and are safe to use in production workflows.

---

# Delay For

### Description
**Delay For** pauses the workflow for a specified amount of time.

This is useful when you need to wait for a fixed duration before continuing.

### Parameters

- **Unit** (select box)  
  Determines the time unit for the delay:
  - Seconds
  - Minutes
  - Hours
  - Days

- **Amount** (number)  
  Specifies how many units the workflow should wait.

### Example Configurations

- Delay for **30 seconds**
- Delay for **5 minutes**
- Delay for **2 hours**
- Delay for **1 day**

### Common Use Cases

- Waiting before sending a follow-up message
- Throttling API requests
- Adding cooldown periods between actions
- Creating retry buffers after failures

---

# Delay Until

### Description
**Delay Until** pauses the workflow until a specific date and time.

This is ideal for scheduling actions at an exact moment.

### Parameters

- **Date and Time**  
  A combined date and time selector:
  - Select a **date**
  - Select a **time**

The workflow resumes execution precisely at the selected moment.

### Example Scenarios

- Resume workflow at **2025-01-01 09:00**
- Schedule an action for **tomorrow at 10:30**
- Delay until a campaign launch date
- Execute reminders at a fixed time

---

## Delay For vs Delay Until

| Feature | Delay For | Delay Until |
|------|---------|------------|
| Uses duration | ✅ | ❌ |
| Uses specific date/time | ❌ | ✅ |
| Relative timing | ✅ | ❌ |
| Absolute scheduling | ❌ | ✅ |
| Dynamic waiting | ✅ | ⚠️ (static time) |

---

## Best Practices

- Use **Delay For** when timing depends on execution flow  
- Use **Delay Until** for calendar-based scheduling  
- Avoid extremely long delays when frequent re-evaluation is required  
- Combine delays with **Router** or **Conditions** for advanced timing logic  

---

## Summary

Delay Utilities give you precise control over workflow timing:

- **Delay For** — wait a specific amount of time
- **Delay Until** — wait until a fixed date and time

They are essential for building reliable, time-aware automations in puq.ai.
