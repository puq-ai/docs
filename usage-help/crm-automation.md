---
title: CRM Automation
description: Automate lead capture, data enrichment, and CRM updates using puq.ai.
parent: Usage Help
nav_order: 1
---

# CRM Automation

Automatically capture leads from various sources, enrich them with additional data, and push them to your CRM — all without writing code.

---

## Use Case

A new lead fills out a form on your website. You want to:

1. Capture the lead data
2. Enrich it with company information
3. Create a contact in your CRM
4. Notify your sales team

---

## Step 1: Set Up a Trigger

Start by adding a **Webhook Trigger** node to your workflow. This gives you a unique URL that your website form can send data to.

1. Open the workflow builder
2. Add a **Webhook Trigger** node
3. Copy the webhook URL
4. Configure your website form to POST data to this URL

---

## Step 2: Add Data Enrichment

Add an **HTTP Utilities** node after the trigger to call an enrichment API (such as Clearbit or similar).

1. Add an **HTTP Utilities** node
2. Set the method to `GET`
3. Map the lead's email from the trigger output into the API request
4. The response will include company name, industry, and other details

---

## Step 3: Push to Your CRM

Add a CRM node (e.g. **HubSpot**, **Salesforce**, or **Pipedrive**) to create a new contact.

1. Add your CRM node
2. Select the **Create Contact** action
3. Map the enriched fields into the CRM fields:
   - Name
   - Email
   - Company
   - Industry

> Make sure you have already set up a [Connection]({{ '/connections' | relative_url }}) for your CRM before using the node.

---

## Step 4: Notify Your Sales Team

Add a notification node to alert your team about the new lead.

1. Add a **Gmail** or **Webex** node
2. Compose a message with the lead details
3. Map the relevant fields into the message body

---

## Step 5: Test and Publish

1. Click **Test** to run the workflow with sample data
2. Check each node's output in the [Execution log]({{ '/executions' | relative_url }})
3. Once everything works, click **Publish** to activate the workflow

---

## Best Practices

- Use a **Data Validator** node after the trigger to ensure required fields (email, name) are present
- Add error handling with a **Router** node to catch API failures
- Use the **Delay Utilities** node if your enrichment API has rate limits
