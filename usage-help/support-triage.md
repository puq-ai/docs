---
title: Support Triage
description: Classify and route support tickets automatically using AI in puq.ai.
parent: Usage Help
nav_order: 2
---

# Support Triage

Use AI to automatically classify incoming support tickets by category and urgency, then route them to the right team.

---

## Use Case

Your support team receives tickets via email or a helpdesk tool. You want to:

1. Receive the ticket data
2. Classify it using AI (billing, technical, general)
3. Assign a priority level (high, medium, low)
4. Route it to the correct team or channel

---

## Step 1: Set Up a Trigger

Add a **Webhook Trigger** or **Gmail Trigger** to capture incoming tickets.

- **Webhook Trigger** — If your helpdesk sends webhooks on new tickets
- **Gmail Trigger** — If tickets come in as emails to a support inbox

---

## Step 2: Classify with AI

Add an **AI Chat Model** node to analyze the ticket content.

1. Add a AI Chat Model node and select your preferred model
2. Write a prompt that instructs the model to classify the ticket:

{% raw %}
```
Analyze the following support ticket and return a JSON response with:
- "category": one of "billing", "technical", "general"
- "priority": one of "high", "medium", "low"

Ticket: {{trigger.body}}
```
{% endraw %}

3. Map the trigger output (ticket body) into the prompt

---

## Step 3: Route Based on Classification

Add a **Router** node to branch the workflow based on the AI's classification.

1. Add a **Router** node after the AI node
2. Create conditions:
   - If `category == "billing"` → route to billing team
   - If `category == "technical"` → route to engineering team
   - If `priority == "high"` → send urgent notification

---

## Step 4: Send Notifications

For each branch, add a notification action:

- **Gmail** — Send an email to the relevant team
- **Webex** — Post to a team channel
- **Pushbullet** — Send a push notification for urgent tickets

Map the ticket details and AI classification into the message.

---

## Step 5: Test and Publish

1. Test with sample ticket data
2. Review the AI classification output in the execution log
3. Verify that routing logic sends to the correct branches
4. Publish the workflow

---

## Best Practices

- Include example classifications in your AI prompt for better accuracy
- Add a fallback branch in Router for unrecognized categories
- Log all classifications for auditing and improving the AI prompt over time
