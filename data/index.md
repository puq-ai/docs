---
title: Data
description: Learn how should u manipulate your data in puq.ai
nav_order: 6
has_children: true
has_toc: true
---

# Data

Data is at the core of every workflow in puq.ai.  
Each node produces data, and that data automatically flows to the next node in the workflow. Understanding how data moves, how it can be reused, and how it can be transformed is essential for building powerful automations.

This section introduces the fundamentals of **data flow**, **data usage**, and **data manipulation** within puq.ai.

---

## How Data Flows Between Nodes

In puq.ai, data flows **automatically** from one node to the next.

- When a node finishes running, its output becomes available to all downstream nodes.
- You do not need to manually pass data between nodes.
- Every node has access to the outputs of all previous nodes in the workflow.

This automatic data flow allows you to focus on *logic and behavior* rather than plumbing.

---

## Using Data in Other Nodes

To use data from a previous node:

- Open the input field of the next node
- Select the desired value from the available execution data
- Map it directly into the input field

You can reuse:
- Trigger payloads  
- API responses  
- Parsed values  
- Computed results  
- Any output produced earlier in the workflow  

This makes workflows highly dynamic and adaptable.

---

## Data Manipulation Basics

Sometimes raw data is not in the exact format you need.  
puq.ai provides tools to manipulate and transform data before passing it forward.

Common use cases include:
- Extracting specific fields from JSON
- Renaming or restructuring objects
- Combining multiple values
- Formatting strings, numbers, or dates
- Preparing data for APIs or external services

For these scenarios, puq.ai offers **parameter mapping** and dedicated data-related nodes.

---

## Parameter Mapping

Parameter mapping allows you to control **how data is passed into a node’s inputs**.

Instead of using raw values, you can:
- Select specific fields from previous node outputs
- Transform values before usage
- Build dynamic inputs based on execution context

Parameter mapping is the foundation of flexible and reusable workflows.

---

## What You’ll Learn in This Section

In the upcoming pages, we’ll cover:

- How to inspect data during executions  
- How to map parameters correctly  
- How to manipulate and transform data  
- How to handle complex JSON structures  
- Best practices for clean and predictable data flow  

Each topic will be explained in detail with practical examples.

---

## Summary

- Data flows automatically between nodes  
- Outputs from one node are available to all following nodes  
- You control how data is used through input mapping  
- Data manipulation enables flexible and powerful workflows  

Mastering data handling will help you build reliable, scalable, and maintainable automations in puq.ai.
