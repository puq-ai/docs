---
title: Crypto
description: Learn how Crypto nodes in puq.ai help you hash data, generate secure signatures, and create random or cryptographic values.
parent: Core Nodes
nav_order: 1
---

# Crypto Nodes

**Crypto Nodes** provide essential cryptographic utilities for workflows that require security, integrity, and randomness.  
They are commonly used for data protection, authentication, validation, and secure token generation.

Crypto nodes are especially useful when working with:
- API authentication
- Webhooks
- Passwords and secrets
- Data integrity checks
- Secure identifiers and tokens

puq.ai currently provides three Crypto-related nodes:
- **Hash Data**
- **HMAC Generation**
- **Generate Random Data**

---

## Cryptography Basics (Short Overview)

Before diving into the nodes, it’s important to understand a few key concepts:

### What is Hashing?
Hashing is a **one-way transformation** of data into a fixed-length value (hash).

- The same input always produces the same hash
- Even a tiny change in input creates a completely different hash
- **Hashed data cannot be reversed or decoded back to the original value**

Hashing is commonly used for:
- Password storage
- Data integrity verification
- Digital signatures
- Identifying content uniquely

---

## Hash Data Node

The **Hash Data** node generates a cryptographic hash from text or binary data using widely accepted hashing algorithms.

### Supported Algorithms
- MD5
- SHA-256
- SHA-384
- SHA-512
- SHA-3 variants

⚠️ **Note:** MD5 is fast but not recommended for security-sensitive use cases. Prefer SHA-256 or higher for secure workflows.

---

### Configuration Parameters

#### Hash Algorithm
- Select box
- Choose the hashing algorithm to use

#### Input Text
- Text area
- The data you want to hash  
  (Can be plain text or binary data)

#### Output Encoding
- Select box
- Options:
  - `hexadecimal`
  - `base64`

#### Uppercase Output
- On / Off
- Converts hexadecimal output to uppercase  
- Applies **only** when `hexadecimal` encoding is selected

---

### Common Use Cases
- Verifying payload integrity
- Creating unique identifiers
- Hashing sensitive fields before storage
- Comparing incoming webhook signatures

---

## HMAC Generation Node

The **HMAC Generation** node creates a **Hash-based Message Authentication Code (HMAC)** using a secret key and a hash algorithm.

HMAC adds an extra layer of security by combining:
- The input data
- A **secret key**

This ensures that the data has not been tampered with and that it came from a trusted source.

---

### Configuration Parameters

#### Hash Algorithm
- Select box
- Same algorithm options as Hash Data

#### Input Text
- Text input
- The message to be signed

#### Secret Key
- Text input
- A private key used to generate the HMAC  
- Must be kept secure

#### Output Encoding
- Select box
- `hexadecimal` or `base64`

#### Uppercase Output
- On / Off
- Converts hexadecimal output to uppercase (hex only)

---

### Common Use Cases
- Webhook signature verification
- Secure API request signing
- Authenticating incoming events
- Ensuring message integrity

---

## Generate Random Data Node

The **Generate Random Data** node creates random and cryptographically secure values for identifiers, tokens, passwords, and secrets.

This node is designed for both general-purpose randomness and security-critical use cases.

---

### Generation Types

You can choose from multiple generation formats:

- **UUID v4**
- **Random Bytes**
- **Random String (alphanumeric)**
- **Random String (alphabetic)**
- **Random String (numeric)**
- **Random String (custom characters)**
- **Cryptographic Token**
- **Password**

---

### Configuration Parameters

#### Generation Type
- Select box
- Determines the type of random data generated

#### Length
- Number input
- Defines the size of the output (where applicable)

#### Output Encoding
- Select box
- Encoding format of the generated output

#### Include Symbols
- On / Off

#### Include Numbers
- On / Off

#### Include Uppercase
- On / Off

#### Include Lowercase
- On / Off

#### Uppercase Output
- On / Off
- Forces output to uppercase (useful for tokens or IDs)

---

### Common Use Cases
- Generating API keys
- Creating secure passwords
- Issuing temporary tokens
- Generating unique workflow identifiers
- Creating cryptographic nonces

---

## Best Practices

- Use **SHA-256 or higher** for security-sensitive hashing
- Never store plain secrets or passwords — always hash them
- Use **HMAC** when authenticity matters, not just integrity
- Prefer **Cryptographic Token** for security-critical identifiers
- Keep secret keys out of logs and outputs

---

## Summary

Crypto nodes in puq.ai provide foundational security building blocks for workflows:

- **Hash Data** ensures integrity and uniqueness
- **HMAC Generation** guarantees authenticity
- **Generate Random Data** creates secure and unpredictable values

These nodes are essential for building secure, production-ready automations.