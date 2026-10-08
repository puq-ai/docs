---
title: Twilio
description: Learn how to connect to Twilio in puq.ai
parent: Connections
nav_order: 15.4
---

# Twilio
Connect Twilio to puq.ai to send SMS messages and make voice calls from your workflows.

## Prerequisites
- A Twilio account.
- A Twilio phone number capable of sending SMS or making calls (a trial number works for testing).

## Step 1
Sign in to the Twilio Console:
https://console.twilio.com/

## Step 2
On the Console dashboard, locate the **Account Info** panel and copy your **Account SID** and **Auth Token**. Click **View** (or the eye icon) to reveal the Auth Token.

## Step 3
Go to **Phone Numbers > Manage > Active numbers** and copy the Twilio number you want to send from, including the country code (for example `+15551234567`).

## Step 4: Add the connection in puq.ai
1. Open the left sidebar and go to **Connections**.
2. Click **New Connection**.
3. Select **Twilio**.
4. Enter a name for the connection.
5. Fill in the fields:

| Field | Required | Description |
|---|---|---|
| Account SID | Yes | Your Twilio Account SID. |
| Auth Token | Yes | Your Twilio Auth Token. |
| From Number | Yes | Default Twilio phone number to send from, with country code. |

6. Click **Save**.

## Common errors
- **Authenticate / 20003**: the Account SID or Auth Token is wrong, or the Auth Token was regenerated in the Twilio Console after the connection was created — update the connection with the new token.
- **The number is unverified / 21608** (trial accounts): trial Twilio accounts can only send to phone numbers that have been verified in the Twilio Console. Verify the recipient number or upgrade the account.
- **Invalid From Number / 21212**: the From Number isn't a valid Twilio number on the account, or it's missing the country code.
