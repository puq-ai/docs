---
title: Jira
description: Learn how to connect to Jira in puq.ai
parent: Connections
nav_order: 8.5
---

# Jira
Connect Jira to puq.ai to create, read, update, and transition issues, manage comments, attachments, and users, and to trigger workflows from Jira webhook events.

## Prerequisites
- An Atlassian account with access to the Jira site you want to connect.
- The site's domain (its Atlassian Cloud URL, for example `https://yourcompany.atlassian.net`).

## Step 1
Sign in to Atlassian and open your API token settings:
https://id.atlassian.com/manage-profile/security/api-tokens

## Step 2
Click **Create API token**, give it a label, and click **Create**.

## Step 3
Copy the generated token. Atlassian shows it only once — if you lose it, create a new one.

## Step 4: Add the connection in puq.ai
1. Open the left sidebar and go to **Connections**.
2. Click **New Connection**.
3. Select **Jira**.
4. Enter a name for the connection.
5. Fill in the fields:

| Field | Required | Description |
|---|---|---|
| Email | Yes | Your Atlassian account email address, e.g. `test@example.com`. |
| API Token | Yes | The API token created in Step 3. |
| Domain | Yes | Your Jira domain, e.g. `https://test.atlassian.net`. |

6. Click **Save**.

## Common errors
- **401 Unauthorized**: the email doesn't match the account the API token belongs to, or the token was revoked — create a new token and update the connection.
- **404 / site not found**: the Domain field doesn't match the site's Atlassian Cloud URL exactly (check for typos, and make sure it includes `https://`).
- **403 Forbidden**: the Atlassian account doesn't have permission in Jira for the project or action being used.
