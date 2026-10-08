---
title: Core Nodes
description: Explore all essential Core Nodes used to build workflows, including data processors, validators, HTTP tools, crypto utilities, loops, routers, and more.
parent: Node Categories
has_children: true
nav_order: 2
---

# Core Nodes

Core Nodes are the essential building blocks of any workflow. They provide utilities, data processing, validation, communication tools, and logic routing that allow you to build powerful automations step-by-step.

This page provides a complete overview of each Core Node category and the tools they contain.

---

## Agent

Run one of your [Agents](/agents/) as a single workflow step. The prompt can include data from earlier steps, and the agent's final answer is available to later steps.

**Use cases:**
- Multi-step research or reasoning inside a workflow
- Letting an AI decide which tools to call for a task
- Reusing the same agent across several workflows

See [Agent](/nodes/node-categories/core-nodes/agent/) for details.

---

## Code

Run custom JavaScript inside a workflow — once for the whole input, or once per item in an array — to transform data or implement logic no built-in node covers.

**Use cases:**
- Reshaping or combining data between steps
- Custom calculations and validation
- Looping through an array item by item

See [Code](/nodes/node-categories/core-nodes/code/) for details.

---

## Crypto Nodes

Crypto nodes allow you to securely transform, sign, or generate data.

### Hash Data
Generate cryptographic hash values using popular algorithms such as SHA-256, SHA-1, MD5, and more.

**Use cases:**
- Store passwords securely  
- Verify data integrity  
- Generate unique identifiers  

---

### HMAC Generation
Generate **HMAC signatures** for secure API authentication.

**Use cases:**
- Signing API requests  
- Validating payload integrity  
- Secure communication between services  

---

### Generate Random Data
Create secure random values.

**Common outputs:**
- Random strings  
- Random numbers  
- Unique keys or tokens  

---

## CSV Processor

Process CSV files with ease.

### Read CSV
Convert CSV content into structured JSON data.

**Use cases:**
- Import spreadsheets  
- Parse large data sets  
- Automate report ingestion  

### Write CSV
Convert JSON objects into CSV files.

**Use cases:**
- Export data  
- Generate automated CSV reports  
- Provide downloadable files  

---

## Data Validator

Validate user input or external data to ensure workflows operate safely.

Includes:

- **Validate Email**  
- **Validate Password**  
- **Validate Phone Number**  
- **Validate Credit Card**  
- **Validate Date**  
- **Validate URL**  
- **Validate Markdown**

Typical workflow:
1. Receive raw data  
2. Validate using this node  
3. Branch workflow based on validation status  

---

## Delay Utilities

Control execution timing inside your workflow.

### Delay For
Pause the workflow for a specified duration (seconds, minutes, hours, days).

### Delay Until
Schedule the workflow to continue at a future timestamp.

**Use cases:**
- Rate limiting  
- Throttling API calls  
- Scheduled follow-ups  
- Creating cooldown periods  

---

## Go to Step

Jump back to a previously executed step to repeat part of the workflow, up to a configurable **Maximum Iterations** limit (default 100). Once the limit is reached, the workflow continues past it instead of failing.

**Use cases:**
- Retry a group of steps until a condition is met
- Simple polling loops

See [Go to Step](/nodes/node-categories/core-nodes/go-to-step/) for details.

---

## HTTP Utilities

Interact with external APIs or download files.

### Send HTTP Request
Supports:
- GET / POST / PUT / DELETE  
- Custom headers  
- Query parameters  
- JSON / form-data / raw bodies  

Perfect for integrating with third-party services.

### Download File
Download files from any URL and attach them to workflow output.

**Use cases:**
- Fetch reports  
- Download images  
- Sync files between systems  

---

## Human in the Loop

### Request Approval
Pause the workflow until a person approves or rejects the request. Reviewers are notified by Email, Slack, Gmail, Telegram, or Discord and decide on a public approval page. Supports custom button labels, reviewer editing, and timeouts with automatic decisions.

**Use cases:**
- Reviewing AI-generated content before publishing
- Approving payments or refunds
- Escalating cases to a human

