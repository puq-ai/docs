---
title: QR Code
description: Generate and read QR codes inside your workflows using puq.ai QR Code nodes.
parent: Core Nodes
nav_order: 11
---

# QR Code

The **QR Code** node allows you to both **generate** QR codes from text or URLs and **read/decode** existing QR code images.  
It is useful for automations that involve sharing links, encoding data visually, or extracting information from QR images.

puq.ai provides two actions under this node:
- **Generate QR Code**
- **Read QR Code**

---

## Generate QR Code

The **Generate QR Code** action creates a QR code image based on the provided input data.

### What It Does
- Encodes text or URLs into a QR code
- Generates an image file (PNG by default)
- Allows full customization of size, colors, margins, and error correction

### Parameters

#### Data *
The text or URL to encode into the QR code.

Examples:
- `https://puq.ai`
- `user_id=12345`
- `WIFI:S:MyNetwork;T:WPA;P:password;;`

---

#### Size
Defines the width and height of the QR code in pixels.

- Range: **10 – 1000**
- Default: **200**

---

#### Error Correction Level
Controls how much data can be recovered if the QR code is damaged.

Options:
- **Low (~7%)**
- Medium
- Quartile
- High

Higher levels improve reliability but increase QR code density.

---

#### Foreground Color
Color of the QR code modules (default: black).

---

#### Background Color
Background color of the QR code (default: white).

---

#### Margin
Margin thickness in pixels around the QR code.

- Range: **0 – 50**
- Default: **1**

---

#### Quiet Zone
Extra blank space around the QR code, measured in modules.

- Recommended: **4**

---

#### Format
Output image format.

Common options:
- PNG
- JPG
- SVG (if enabled)

---

#### Filename
Custom filename for the generated QR code (without extension).

---

### Output
- Generated QR code image
- Metadata about generation settings

---

### Common Use Cases
- Generate QR codes for URLs, invites, or downloads
- Embed QR codes into emails or documents
- Automate QR creation for events or products

---

## Read QR Code

The **Read QR Code** action decodes a QR code image and extracts its content.

### What It Does
- Scans a QR code image
- Extracts the encoded text or URL
- Returns structured output for further processing

---

### Parameters

#### Input Type *
Defines how the QR code image is provided.

Example:
- **URL (Image URL)**

---

#### File URL *
URL pointing to the QR code image.

Supported formats:
- PNG
- JPG
- JPEG
- GIF

Maximum size: **< 1MB**

---

#### Output Format
Defines how the decoded data is returned.

- JSON (default)

---

### Output
- Decoded QR content
- Metadata about the scan result

---

### Common Use Cases
- Read QR codes from uploaded images
- Extract URLs or tokens from QR scans
- Automate validation or redirection flows

---

## Best Practices

- Use higher error correction for printed QR codes
- Keep contrast high between foreground and background
- Ensure quiet zones are preserved for reliable scanning
- Validate QR input URLs before decoding

---

## Summary

The QR Code node enables:
- Easy QR code generation
- Reliable QR code decoding
- Visual data exchange within workflows
- Flexible customization and automation

It is ideal for workflows that need visual encoding or scanning of structured data.