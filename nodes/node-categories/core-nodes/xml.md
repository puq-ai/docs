---
title: XML
description: Parse and generate XML data in puq.ai workflows using XPath queries and structured JSON inputs.
parent: Core Nodes
nav_order: 17
---

# XML Parser

The **XML Parser** node allows you to work with XML data inside puq.ai workflows.  
It supports both **parsing XML into structured data** and **generating XML documents** from JSON inputs.

This node is commonly used when integrating with legacy systems, SOAP-based APIs, RSS feeds, or XML-based services.

---

## Parse XML

The **Parse XML** action reads XML content and converts it into structured output that can be used in subsequent workflow steps.

### Inputs

- **XML Content** *(required)*  
  The raw XML string to parse.

- **XPath Query** *(optional)*  
  XPath expression to extract specific parts of the XML document.  
  Example:
  ```
  //item/title
  ```

- **Output Format**  
  Defines how parsed data is returned:
  - Array
  - Object

- **Preserve Attributes**  
  Include XML attributes in the output.

- **Namespace Aware**  
  Enables namespace handling for XML documents with namespaces.

- **Validate XML**  
  Validates XML structure before parsing.

- **Max Depth**  
  Maximum allowed XML nesting depth (default: 50).

- **Max Elements**  
  Maximum number of XML elements to parse (default: 10,000).

### Output

- Structured data based on the selected output format
- Extracted nodes when XPath is used
- Validation errors if XML is malformed (when validation is enabled)

---

## Generate XML

The **Generate XML** action creates a valid XML document from JSON data.

### Inputs

- **JSON Data** *(required)*  
  JSON structure that will be converted into XML.

- **Root Element**  
  Name of the root XML element (default: `root`).

- **Encoding**  
  XML encoding (default: UTF-8).

- **XML Version**  
  XML declaration version (default: 1.0).

- **Format Output**  
  Enables indentation for readable XML.

- **Item Wrapper**  
  Element name used for array items (default: `item`).

- **Max Depth**  
  Maximum allowed XML nesting depth.

- **Max Elements**  
  Maximum number of XML elements allowed in the generated output.

### Output

- A valid XML document as a string
- Properly nested XML structure based on input JSON

---

## Common Use Cases

- Parsing XML responses from APIs
- Working with SOAP or legacy integrations
- Reading XML-based configuration files
- Converting structured data into XML for export
- Generating XML feeds or documents

---

## Best Practices

- Use **XPath Query** to reduce unnecessary data processing.
- Enable **Validate XML** when working with external sources.
- Set **Max Depth** and **Max Elements** to avoid performance issues.
- Prefer **Format Output** for debugging and readability.
- Ensure JSON input structure matches the desired XML schema.

---

## Summary

The XML Parser node provides a reliable way to handle XML data in puq.ai workflows, enabling both modern and legacy system integrations with full control over structure, validation, and output format.