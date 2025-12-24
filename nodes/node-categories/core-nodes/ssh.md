---
title: SSH
description: Execute remote commands and test SSH connections securely in puq.ai.
parent: Core Nodes
nav_order: 15
---

# SSH

The **SSH** node allows you to securely connect to remote servers and execute commands over an SSH connection.  
It is commonly used for server automation, maintenance tasks, deployments, and health checks.

SSH nodes require a **predefined SSH Connection**, which stores authentication details such as host, username, port, and credentials.

---

## Available Actions

The SSH node includes **2 actions**:

1. **Execute Command**
2. **Connection Test**

---

## Execute Command

The **Execute Command** action runs a shell command on a remote server over SSH.

### Parameters

- **SSH Connection***  
  Select an existing SSH connection or create a new one.

- **Command***  
  The command to execute on the remote server.  
  Examples:
  - `ls -la`
  - `ps aux`
  - `df -h`
  - `cat /etc/hosts`

- **Working Directory**  
  Optional. Defines the directory where the command will be executed.

- **Output Format**  
  Select how the command output should be returned (plain text, structured, etc.).

### Use Cases

- Run maintenance scripts
- Check disk or memory usage
- Restart services
- Execute deployment commands
- Read system configuration files

---

## Connection Test

The **Connection Test** action verifies that an SSH connection is valid and reachable.

### Parameters

- **SSH Connection***  
  Select the SSH connection you want to test.

### What It Does

- Attempts to establish an SSH connection
- Validates credentials and network access
- Returns success or error details

### Use Cases

- Validate SSH credentials before running commands
- Debug connection issues
- Ensure servers are reachable in automation workflows

---

## Best Practices

- Use SSH keys instead of passwords whenever possible
- Restrict SSH users to minimum required permissions
- Test connections before running critical commands
- Avoid running destructive commands without validation
- Log outputs for auditing and debugging

---

## Summary

The SSH node enables powerful server-level automation by allowing you to:

- Securely connect to remote servers
- Execute shell commands
- Validate SSH connectivity
- Automate operational and DevOps workflows

It is ideal for system administration, monitoring, and deployment automation scenarios.