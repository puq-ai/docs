---
title: Shopify
description: Learn how to connect to Shopify in puq.ai
parent: Connections
nav_order: 15.1
---

# Shopify
Connect Shopify to puq.ai to manage products, orders, and customers in your store, and to trigger workflows from Shopify webhook events.

## Prerequisites
- A Shopify store.
- Admin access to the store to create a custom app (Store owner, or Apps and channels permission).

## Step 1
In your Shopify admin, go to **Settings > Apps and sales channels > Develop apps**.

## Step 2
If this is the first custom app for the store, click **Allow custom app development** and confirm.

## Step 3
Click **Create an app**, give it a name, and click **Create app**.

## Step 4
Open the **Configuration** tab and configure the **Admin API** scopes your workflow needs (for example, `read_products`, `write_products`, `read_orders`, `write_orders`, `read_customers`, `write_customers`). Save the configuration.

## Step 5
Go to the **API credentials** tab and click **Install app** to install it on your store.

## Step 6
On the same **API credentials** tab you now have two ways to authenticate — use either one:
- **Admin API access token**: click **Reveal token once** and copy the value. It starts with `shpat_`. Shopify shows it only once, so copy it immediately.
- **Client ID and Client Secret**: copy both values shown on the page. Shopify only allows this method on some shops.

{: .note }
If the Admin API access token works on your shop, prefer it — it's simpler and supported on every shop.

## Step 7: Add the connection in puq.ai
1. Open the left sidebar and go to **Connections**.
2. Click **New Connection**.
3. Select **Shopify**.
4. Enter a name for the connection.
5. Fill in the fields:

| Field | Required | Description |
|---|---|---|
| Shop Subdomain | Yes | Your Shopify shop subdomain, e.g. `yourstore` for `yourstore.myshopify.com`. |
| Admin API Access Token | No | The access token from Step 6, starting with `shpat_`. Leave empty to use Client ID and Client Secret instead. |
| Client ID | No | The app's Client ID from Step 6. Only needed when no Admin API access token is given. |
| Client Secret | No | The app's Client Secret from Step 6. Only needed when no Admin API access token is given. |

6. Click **Save**.

{: .warning }
Fill in either the Admin API Access Token field, or both the Client ID and Client Secret fields. Leaving all of them empty results in a connection that can't authenticate.

## Common errors
- **Unauthorized / 401**: the shop subdomain doesn't match the token, the app isn't installed on that store, or the token was revoked (reinstalling the app generates a new token).
- **403 / missing scope**: the custom app's Admin API scopes (Step 4) don't include the permission the action needs. Add the scope and reinstall the app.
- **Client ID / Client Secret rejected**: this authentication method isn't available on all shops — use the Admin API access token instead.
