---
title: Security
description: How puq.ai encrypts connection credentials and lets you choose an encryption provider.
nav_order: 8.7
has_children: false
permalink: /security/
---

# Security

puq.ai encrypts sensitive values — connection credentials and custom OAuth2 app client secrets —
before storing them, using a pluggable **encryption provider**. You manage this from
**Settings → Encryption** (`/settings/encryption`).

## What gets encrypted

When you save a connection, any field recognized as sensitive is encrypted before it's stored.
This includes well-known key names such as `apiKey`, `accessToken`, `refreshToken`, `clientSecret`,
`password`, `privateKey`, and `secret` (in either `camelCase` or `snake_case`), plus any field a
piece explicitly defines as a secret in its authentication form (for example, a custom API key
field on a Custom Auth or OAuth2 connection). The **client secret** of a
[custom OAuth2 app](/connections/custom-oauth2-apps/) is encrypted the same way.

Encrypted values are never shown again in full — the Encryption and OAuth2 Apps pages mask them
(for example, a saved OAuth2 client secret is shown as a password-style placeholder; you can leave
it blank when editing to keep the existing value, or enter a new one to replace it).

## Encryption providers

Three providers are available, and you can switch between them:

| Provider | Description |
|----------|--------------|
| **Internal Database Vault** (default) | Stores encrypted data securely in the application database using AES-256 encryption. |
| **AWS Key Management Service (KMS)** | Uses AWS KMS for enterprise-grade key management and encryption. |
| **Azure Key Vault** | Uses Azure Key Vault for centralized secrets management and hardware security modules. |

The **Internal** provider is always available and configured by default. AWS KMS and Azure Key
Vault must be configured with your own credentials before you can switch to them.

### Configuring AWS KMS

Click **Configure** on the AWS KMS card and provide:

- **Access Key ID**
- **Secret Access Key**
- **Region** (select from the AWS region list)
- **Key ID** (your KMS key ID, key ARN, or alias)

puq.ai tests the connection before saving. Under the hood, AWS KMS generates a data encryption key
per value; the value is encrypted locally with that key (AES-256-CBC), and the key itself is
protected by your AWS KMS key.

### Configuring Azure Key Vault

Click **Configure** on the Azure Key Vault card and provide:

- **Vault URL**
- **Tenant ID**
- **Client ID**
- **Client Secret**

puq.ai tests the connection before saving. Azure Key Vault works the same way as AWS KMS: a local
data encryption key is generated per value, the value is encrypted locally (AES-256-CBC), and the
key is encrypted with your Azure Key Vault key (RSA-OAEP-256).

## Switching providers

You can only select a provider that is already configured. Switching providers changes which
provider encrypts **new** secrets going forward — it does not re-encrypt existing data.

- Data encrypted under your previous provider stays accessible through that same provider as long
  as it remains configured.
- **Reconfiguring** credentials for a provider that was previously used to encrypt data can make
  that data unreadable, because the keys needed to decrypt it may change. Before you reconfigure
  AWS KMS or Azure Key Vault, puq.ai shows a warning listing which saved connections currently hold
  values encrypted with that provider, so you can review the impact first.

{: .warning }
Reconfiguring an external provider (changing its stored credentials) can permanently break access
to values it previously encrypted. Review the affected-connections list puq.ai shows before
continuing.

## Related

- [Custom OAuth2 Apps](/connections/custom-oauth2-apps/) — client secrets for your own OAuth2 apps
  are encrypted the same way as connection credentials.
- [API Keys](/account/api-keys/) — manage keys used to authenticate API requests.
