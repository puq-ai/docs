---
title: AI-Powered Workflows
description: Integrate AI models into your workflows for intelligent automation in puq.ai.
parent: Usage Help
nav_order: 5
---

# AI-Powered Workflows

Use AI models to add intelligence to your automations — from content generation to data analysis and decision-making.

---

## Use Case Examples

- Generate product descriptions from raw specifications
- Summarize long documents or emails
- Extract structured data from unstructured text
- Make decisions based on natural language input

---

## Step 1: Add an AI Node

1. Open the workflow builder
2. Add an **AI Chat Model** node from the node palette
3. Select your preferred AI model

---

## Step 2: Write Your Prompt

The prompt is the instruction you give to the AI model. Write it clearly and include the data you want processed.

**Example: Content Generation**

{% raw %}
```
Write a product description for the following item:

Name: {{trigger.product_name}}
Features: {{trigger.features}}
Price: {{trigger.price}}

Keep it under 100 words. Use a professional tone.
```
{% endraw %}

**Example: Data Extraction**

{% raw %}
```
Extract the following fields from the text below and return as JSON:
- name
- email
- phone
- company

Text: {{trigger.body}}
```
{% endraw %}

**Example: Summarization**

{% raw %}
```
Summarize the following email in 2-3 bullet points:

{{gmail.body}}
```
{% endraw %}

---

## Step 3: Use the AI Output

The AI node outputs the model's response as text. You can:

- **Map it directly** into another node (e.g. Gmail body, CRM field)
- **Parse it** with a JSON node if you asked the AI to return structured data
- **Branch on it** with a Flow Control node for decision-making

---

## Step 4: Chain Multiple AI Steps

You can use multiple AI Chat Model nodes in sequence for complex tasks:

1. **AI Node 1** — Extract key information from raw input
2. **AI Node 2** — Generate a response based on the extracted data
3. **AI Node 3** — Translate the response to another language

Each node can use the output of the previous one through parameter mapping.

---

## Step 5: Test and Publish

1. Test with real input data to evaluate the AI output quality
2. Adjust your prompt based on the results
3. Publish when satisfied

---

## Best Practices

- Be specific in your prompts — vague instructions produce vague results
- Ask for structured output (JSON) when you need to use the result in other nodes
- Include examples in your prompt for better accuracy
- Test with varied inputs to ensure the AI handles edge cases
- Use **Router** after AI Chat Model nodes to handle unexpected or empty responses
