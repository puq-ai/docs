---
title: Server Monitoring
description: Monitor server availability, health, and service connectivity using puq.ai Server Monitoring nodes.
parent: Core Nodes
nav_order: 14
---

# Server Monitoring

The **Server Monitoring** node enables you to monitor the availability, health, and connectivity of servers and services directly inside your workflows.  
It helps you build proactive monitoring, alerting, and automated recovery workflows.

puq.ai provides two actions under this node:
- **Check Server Health**
- **Monitor Port**

---

## Check Server Health

The **Check Server Health** action monitors a server endpoint and validates its availability and responsiveness.

### What It Does
- Sends an HTTP request to a server URL
- Verifies the response status
- Optionally follows redirects and validates SSL certificates
- Returns health and response metadata

---

### Parameters

#### Server URL *
The server or endpoint URL to monitor.

Example:
```
https://example.com
```

---

#### Check Type
Defines the type of health check to perform.

Currently supported:
- **HTTP Status Check**

---

#### Expected Status Code
The HTTP status code considered successful.

Common values:
- `200` – OK
- `204` – No Content

If the response does not match, the check fails.

---

#### Follow Redirects
When enabled, HTTP redirects (3xx) are automatically followed.

---

#### Verify SSL Certificate
When enabled:
- Validates SSL/TLS certificates
- Disable only for self-signed certificates or internal environments

---

### Output
- Health status (success / failure)
- HTTP response details
- Timing information

---

### Common Use Cases
- Monitor website availability
- Validate API uptime
- Trigger alerts on downtime
- Automate recovery workflows

---

## Monitor Port

The **Monitor Port** action checks whether a specific network port is reachable on a host.

### What It Does
- Attempts a connection to a host and port
- Verifies service availability
- Optionally reads service banners
- Supports retry logic

---

### Parameters

#### Hostname / IP *
The hostname or IP address of the server.

Examples:
- `example.com`
- `192.168.1.10`

---

#### Port Number *
The port to monitor.

Valid range:
- **1 – 65535**

---

#### Protocol
Network protocol used for the check.

Options:
- TCP
- UDP (if enabled)

---

#### Timeout (seconds)
Connection timeout duration.

- Default: **10 seconds**

---

#### Retry Count
Number of retry attempts if the connection fails.

---

#### Check Service Banner
When enabled:
- Attempts to read the service greeting/banner

Useful for:
- Identifying running services
- Basic service validation

---

#### Expected Response
Optional text expected in the service response.

If provided, the check fails when the response does not match.

---

### Output
- Port availability status
- Connection timing
- Banner or response data (if enabled)

---

### Common Use Cases
- Monitor database ports
- Check internal service connectivity
- Validate firewall rules
- Detect service outages

---

## Best Practices

- Combine with **Schedule Trigger** for periodic checks
- Use **Router** to separate healthy and unhealthy paths
- Enable retries to reduce false negatives
- Keep timeouts reasonable to avoid blocking executions

---

## Summary

The Server Monitoring node enables:
- Automated health checks
- Port-level connectivity validation
- Proactive monitoring workflows
- Integration with alerts and recovery logic

It is a foundational node for infrastructure-aware automations in puq.ai.