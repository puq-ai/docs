---
title: Image Tools
description: Resize and prepare images for use in puq.ai workflows.
parent: Core Nodes
nav_order: 7
---

# Image Tools

**Image Tools** provide basic but essential image manipulation capabilities inside puq.ai workflows.
Currently, this category includes a single node focused on image resizing.

Image resizing is commonly used to:
- Prepare images for uploads
- Normalize image dimensions
- Optimize images before storage or delivery
- Ensure consistent image sizes across systems

---

## Resize Image

The **Resize Image** node resizes an image to a specific width and height.

This node is typically used after:
- Downloading an image from a URL
- Receiving an image via a trigger (Webhook, Form, API)
- Generating or processing images in previous steps

### How It Works

1. Provide an image input
2. Specify the desired width and height
3. The node outputs the resized image

The aspect ratio is not automatically preserved, so you should calculate dimensions carefully if proportions matter.

---

## Parameters

### Image *
The image to resize.

You can provide the image in two ways:
- **Upload**: Click to upload or drag and drop an image file
- **Mapped Input**: Use data from a previous node (for example, a downloaded image)

Supported input includes files and binary image data.

---

### Width *
The target width of the image.

- Value is in **pixels**
- Must be a positive number
- Example: `800`

---

### Height *
The target height of the image.

- Value is in **pixels**
- Must be a positive number
- Example: `600`

---

## Output

The node outputs:
- A resized version of the original image
- The resized image can be passed to:
  - File upload nodes
  - Storage services
  - HTTP responses
  - Other image-processing steps

---

## Common Use Cases

- Resize user-uploaded profile images
- Prepare images before uploading to cloud storage
- Normalize image sizes for email or marketing platforms
- Resize images downloaded from external APIs

---

## Best Practices

- Maintain aspect ratio manually if image distortion is undesirable
- Use consistent dimensions across workflows
- Combine with **Download File** or **HTTP Utilities** for full image pipelines

---

## Notes

- This node performs resizing only
- No cropping, compression, or format conversion is applied
- Future Image Tools may expand with additional capabilities