See [Human in the Loop](/nodes/node-categories/core-nodes/human-in-the-loop/) for details.

---

## Image Tools

### Resize Image
Modify image dimensions (width, height, quality).

**Use cases:**
- Prepare images for upload  
- Compress images for storage

---

## JSON Tools

Work with JSON objects easily.

### Parse JSON
Convert a JSON string into a structured object.

### Stringify JSON
Convert structured data back into a JSON string.

### Extract JSON Value
Pull a nested value using JSON paths.

Example:
```json
{
  "user": { "profile": { "email": "test@example.com" } }
}
```

Extraction path: 
```bash
user.profile.email
```

### Merge JSON Object
Combine multiple JSON objects into one.

---

## Loop Node
Execute a set of nodes repeatedly.

Supports:
- Looping over arrays
- Running until a condition is met
- Fixed number of iterations

Use cases:
- Batch processing
- Paginated API calls
- Complex iterative logic

---

## Model Router

Generate AI chat replies, images, speech, transcriptions, or video through puq.ai's built-in AI model router — five actions (AI Chat Model, Generate Image, Generate Speech, Transcribe Audio, Generate Video) billed to your account balance.

**Use cases:**
- Generating or summarizing text with an LLM
- Creating images, voiceovers, or short video clips for content workflows
- Transcribing uploaded or generated audio

See [Model Router](/nodes/node-categories/core-nodes/model-router/) for details.

---

## QR Code Tools

### Generate QR Code

Create a QR code from text, URLs, or dynamic data.

### Read QR Code

Extract text from an uploaded QR code image.

Use cases:
- Ticketing systems
- Authentication flows
- Sharing links
- Inventory management

---

## Respond to Webhook

Send a custom HTTP response — status code, body, and headers — back to the caller of a workflow's Sync Webhook endpoint, so a workflow can act as an API endpoint.

**Use cases:**
- Returning validation results or computed data to the caller
- Building a simple request/response API on top of a workflow

See [Respond to Webhook](/nodes/node-categories/core-nodes/respond-to-webhook/) for details.

---

## Router Node

Branch your workflow based on conditions.

Supports:
- If / Else branching
- Complex logical conditions
- Multiple outputs

Example conditions:
- price > 100
- status == "success"
- email.contains("@gmail.com")

---

## RSS Reader

### RSS Read

Reads data from an RSS feed and returns structured items.

Use cases:
- News monitoring
- Blog update alerts
- Event-based RSS workflows

---

## Server Monitoring
Tools for checking system health and connectivity.

### Server Health

Monitor performance metrics with comparative checks.

### Monitor Port

Check if a port is open and responding.

Use cases:
- Uptime monitoring
- Detecting service interruptions
- Alerting when a service goes offline

---

## SSH Tools
Connect to remote servers.

### Execute Command
Run shell commands on a remote machine via SSH.
### Connection Test
Verify SSH connectivity before running commands.

Use cases:
- Deployment automation
- Server maintenance
- Remote scripts

--- 

## TOTP Tools

### Generate TOTP Token

Create time-based one-time passwords.

### Verify TOTP Token

Validate a TOTP token against a shared secret.

Use cases:
- 2FA authentication flows
- Secure user login
- One-time access validation

---

## Workflow Call

Trigger another one of your workflows by calling its webhook, with an optional JSON payload. The call starts the target workflow and returns immediately — it does not wait for the target to finish.

**Use cases:**
- Splitting a large workflow into smaller, reusable workflows
- Fanning out to multiple workflows from one trigger

See [Workflow Call](/nodes/node-categories/core-nodes/workflow-call/) for details.

---

## XML Parser

### Parse XML

Convert XML into JSON.

### Generate XML

Convert JSON into XML format.

Use cases:
- Enterprise system integrations
- Legacy API transformations
- Config file processing

---

## Summary

Core Nodes provide everything you need to:
- Validate data
- Process files
- Interact with the web
- Run loops
- Parse/transform JSON & XML
- Execute server commands
- Create QR codes
- Monitor systems
- Use cryptographic utilities

They form the foundation of every workflow and enable powerful, flexible automation.
