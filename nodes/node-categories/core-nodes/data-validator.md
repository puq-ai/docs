---
title: Data Validator
description: Validate common data types (email, password, phone, credit card, date, URL, markdown) with configurable rules and batch support.
parent: Core Nodes
nav_order: 3
---

# Data Validator Nodes

The **Data Validator** nodes help you validate and sanitize inputs before they move deeper into your workflow.

Validation is not “nice to have” — it prevents:
- Bad data entering your systems
- Failed API calls due to invalid input
- Security issues (weak passwords, unsafe URLs, malformed markdown)
- Costly downstream errors (wrong dates, broken contact info, incorrect phone formats)

Most validators support **batch validation**, which means you can validate multiple values at once (useful for imports, forms, lists, and bulk processing).

puq.ai provides **7 validators**:
1. Validate Email  
2. Validate Password  
3. Validate Phone Number  
4. Validate Credit Card  
5. Validate Date  
6. Validate URL  
7. Validate Markdown  

---

## General Validation Pattern

Most validator nodes follow the same pattern:

1. Provide input data (single value, array, or JSON object depending on the validator)
2. Configure validation rules (strictness, formats, extra checks)
3. Receive structured output indicating:
   - Valid vs invalid values
   - Normalized formats (optional)
   - Suggestions (optional)
   - Error reasons (when validation fails)

---

# 1) Validate Email

### Input Example
```json
{
  "emails": [
    "test@example.com",
    "user@gmail.com",
    "admin@company.org",
    "invalid.email",
    "contact@domain.co.uk"
  ]
}
```

### Options
- Check MX Records  
- Allow International Domains  
- Strict Mode  
- Suggest Corrections  

---

# 2) Validate Password

### Input Example
```json
{
  "passwords": [
    "MyPassword123!",
    "weakpass",
    "StrongP@ssw0rd2024"
  ]
}
```

### Options
- Strength Level  
- Min / Max Length  
- Character Requirements  
- Dictionary & Pattern Checks  

---

# 3) Validate Phone Number

### Input Example
```json
{
  "phone_numbers": [
    "+1-555-123-4567",
    "+90 532 123 45 67"
  ]
}
```

### Options
- Default Country  
- Validation Level  
- Format Output  
- Carrier Detection  

---

# 4) Validate Credit Card

### Input Example
```json
[
  "4111111111111111",
  "5555555555554444"
]
```

### Options
- Validation Level  
- Allowed Card Types  
- Mask Numbers  

---

# 5) Validate Date

### Input Example
```json
{
  "dates": [
    "2023-12-25",
    "invalid-date"
  ]
}
```

### Options
- Expected Format  
- Min / Max Date  
- Business Days Rules  

---

# 6) Validate URL

### Input Example
```json
{
  "urls": [
    "https://www.google.com",
    "invalid-url"
  ]
}
```

### Options
- Validation Level  
- Protocol Rules  
- SSL & Accessibility Checks  

---

# 7) Validate Markdown

### Input Example
```json
[
  "# Title\n\nSome markdown content"
]
```

### Options
- Validation Level  
- Structure & Syntax Rules  
- Content Constraints  

---

## Summary

Data Validator nodes ensure your workflows operate on clean, safe, and reliable data.
