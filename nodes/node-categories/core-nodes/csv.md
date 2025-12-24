---
title: CSV Processor
description: Learn how to read, parse, generate, and format CSV data in puq.ai using the CSV Processor nodes.
parent: Core Nodes
nav_order: 2
---

# CSV Processor

The **CSV Processor** nodes allow you to work with CSV (Comma-Separated Values) data inside your workflows.  
They are designed to handle common data exchange scenarios such as importing datasets, validating structured data, and exporting processed results back into CSV format.

CSV Processor includes two nodes:
- **Read CSV**
- **Write CSV**

These nodes are especially useful when integrating with spreadsheets, legacy systems, data exports, or bulk-processing workflows.

---

## Read CSV Node

The **Read CSV** node reads and parses CSV data from provided input and converts it into structured data that can be used by subsequent nodes.

### Description
Read and parse CSV data from raw content or uploaded files with advanced parsing options and built-in validation.

---

### Input Configuration

#### Input Type
- Select box  
- Determines how CSV data is provided

Available options:
- **Manual CSV Input**
- **Upload CSV File**

---

#### CSV Input (Manual CSV Input)
- Appears when **Manual CSV Input** is selected
- A text area labeled **CSV Content**
- Paste or write raw CSV content directly into the field

---

#### CSV File (Upload CSV File)
- Appears when **Upload CSV File** is selected
- File upload field to upload a `.csv` file
- Below the upload field:
  - **Or paste content directly** option
  - A text area where CSV content can be pasted manually

---

### Parsing Options

#### Delimiter
- Select box  
- Defines how columns are separated

Options:
- Comma `,`
- Semicolon `;`
- Tab
- Pipe `|`
- Colon `:`
- Space

---

#### Enclosure Character
- Text input  
- Example: `"`
- Used to wrap fields containing delimiters or special characters

#### Escape Character
- Text input  
- Example: `/`
- Defines how special characters are escaped

---

#### Has Header Row
- On / Off  
- Indicates whether the first row contains column headers

---

#### Text Encoding
- Select box  
- Example: `UTF-8`
- Ensures correct character decoding

---

#### Row Limit
- Number input  
- Maximum number of rows to process  
- `0` means no limit

---

#### Skip Rows
- Number input  
- Number of rows to skip from the beginning (after header row)

---

#### Trim Whitespace
- On / Off  
- Removes leading and trailing whitespace from fields

#### Skip Empty Rows
- On / Off  
- Ignores completely empty rows

---

#### Validate Column Count
- On / Off  
- Ensures all rows have the same number of columns

---

#### Auto Detect Delimiter
- On / Off  
- Automatically detects the delimiter used in the CSV

---

#### Include Row Numbers
- On / Off  
- Adds row number metadata to parsed output

---

### Common Use Cases
- Importing spreadsheet exports
- Validating bulk data uploads
- Parsing CSV files from email or storage
- Preparing structured data for processing or APIs

---

## Write CSV Node

The **Write CSV** node generates CSV content from structured array data produced by previous workflow steps.

### Description
Generate CSV output from array-based data with advanced formatting and validation options.

---

### Input Configuration

#### Data
- Add Item input  
- Each item represents a row
- Each added item opens two text inputs (key-value structure)

This allows you to dynamically build CSV rows using workflow data.

---

### Formatting Options

#### Delimiter
- Text input  
- Defines the column separator (e.g. `,`, `;`)

#### Enclosure Character
- Text input  
- Example: `"`

#### Escape Character
- Text input  

---

#### Include Headers
- On / Off  
- Automatically includes header row

---

#### Quote Style
- Select box  

Options:
- Only when needed (default)
- All Fields
- Non-numeric only
- Never

---

#### Output Encoding
- Select box  
- Defines character encoding of the output CSV

---

#### Custom Headers
- Text area  
- Allows you to define custom column headers manually

---

#### Null Value Replacement
- Text input  
- Replaces `null` or empty values with a custom string

---

#### Max Field Length
- Number input  
- Limits maximum length of each field

---

#### Validate Data Consistency
- On / Off  
- Ensures all rows have the same number of columns

---

#### Add BOM
- On / Off  
- Adds **Byte Order Mark (BOM)** for UTF-8
- Helps compatibility with Excel and similar tools

---

### Common Use Cases
- Exporting processed data
- Generating reports
- Preparing files for download or email
- Sending structured data to external systems

---

## Best Practices

- Enable **Validate Column Count** when importing external CSVs
- Use **Auto Detect Delimiter** when source format is unknown
- Add **BOM** for CSV files intended for Excel users
- Trim whitespace to avoid hidden data issues
- Use **Custom Headers** for cleaner exports

---

## Summary

The CSV Processor nodes make it easy to integrate CSV-based data into puq.ai workflows:

- **Read CSV** converts raw CSV content into usable structured data
- **Write CSV** transforms structured workflow data back into CSV format

Together, they provide a complete solution for CSV-based data ingestion and export.