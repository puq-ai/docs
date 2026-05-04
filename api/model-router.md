---
title: Model Router
description: Introduction to puq.ai model router API usage.
nav_order: 7
parent: API
has_children: true
has_toc: true
---

# Overview Model Router

The puq.ai AI Engine API provides access to AI models, audio processing, and image generation through a unified Model Router. You can manage your API keys and interact with various AI providers using a single base URL.


## Base URL

```
https://api.puq.ai
```

All endpoints are relative to this base URL.

---

## Authentication

Include your API key in the `Authorization` header of every request. Format:

```
Authorization: Token <api_key>
```

API keys grant access based on the models assigned to them.

---

## Model Naming Convention

Models always use the format `provider/model_name`. For example:

- `openai/gpt-4o`
- `openai/gpt-4o-mini`

Use the [GET /router/models](endpoints#list-available-models) endpoint to see all available models.

---


## Balance Requirement

All endpoints check your account balance before processing a request. If your balance is **0 or below**, the API returns:

```
HTTP 402 Payment Required
```

Key management endpoints (`/keys`) are not balance-gated.

---

# API Endpoin

## Chat Completions

`POST /chat/completions`

Generate chat completions using LLM models. Supports SSE streaming with `stream: true`.

### Request Body

| Parameter               | Type    | Required | Description                                        |
| ----------------------- | ------- | -------- | -------------------------------------------------- |
| `model`                 | string  | Yes      | Model to use (e.g. `openai/gpt-4o`)                |
| `messages`              | array   | Yes      | Array of message objects with `role` and `content` |
| `stream`                | boolean | No       | Enable SSE streaming (default: `false`)            |
| `temperature`           | number  | No       | Sampling temperature (e.g. `0.7`)                  |
| `max_completion_tokens` | integer | No       | Maximum tokens in the response                     |

### Example Request

```bash
curl -X POST https://api.puq.ai/chat/completions \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ],
    "stream": false,
    "temperature": 0.7,
    "max_completion_tokens": 1000
  }'
```

### Streaming

Set `stream: true` to receive the response as Server-Sent Events (SSE). Each event contains a delta of the response, allowing you to display output incrementally.

---

## Text-to-Speech (TTS)

`POST /audio/speech`

Convert text to speech audio.

### Request Body

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `model`   | string | Yes      | TTS model to use            |
| `input`   | string | Yes      | Text to convert to speech   |
| `voice`   | string | No       | Voice to use (e.g. `alloy`) |

### Example Request

```bash
curl -X POST https://api.puq.ai/audio/speech \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/tts-1",
    "input": "Hello, welcome to puq.ai!",
    "voice": "alloy"
  }' \
  --output speech.mp3
```

---

## Speech-to-Text (STT)

`POST /audio/transcriptions`

Transcribe audio files to text. Uses `multipart/form-data` for file upload.

### Request Body

| Parameter  | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| `file`     | file   | Yes      | Audio file to transcribe  |
| `model`    | string | Yes      | STT model to use          |
| `language` | string | No       | Language code (e.g. `en`) |

### Example Request

```bash
curl -X POST https://api.puq.ai/audio/transcriptions \
  -H "Authorization: Token YOUR_API_KEY" \
  -F file=@audio.mp3 \
  -F model="openai/whisper-1" \
  -F language="en"
```

---

## Image Generation

`POST /images/generations`

Generate images from text prompts.

### Request Body

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `model`   | string | Yes      | Image model to use                   |
| `prompt`  | string | Yes      | Description of the image to generate |
| `size`    | string | No       | Image size (e.g. `1024x1024`)        |

### Example Request

```bash
curl -X POST https://api.puq.ai/images/generations \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/dall-e-3",
    "prompt": "A sunset over the mountains",
    "size": "1024x1024"
  }'
```