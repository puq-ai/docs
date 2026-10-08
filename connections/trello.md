---
title: Trello
description: Learn how to connect to Trello in puq.ai
parent: Connections
nav_order: 15.3
---

# Trello
Connect Trello to puq.ai to manage boards, lists, and cards — including comments, labels, checklists, attachments, and members — from your workflows.

## Prerequisites
- A Trello account.
- Access to the boards you want to automate.

## Step 1
Sign in to Trello and open the API key page:
https://trello.com/app-key

## Step 2
Copy the **API Key** shown on the page.

## Step 3
On the same page, click the **Token** link to generate an API token, then click **Allow** to authorize it. Copy the generated token.

{: .note }
Trello generates the token from your own account, so it has the same access to boards as your Trello user.

## Step 4: Add the connection in puq.ai
1. Open the left sidebar and go to **Connections**.
2. Click **New Connection**.
3. Select **Trello**.
4. Enter a name for the connection.
5. Fill in the fields:

| Field | Required | Description |
|---|---|---|
| API Key | Yes | Your Trello API Key from Step 2. |
| API Token | Yes | Your Trello API Token from Step 3. |

6. Click **Save**.

## Common errors
- **invalid key**: the API Key was copied incorrectly or is missing.
- **invalid token**: the API Token was copied incorrectly, or it was generated against a different API Key.
- **unauthorized permission requested**: the action needs access (for example, to a board or organization) that the Trello account used to generate the token doesn't have.
