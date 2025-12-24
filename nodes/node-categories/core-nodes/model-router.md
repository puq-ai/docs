---
title: Model Router
description: Generate AI-powered text responses using a unified AI Chat Model interface.
parent: Core Nodes
nav_order: 10
---

# Model Router (AI Chat Model)

The **Model Router** node allows you to generate text responses using Large Language Models (LLMs) through a single, unified interface.  
Instead of integrating each AI provider separately, puq.ai abstracts model selection and execution behind this node.

This makes it easy to switch models, experiment with prompts, and control generation behavior without changing your workflow logic.

---

## What the Model Router Does

The Model Router:
- Sends a prompt to a selected AI chat model
- Generates a text-based response
- Returns the result as structured output for downstream nodes
- Centralizes AI usage across different providers

It is typically used for:
- Text generation
- Summarization
- Classification
- Content transformation
- Conversational responses

---

## Configuration Fields

### Chat Model
Select the AI model used for generation.

This field determines:
- Which provider is used
- Model capabilities (context length, speed, quality)
- Cost and performance characteristics

> **Note:** Available models depend on your workspace configuration and enabled providers.

---

### Prompt
The text input sent to the model.

This can be:
- Static text
- Dynamic data mapped from previous nodes
- Combined prompts using parameter mapping

**Example:**
```
Summarize the following customer feedback in one sentence.
```

---

### Max Tokens
Defines the maximum number of tokens the model can generate.

- Higher values → longer responses
- Lower values → shorter, more controlled output
- Prevents excessive or runaway generations

Typical ranges:
- Short responses: 200–500
- Long content: 1000–3000

---

### Temperature
Controls randomness and creativity in the response.

- **Low values (0.1–0.3):** Deterministic, factual, consistent
- **Medium values (0.4–0.7):** Balanced responses
- **High values (0.8–1.0):** Creative, varied output

---

## Output

The node outputs:
- Generated text
- Metadata (model used, token usage, timing)

This output can be:
- Passed into other nodes
- Stored
- Further processed or validated

---

## Common Use Cases

- Generate AI responses from user input
- Enrich data with AI-generated summaries
- Classify or rewrite text
- Build conversational workflows
- Create AI-powered decision points

---

## Best Practices

- Keep prompts explicit and well-scoped
- Use lower temperatures for automation logic
- Limit max tokens to control cost and latency
- Combine with **Data Passing** and **Parameter Mapping** for dynamic prompts

---

## Summary

The Model Router node provides:
- Unified access to AI chat models
- Configurable generation behavior
- Clean separation between AI logic and workflow structure
- Easy experimentation and model switching

It is the foundation for AI-powered automation inside puq.ai.