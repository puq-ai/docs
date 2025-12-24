---
title: TOTP
description: Generate and verify Time-based One-Time Passwords (TOTP) for two-factor authentication in puq.ai.
parent: Core Nodes
nav_order: 16
---

# TOTP

The **TOTP (Time-based One-Time Password)** node allows you to generate and verify one-time passwords commonly used in **two-factor authentication (2FA)** systems.  
TOTP codes are time-sensitive and change periodically, providing an extra security layer beyond static passwords.

This node is typically used in:
- Authentication and login flows
- Security verification steps
- Automated testing of 2FA-enabled systems
- Identity validation workflows

---

## Generate TOTP Token

The **Generate TOTP Token** action creates a valid TOTP code based on a shared secret and time window.

### Parameters

- **Secret Key** *(required)*  
  Base32-encoded secret key used for TOTP generation.  
  This key must match the secret configured on the authenticator side.

- **Label** *(required)*  
  Identifier in the format `issuer:username`  
  Example: `GitHub:john@example.com`

- **Algorithm**  
  HMAC hashing algorithm used to generate the TOTP code.  
  Common options include:
  - SHA1
  - SHA256
  - SHA512

- **Digits**  
  Number of digits in the generated TOTP code.  
  Default: `6`

- **Period (seconds)**  
  Time window (in seconds) for which the generated TOTP is valid.  
  Default: `30`

### Output

- Generated TOTP token
- Metadata such as validity period and timestamp

> 📌 **Note:** The generated token is only valid for the configured period and will expire automatically.

---

## Verify TOTP Token

The **Verify TOTP Token** action validates a provided TOTP code against a secret key and time window.

### Parameters

- **Token** *(required)*  
  The TOTP code entered by the user or received from another system.

- **Secret Key** *(required)*  
  Base32-encoded secret key used to validate the token.

- **Algorithm**  
  HMAC hashing algorithm (must match the one used during generation).

- **Digits**  
  Number of digits expected in the TOTP code.

- **Period (seconds)**  
  Validity window for the TOTP code.

- **Time Window**  
  Number of time steps before and after the current time to check.  
  Default: `1`  
  Useful for handling small clock drifts between systems.

### Output

- Validation result (`valid` / `invalid`)
- Optional timing and drift information

---

## Best Practices

- Store **Secret Keys** securely and never expose them in logs.
- Keep the **Period** consistent between generation and verification.
- Use a **Time Window** only when necessary to handle clock drift.
- Combine TOTP verification with additional security checks when possible.

---

## Common Use Cases

- Verifying login attempts with 2FA
- Automating security workflows
- Testing authentication flows
- Securing critical workflow actions

---

By using the **TOTP** node, you can easily integrate industry-standard two-factor authentication mechanisms into your puq.ai workflows.