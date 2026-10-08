---
title: Custom OAuth2 Apps
description: Use your own OAuth2 client credentials instead of puq.ai's default app when connecting a service.
parent: Connections
nav_order: 1.5
permalink: /connections/custom-oauth2-apps/
---

# Custom OAuth2 Apps

For services that connect via OAuth2, puq.ai provides a default (shared) OAuth2 app so you can
connect with one click. If you'd rather authorize using your **own** OAuth2 client — for example to
use your own API quotas, branding, or scopes — register a **Custom OAuth2 App** from
**Settings → OAuth2 Apps** (`/settings/oauth2-apps`).

## Creating an app

1. Click **Create OAuth2 App**.
2. Choose a **piece** — only pieces that support OAuth2 are listed (searchable by name).
3. Fill in the form:
   - **Name** (2–100 characters)
   - **Client ID**
   - **Client Secret**
   - **Description** (optional, up to 500 characters)
4. Click **Create App**.

The client secret is encrypted before storage — see [Security](/security/) for how. It is never
shown again; when editing an app later, the field displays a placeholder and you can leave it
blank to keep the existing secret or enter a new one to replace it.

{: .note }
If your account's encryption provider isn't available (for example, an external provider that
needs reconfiguring), the save fails with an error and a link to **Open Encryption Settings**.

## The redirect URI

Before the authorization will work, you must register puq.ai's OAuth2 redirect URI with the
**service you're connecting to** (in that service's own developer/app console), exactly as:

```
https://app.puq.ai/oauth2/callback
```

This is the same redirect URI puq.ai uses for every OAuth2 connection — custom app or default.

## Using a custom app when creating a connection

When you create (or reconnect) a connection for a piece that uses OAuth2, the connection form
shows an **OAuth2 App** selector:

- **Use Default (puq.ai)** — shown only for pieces that have a system-wide default app; this is
  the recommended option unless you specifically need your own client.
- **Your apps** — any custom OAuth2 app you've created for that piece. Inactive apps are labeled
  **Inactive**.
- **Create New App** — opens the same creation form described above without leaving the
  connection dialog.

If a piece has no default app, selecting a custom app is required to connect.

## Managing apps

From the OAuth2 Apps list you can:

- **Search** apps by name or piece.
- **Edit** an app — update its name, client ID, client secret, description, or toggle **Active
  Status**. When disabled, an app is no longer offered for new connections.
- **Delete** an app.

## Related

- [Add a Connection](/connections/add-connection/)
- [Security](/security/) — how client secrets and connection credentials are encrypted
