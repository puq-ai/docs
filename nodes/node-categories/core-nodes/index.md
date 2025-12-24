---
title: Core Nodes
description: Explore all essential Core Nodes used to build workflows, including data processors, validators, HTTP tools, crypto utilities, loops, routers, and more.
parent: Node Categories
has_children: true
nav_order: 2
---

---
title: Core Nodes
description: Learn about the fundamental nodes that power workflows — from data validation to HTTP requests, loops, QR codes, and more.
parent: nodes
nav_order: 2
---

# Core Nodes

Core Nodes are the essential building blocks of any workflow. They provide utilities, data processing, validation, communication tools, and logic routing that allow you to build powerful automations step-by-step.

This page provides a complete overview of each Core Node category and the tools they contain.

---

## Crypto Nodes

Crypto nodes allow you to securely transform, sign, or generate data.

### **Hash Data**
Generate cryptographic hash values using popular algorithms such as SHA-256, SHA-1, MD5, and more.

**Use cases:**
- Store passwords securely  
- Verify data integrity  
- Generate unique identifiers  

---

### **HMAC Generation**
Generate **HMAC signatures** for secure API authentication.

**Use cases:**
- Signing API requests  
- Validating payload integrity  
- Secure communication between services  

---

### **Generate Random Data**
Create secure random values.

**Common outputs:**
- Random strings  
- Random numbers  
- Unique keys or tokens  

---

## CSV Processor

Process CSV files with ease.

### **Read CSV**
Convert CSV content into structured JSON data.

**Use cases:**
- Import spreadsheets  
- Parse large data sets  
- Automate report ingestion  

### **Write CSV**
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

### **Delay For**
Pause the workflow for a specified duration (seconds, minutes, hours, days).

### **Delay Until**
Schedule the workflow to continue at a future timestamp.

**Use cases:**
- Rate limiting  
- Throttling API calls  
- Scheduled follow-ups  
- Creating cooldown periods  

---

## HTTP Utilities

Interact with external APIs or download files.

### **Send HTTP Request**
Supports:
- GET / POST / PUT / DELETE  
- Custom headers  
- Query parameters  
- JSON / form-data / raw bodies  

Perfect for integrating with third-party services.

### **Download File**
Download files from any URL and attach them to workflow output.

**Use cases:**
- Fetch reports  
- Download images  
- Sync files between systems  

---

## Image Tools

### **Resize Image**
Modify image dimensions (width, height, quality).

**Use cases:**
- Prepare images for upload  
- Compress images for storage

---

## JSON Tools

Work with JSON objects easily.

### **Parse JSON**
Convert a JSON string into a structured object.

### **Stringify JSON**
Convert structured data back into a JSON string.

### **Extract JSON Value**
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

### **Merge JSON Object**
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

## Model Router (AI Text Model)

Route text queries through an AI model or different model providers.

Use cases:
- Smart content analysis
- Classification
- AI-driven routing
- Model fallback strategy

---

## QR Code Tools

### **Generate QR Code**

Create a QR code from text, URLs, or dynamic data.

### **Read QR Code**

Extract text from an uploaded QR code image.

Use cases:
- Ticketing systems
- Authentication flows
- Sharing links
- Inventory management

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

### **RSS Read**

Reads data from an RSS feed and returns structured items.

Use cases:
- News monitoring
- Blog update alerts
- Event-based RSS workflows

---

## Server Monitoring
Tools for checking system health and connectivity.

### **Server Health**

Monitor performance metrics with comparative checks.

### **Monitor Port**

Check if a port is open and responding.

Use cases:
- Uptime monitoring
- Detecting service interruptions
- Alerting when a service goes offline

---

## SSH Tools
Connect to remote servers.

### **Execute Command**
Run shell commands on a remote machine via SSH.
### **Connection Test**
Verify SSH connectivity before running commands.

Use cases:
- Deployment automation
- Server maintenance
- Remote scripts

--- 

## TOTP Tools

### **Generate TOTP Token**

Create time-based one-time passwords.

### **Verify TOTP Token**

Validate a TOTP token against a shared secret.

Use cases:
- 2FA authentication flows
- Secure user login
- One-time access validation

---

## XML Parser

### **Parse XML**

Convert XML into JSON.

### **Generate XML**

Convert JSON into XML format.

Use cases:
- Enterprise system integrations
- Legacy API transformations
- Config file processing

---

# Summary

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