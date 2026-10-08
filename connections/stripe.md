---
title: Stripe
description: Learn how to connect to Stripe in puq.ai
parent: Connections
nav_order: 15.2
---

# Stripe
Connect Stripe to puq.ai to process payments, manage customers, payment methods, subscriptions, products, prices, and coupons from your workflows, and to trigger workflows from Stripe webhook events.

## Prerequisites
- A Stripe account.
- Access to the Stripe Dashboard with permission to view API keys.

## Step 1
Sign in to your Stripe Dashboard:
https://dashboard.stripe.com/

## Step 2
Go to **Developers > API keys**.

## Step 3
Under **Standard keys**, copy your **Secret key**. It starts with `sk_`.

Use a test-mode secret key while you build and test a workflow, and switch to a live-mode secret key only when you are ready to process real payments.

{: .note }
Stripe shows the full secret key only once, right after it's created or rolled. If you've lost it, generate (roll) a new key from the same page.

## Step 4: Add the connection in puq.ai
1. Open the left sidebar and go to **Connections**.
2. Click **New Connection**.
3. Select **Stripe**.
4. Enter a name for the connection.
5. Paste the secret key into the **Secret Text** field.
6. Click **Save**.

## Common errors
- **Invalid API Key provided**: the key was copied incorrectly (extra spaces or a truncated value), or it was revoked/rolled in the Stripe Dashboard.
- **No such customer / No such product / No such price**: the connection is pointed at the wrong Stripe mode — a test-mode key cannot see live-mode data and a live-mode key cannot see test-mode data.
- **Permission denied**: a restricted key is being used that does not have access to the resource the action is trying to read or write. Use a key with the required permissions, or the account's standard secret key.
