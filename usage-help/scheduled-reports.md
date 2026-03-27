---
title: Scheduled Reports
description: Generate and send recurring reports automatically using puq.ai.
parent: Usage Help
nav_order: 3
---

# Scheduled Reports

Automate the generation and delivery of daily, weekly, or monthly reports to your team.

---

## Use Case

You want to:

1. Pull data from an API or database on a schedule
2. Process and format the data
3. Send a summary report via email

---

## Step 1: Set Up a Schedule Trigger

Add a **Schedule Trigger** to run your workflow at a set interval.

1. Add a **Schedule Trigger** node
2. Configure the frequency:
   - Daily at 9:00 AM
   - Weekly on Mondays
   - Monthly on the 1st

---

## Step 2: Fetch Data

Add an **HTTP Utilities** node to pull data from your source.

1. Add an **HTTP Utilities** node
2. Set the method to `GET`
3. Enter the API endpoint URL
4. Add any required authentication headers

If you need data from multiple sources, add additional HTTP Utilities nodes or use a **Loop** node to iterate over multiple endpoints.

---

## Step 3: Process the Data

Use a **JSON** node or **AI Chat Model** node to transform the raw data into a readable report format.

**Option A: JSON Node**
- Extract specific fields
- Calculate totals or averages
- Format numbers and dates

**Option B: AI Node**
- Send the raw data to an AI model with a prompt like:

{% raw %}
```
Summarize the following data into a brief report with key metrics and trends:
{{http_node.output}}
```
{% endraw %}

---

## Step 4: Send the Report

Add a **Gmail** node to deliver the report.

1. Add a **Gmail** node
2. Set the recipients (your team's email addresses)
3. Set the subject (e.g. "Weekly Sales Report - {% raw %}{{date}}{% endraw %}")
4. Map the processed report into the email body

---

## Step 5: Test and Publish

1. Run a manual test to verify the data flow
2. Check the email output for formatting
3. Publish the workflow to activate the schedule

---

## Best Practices

- Use a **Data Validator** node to check if the API returned valid data before processing
- Add a **Router** node to skip sending if there's no new data
- Include a timestamp in the report subject for easy reference
