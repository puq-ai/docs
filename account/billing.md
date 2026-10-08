---
title: Billing
description: Manage your puq.ai plan, credit balance, payment cards, and invoices.
parent: Account & Billing
nav_order: 2
permalink: /account/billing/
---

# Billing

Billing settings are split across several pages, all reachable from **Settings → Billing** in the
sidebar:

| Page | URL | What it's for |
|------|-----|----------------|
| Overview | `/settings/billing` | Current plan, credit balance, payment method, quick actions |
| Balance & Top-Up | `/settings/balance-top-up` | Add credit to your balance |
| Transactions | `/settings/balance-transactions` | History of balance changes (credits and debits) |
| Payment Cards | `/settings/payment-cards` | Saved cards |
| Billing History | `/settings/billing-history` | Payment transactions (top-ups, subscription charges, refunds…) |
| Preferences | `/settings/billing/preferences` | Invoice address and billing contact |

Two other billing pages are linked from Overview rather than the sidebar: **Pricing**
(`/settings/pricing`) to choose a plan, **Redeem Coupon** (`/settings/credit-coupon-redeem`) to
redeem a credit coupon, and **Subscription Coupon History** (`/settings/subscription-coupon-history`)
to see coupons applied to your subscription.

{: .note }
Creating a subscription, saving a payment card, and topping up your balance all require a
**verified email address**. If it isn't verified, the Overview page shows a banner with a
**Resend Email** button.

## Subscription vs. credit balance

puq.ai separates two kinds of billing:

- **Subscription** — a recurring plan (shown under **Current Plan**) that determines limits such
  as active workflows and monthly executions. See [Workflow Limits](/workflows/limits/) for what
  each plan allows.
- **Credit balance** — a prepaid balance (shown under **Credit Balance**) that workflow and AI
  usage draws down from, independent of your subscription.

Exact plan names, prices, and features are configured on puq's side and shown live on the
[Pricing](#plans--subscribing) page — they are not fixed values in this documentation.

## Plans & subscribing

1. From the Overview page, click **Change Plan** (or **Continue Subscription**) to go to
   **Pricing**.
2. Pick a plan. If the plan has a coupon applied via URL, a banner confirms the discount.
3. On the checkout page, select a saved payment card or enter new card details, then confirm.

Each plan may define its own **trial period** (`trial_days`); when present, your subscription
starts in trial status and the first charge happens when the trial ends. Whether a plan has a
trial, and for how long, is defined per plan — check the plan's details on the Pricing page.

If a payment requires extra verification, puq.ai shows a **3D Secure (3DS)** challenge — you
complete it in the browser and the subscription (or payment) finalizes automatically once 3DS
succeeds or fails.

### Coupons

You can apply a coupon code while subscribing, or change the coupon on an active subscription from
the subscription card (when a coupon change is available). Use **Redeem Coupon** on the Overview
page for *credit* coupons instead (see [Credit coupons](#credit-coupons) below) — subscription
coupons and credit coupons are different features.

## Current plan status

The **Current Plan** card shows a status badge reflecting your subscription's state, for example
**active**, **trial**, **grace**, **expired**, or **cancelled** (shown as "Cancelling" while still
active but scheduled to end). Relevant banners appear above the card:

- **Payment Failed** — your last payment failed; retry with **Pay now**, optionally picking a
  different saved card first.
- **Subscription cancelled** — shown when you've cancelled but your plan is still active; you can
  **Resume Subscription** before the period ends to keep your current plan.
- **Grace period** — if a renewal payment fails, your subscription stays active for a short grace
  period so you can fix payment before access is lost.

### Cancel, resume, and pay now

- **Cancel Subscription** — available while the subscription can still be cancelled. By default,
  cancellation takes effect at the **end of the current billing period**; you keep access and are
  not charged again. If you cancel during a grace period, the cancellation takes effect at the end
  of that grace period instead.
- **Resume Subscription** — available after cancelling but before the plan has actually ended;
  resuming keeps your current plan running without interruption.
- **Pay now** — available when a payment is overdue or in its grace period. Optionally choose
  which saved card to charge, then confirm. If 3DS is required, complete the challenge shown.

## Balance & top-up

Open **Settings → Balance & Top-Up** to add credit. Enter an **Amount** between **$10 and $1,000**
per top-up, then choose a saved card or enter new card details (optionally saving it for future
use). If 3DS is required for the card/amount, complete the challenge; otherwise the balance
updates immediately on success.

### Balance transactions

**Settings → Transactions** lists every change to your balance, most recent first, each showing
the balance before/after and the amount. Transaction types you may see:

| Type | Meaning |
|------|---------|
| **Add Credit** (`credit` / `topup`) | A top-up or other credit added to your balance |
| **Usage Deduction** (`debit` / `usage` / `deduction`) | Credit spent on workflow or AI usage |
| **Subscription Payment** (`subscription`) | A subscription charge drawn from balance context |
| **Refund** (`refund`) | Credit returned, e.g. for a failed workflow app run |
| **Balance Adjustment** (`adjustment`) | A manual correction |
| **Coupon** (`coupon`) | Credit added by redeeming a credit coupon |

This is different from **Billing History**, which lists payment transactions (actual charges to
your card) rather than balance ledger entries — see [Billing history](#billing-history) below.

## Billing history

**Settings → Billing History** lists payment transactions with filters by **type** — Top-Up,
Subscription, Deduction, Refund, Chargeback, Card Registration — and by date range. Each entry
shows the amount, currency, status, and date.

## Payment cards

**Settings → Payment Cards** lists your saved cards (holder name, last four digits, card network,
bank) and which one is marked **primary** — the default card used for subscription renewals and
quick top-ups.

- **Add a card** — enter holder name, card number, expiry, and CVC. Adding a card requires a
  verified email address.
- **Set as primary** — makes a card the default for future charges.
- **Delete** — removes a saved card after confirmation.

## Credit coupons

**Settings → Redeem Coupon** (`/settings/credit-coupon-redeem`) lets you redeem a one-time credit
coupon code, adding its value directly to your credit balance. The page also lists your past
credit-coupon redemptions. This is separate from subscription coupons, which apply a recurring
discount to a subscription instead of adding balance.

## Subscription coupon history

**Settings → Subscription Coupon History** (`/settings/subscription-coupon-history`) lists coupons
that have been applied to your subscription: the code, discount percentage, how many billing
cycles it covers, how many cycles have been applied so far, and its status (**active**, **pending**,
**cancelled**, or **expired**).

## Billing preferences (invoice address)

**Settings → Preferences** stores the information used on future invoices:

- Company name, contact name, billing email
- Primary business address (country, address lines, state, ZIP/postal code, city)
- Business tax ID
- Phone number

Changes apply to future invoices only.

{: .note }
To reissue a past invoice, contact [Support](/support/).
