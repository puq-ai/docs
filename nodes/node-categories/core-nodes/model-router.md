---
title: Model Router
description: Generate AI chat replies, images, speech, transcriptions, and video through puq.ai's built-in AI model router.
parent: Core Nodes
nav_order: 10
---

# Model Router

The **Model Router** piece calls AI models — for chat, images, speech, transcription, and video — through puq.ai's own router, without connecting a separate provider account. It has five actions:

- **AI Chat Model**
- **Generate Image**
- **Generate Speech**
- **Transcribe Audio**
- **Generate Video**

It's found under the **Core** and **Universal AI** categories in the Add Step panel.

---

## How It Works

1. Add a Model Router step and pick one of its five actions.
2. Pick a model from that action's model dropdown — the list is fetched live from puq.ai's model catalog and only includes models that support that action.
3. Fill in the action's fields (prompt, text, file, etc.).
4. puq.ai sends the request to the matching provider and returns the result as the step's output.
5. Usage is billed to your puq.ai account balance — see [Billing](#billing).

See [AI Models](/models/) for the full list of available models and their capabilities.

---

## AI Chat Model

Generate a chat/text response from a prompt.

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Chat Model** | Yes | `openai/gpt-4o-mini` | Chat model to use for text generation |
| **Prompt** | Yes | — | Prompt to generate |
| **File** | No | — | Optional image, PDF, or text/code file (up to 20 MB) to include with the prompt, for models that support multimodal input |
| **Max Tokens** | Yes | `2000` | Max tokens to generate |
| **Temperature** | Yes | `0.5` | Temperature to generate |

{: .note }
Temperature is left out of the request automatically for reasoning models (the o1/o3/gpt-5 family) that reject a non-default value.

**Output**: `content` — the model's reply (string). If the provider's response doesn't include the usual message content, the raw provider response is returned instead.

---

## Generate Image

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Image Model** | Yes | `openai/gpt-image-2` | Image model to use, in provider/model format |
| **Prompt** | Yes | — | A text description of the desired image |
| **Number of Images** | No | `1` | Number of images to generate (1–10) |
| **Size** | No | Auto | Auto, 1024x1024, 1536x1024, or 1024x1536 — used only by GPT Image–style models |
| **Quality** | No | Auto | Auto, Low, Medium, or High — used only by GPT Image–style models |
| **Style** | No | Vivid | Vivid or Natural — used only by non-GPT-Image models |
| **Response Format** | No | Base64 JSON | Base64 JSON or URL — used only by non-GPT-Image models |
| **File Name** | No | — | Optional filename for the first saved image, for example `image.png` |
| **Source Image** | No | — | Optional image to restage; used only by models that support an image input (for example `google/nano-banana-2`) |
| **Aspect Ratio** | No | — | Optional ratio for models that size by ratio instead of pixels, for example `1:1`, `9:16`, `16:9` |

{: .note }
Choose **Base64 JSON** for **Response Format** if you want the generated image saved as a workflow file. Generated image data is capped at 16 MB.

**Output** (main fields): `success`, `data` (raw provider data), and — when the image comes back as base64 — `file` (`filename`, `url`, `fileKey`, `contentType`, `size`) plus `image_url`, `filename`, `content_type`, and `size_bytes` for the first image, and `images` for all of them.

---

## Generate Speech

Convert text to spoken audio.

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Speech Model** | Yes | — | Text-to-speech model to use |
| **Text** | Yes | — | Text to convert to speech |
| **Voice** | No | — | Optional provider-specific voice name; leave empty to use the model's own default |
| **Response Format** | No | — | Optional audio format such as `mp3`, `opus`, `aac`, or `flac` (provider-specific) |
| **Speed** | No | — | Playback speed, typically `0.25`–`4.0` |

Generated audio is capped at 25 MB.

**Output**: `success`, `filename`, `content_type`, `size_bytes`, and `file` (`filename`, `url`, `fileKey`, `contentType`, `size`).

---

## Transcribe Audio

Transcribe spoken audio to text.

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Transcription Model** | Yes | — | Speech-to-text model to use |
| **Audio File** | Yes | — | Audio file to transcribe (`.mp3`, `.mp4`, `.mpeg`, `.mpga`, `.m4a`, `.wav`, `.webm`, `.flac`, `.ogg`, up to 25 MB) |
| **Language** | No | — | Optional ISO 639-1 language code, for example `en` |
| **Prompt** | No | — | Optional text to guide the transcription style |
| **Response Format** | No | — | `json`, `text`, `srt`, `verbose_json`, or `vtt` (provider-specific) |

**Output**: `text` (the transcribed text) and `raw` (the full provider response).

---

## Generate Video

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| **Video Model** | Yes | — | Video generation model to use |
| **Prompt** | Yes | — | A text description of the desired video |
| **Duration (seconds)** | No | `5` | Requested clip length in seconds (provider-specific) |
| **Size** | No | `1280x720` | Requested resolution (provider-specific) |
| **Reference Image** | No | — | Optional starting image, for models that support image-to-video |

Generated video is capped at 200 MB.

**Output**: `success`, `filename`, `content_type`, `size_bytes`, `seconds`, and `file` (`filename`, `url`, `fileKey`, `contentType`, `size`).

---

## Choosing a Model

Each action's model dropdown lists only the models that support that action, fetched live from puq.ai's model catalog:

- If the catalog can't be loaded, the dropdown is disabled with "Failed to load models."
- If no available model supports the action, it's disabled with a message such as "No chat completion models available."

---

## Billing

Model Router actions run through your own account's request key (created automatically the first time you use one, visible under [API Keys](/account/api-keys/)) and are billed against your puq.ai [account balance](/account/billing/) — not a separate per-provider subscription.

If your balance is too low, the step fails with **"Insufficient balance. Please top up your account."**

---

## Best Practices

- Keep prompts specific and well-scoped.
- Use a lower **Temperature** for predictable, automation-style text and a higher one for creative content.
- Watch the file size limits on **File**, **Audio File**, **Source Image**, and **Reference Image** — oversized files are rejected.
- Check [AI Models](/models/) before building a workflow around a specific model, since availability depends on your workspace.
