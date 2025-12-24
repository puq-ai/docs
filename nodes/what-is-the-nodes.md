---
title: What is a Node?
description: Learn what a node is in puq.ai and how nodes work together to build workflows.
parent: Nodes
nav_order: 1
---

# What is a Node?

A **Node** is the smallest functional unit in puq.ai workflows.  
Each node performs **one specific responsibility** — such as receiving data, processing it, making decisions, or interacting with external systems.

Workflows are built by connecting nodes together to form a logical execution path.

---

## Nodes as Building Blocks

Think of a workflow as a pipeline.  
Nodes are the individual stations in that pipeline.

Each node:
- Receives input data  
- Performs an operation  
- Produces output data  

The output of one node becomes available to all subsequent nodes in the workflow.

---

## What a Node Can Do

Depending on its type, a node can:

- Start a workflow (Trigger Nodes)
- Transform or validate data
- Call APIs or external services
- Send messages or notifications
- Apply business logic and conditions
- Control execution flow (loops, branches, delays)
- Interact with AI models
- Store, retrieve, or manipulate data

Each node focuses on **doing one thing well**.

---

## Node Inputs and Outputs

Every node has:
- **Inputs** — data required for the node to run  
- **Outputs** — data generated after execution  

Inputs can be:
- Static values (manually entered)
- Dynamic values selected from previous steps
- Data manipulated using parameter mapping

Outputs are automatically added to the execution data context and remain available until the workflow execution ends.

---

## Nodes and Execution Flow

Nodes execute **sequentially**, following the connections defined in the visual builder.

- A node runs only after all required inputs are available
- If a node fails, execution may stop or follow error-handling logic
- Some nodes can branch execution into multiple paths
- Some nodes can delay or repeat execution

The order and structure of nodes define how your automation behaves.

---

## Node Configuration

Each node is configurable through its settings panel:

- Input fields
- Authentication or credentials (if required)
- Optional parameters
- Advanced options (timeouts, retries, conditions)

Node configuration determines **how** the node behaves during execution.

---

## Node Reusability

Nodes are reusable concepts.

The same node type can be used:
- Multiple times in a single workflow
- Across different workflows
- With different configurations and data mappings

This makes workflows flexible, modular, and easy to maintain.

---

## Nodes vs Workflows

| Concept | Description |
|------|------------|
| **Node** | A single action or operation |
| **Workflow** | A connected sequence of nodes |
| **Execution** | One run of a workflow |

Nodes define *what happens*, workflows define *when and how*, executions show *what actually happened*.

---

## Next Steps

Now that you understand what a node is, you can explore:

- Different **node categories**
- How nodes **pass data** to each other
- How to **map and manipulate data**
- How nodes behave during **execution and debugging**

Continue with a node category to see real-world use cases and examples.
