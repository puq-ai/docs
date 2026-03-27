---
title: API Endpoints
description: Complete reference for all puq.ai API endpoints including chat completions, text-to-speech, speech-to-text, image generation, and model listing.
parent: API
nav_order: 3
---

# API Endpoints

All endpoints use the base URL `https://api.puq.ai`. Authentication is required for all requests. All `/*` endpoints require a positive account balance.

---

## Chat Completions

`POST /chat/completions`

Generate chat completions using LLM models. Supports SSE streaming with `stream: true`.

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Model to use (e.g. `openai/gpt-4o`) |
| `messages` | array | Yes | Array of message objects with `role` and `content` |
| `stream` | boolean | No | Enable SSE streaming (default: `false`) |
| `temperature` | number | No | Sampling temperature (e.g. `0.7`) |
| `max_completion_tokens` | integer | No | Maximum tokens in the response |

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

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | TTS model to use |
| `input` | string | Yes | Text to convert to speech |
| `voice` | string | No | Voice to use (e.g. `alloy`) |

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

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | file | Yes | Audio file to transcribe |
| `model` | string | Yes | STT model to use |
| `language` | string | No | Language code (e.g. `en`) |

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

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Image model to use |
| `prompt` | string | Yes | Description of the image to generate |
| `size` | string | No | Image size (e.g. `1024x1024`) |

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

---

## List Available Models

`GET /router/models`

Returns all available models and their pricing information.

### Example Request

```bash
curl https://api.puq.ai/router/models \
  -H "Authorization: Token YOUR_API_KEY"
```

---

## Error Responses

| Status Code | Description |
|-------------|-------------|
| `401` | Unauthorized — invalid or missing API key |
| `402` | Payment Required — account balance is 0 or below |
| `404` | Not Found — invalid endpoint |
| `422` | Unprocessable Entity — invalid request body |
| `429` | Too Many Requests — rate limit exceeded |
