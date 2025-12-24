---
title: Schedule Trigger
description: Trigger workflows automatically based on time and schedules in puq.ai.
parent: Trigger Nodes
nav_order: 2
---

# Schedule Trigger

The **Schedule Trigger** allows you to run workflows automatically at specific times or recurring intervals.  
Instead of waiting for an external event, the workflow is triggered based on a predefined schedule.

This is ideal for periodic tasks, monitoring, reporting, and maintenance workflows.

---

## How Schedule Trigger Works

1. You add a **Schedule Trigger** to your workflow.
2. You choose a scheduling mode (cron, minutes, hourly, daily, etc.).
3. puq.ai automatically triggers the workflow according to the defined schedule.
4. The workflow runs without any external interaction.

Scheduled workflows run reliably in the background as long as the workflow is **Enabled**.

---

## Schedule Options

puq.ai provides multiple scheduling options to cover both simple and advanced timing needs.

---

## Cron Expression Schedule

The **Cron Expression** option gives you full control over scheduling using cron syntax.

### Configuration Fields:
- **Cron Expression** — Defines when the workflow runs
- **Time Zone** — Determines which time zone the cron expression follows

This option is recommended for advanced or complex schedules.

---

## Every X Minutes

Triggers the workflow at a fixed minute interval.

### Configuration Fields:
- **Interval** — Select box with values from **5 minutes** up to **59 minutes**
- **Time Zone**

Example:
- Run every 10 minutes
- Run every 30 minutes

---

## Every Hour

Triggers the workflow once every hour at a specific minute.

### Configuration Fields:
- **Minute** — Select box from **00** to **59**
- **Time Zone**

Example:
- Run every hour at minute `15`
- Run every hour at minute `00`

---

## Every Day

Triggers the workflow once per day at a specific time.

### Configuration Fields:
- **Hour** — Select box (0–23)
- **Minute** — Select box (00–59)
- **Time Zone**

Example:
- Run every day at **09:30**
- Run every day at **23:00**

---

## Every Week

Triggers the workflow once per week on a selected day and time.

### Configuration Fields:
- **Day of the Week**
- **Hour**
- **Minute**
- **Time Zone**

Example:
- Run every **Monday at 10:00**
- Run every **Friday at 18:30**

---

## Every Month

Triggers the workflow once per month on a specific day and time.

### Configuration Fields:
- **Day of the Month**
- **Hour**
- **Minute**
- **Time Zone**

Example:
- Run on the **1st day of every month at 09:00**
- Run on the **15th day of every month at 22:30**

---

## Time Zone Handling

Every scheduling option includes a **Time Zone** field.

- The selected time zone determines **when** the workflow runs
- Daylight saving time is handled automatically
- Always ensure the correct time zone is selected for business-critical workflows

---

## Common Use Cases

- Daily or weekly reports
- Periodic data synchronization
- Health checks and monitoring
- Cleanup and maintenance jobs
- Scheduled notifications

---

## Notes & Best Practices

- Scheduled workflows only run when the workflow is **Enabled**
- If the workflow is Disabled, schedules will not trigger execution
- Use **Cron Expression** for advanced schedules
- Prefer simpler schedules when possible for clarity
- Test schedules using short intervals before deploying long-running automations

---

## Summary

The Schedule Trigger enables time-based automation in puq.ai with flexible scheduling options ranging from simple intervals to advanced cron expressions.

Whether you need a workflow to run every few minutes or once a month, the Schedule Trigger provides full control with clear configuration options.
