---
title: HTTP Utilities
description: Learn how to call APIs, download files, and run multiple HTTP requests reliably with retries, validation, and authentication.
parent: Core Nodes
nav_order: 6
---

# HTTP Utilities

HTTP Utilities help you connect puq.ai workflows to **any external system** over HTTP.

You typically use this node type to:
- Call REST APIs (GET/POST/PUT/DELETE)
- Download files from URLs (and validate them)
- Execute many HTTP requests in bulk (parallel or sequential)

> Tip: HTTP Utilities are one of the most common “glue” nodes in automations. If a service doesn’t have a dedicated integration node, HTTP Utilities usually covers it.

---

## Included Nodes

- Send HTTP Request  
- Download File  
- HTTP Batch Request  

---

# Send HTTP Request

Send an enhanced HTTP request with authentication, retry logic, response validation, and comprehensive error handling.

---

## Key Parameters

### HTTP Method
GET, POST, PUT, PATCH, DELETE

### URL
Full request URL including protocol.

### Headers
JSON headers sent with the request.

### Query Parameters
Parameters appended to the URL.

---

## Authentication

Choose how the request authenticates:
- None
- Token-based
- Basic authentication (if configured)

---

## Request Body

Define the payload format and content for POST/PUT/PATCH requests.

---

## Reliability & Validation

- Timeout
- Follow redirects
- SSL verification
- Response validation
- Expected status codes

---

## Retry Settings

Automatic retries on selected HTTP status codes with backoff support.

---

# Download File

Download files from URLs with validation and authentication support.

---

## Key Parameters

- File URL
- Custom filename
- Headers
- Authentication
- File size limits
- Timeout
- Allowed MIME types
- Content validation

---

# HTTP Batch Request

Execute multiple HTTP requests in parallel or sequence.

---

## Key Parameters

- HTTP Requests array
- Execution mode (Parallel / Sequential)
- Batch size

---

## Best Practices

- Use retries for unstable APIs
- Validate responses
- Limit batch size for rate-limited services