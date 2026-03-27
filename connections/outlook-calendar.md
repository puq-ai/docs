---
title: Outlook Calendar
description: Learn how to connect to Outlook Calendar in puq.ai
parent: Connections
nav_order: 24
---

# Outlook Calendar
Learn how to set up Microsoft OAuth integrations using Microsoft Entra ID.

## Step 1
Go to the Azure Portal:  
https://portal.azure.com

## Step 2
Click the **hamburger menu** on the left side of the top bar and select **Microsoft Entra ID**.

## Step 3
On the page that opens, click **Applications**.

## Step 4
Click **New registration**.

## Step 5
After the application is created, the **application details page** will open.  
On this page, you will see the following information:

- **Application (client) ID**
- **Directory (tenant) ID**

The **Application (client) ID** will be used as the **Client ID** for Microsoft integrations.

## Step 6
From the left menu, click **Certificates & secrets**.

## Step 7
Click **New client secret**.

## Step 8
Enter a description for the secret and select an expiration period.

## Step 9
Copy the generated **secret value** and store it securely.  
This value will be used as the **Client Secret**.

>  The client secret value cannot be viewed again after this step.

## Step 10
From the left menu, click **API permissions**.

## Step 11
Click **Add a permission**.

## Step 12
Select **Microsoft Graph** from the list.

## Step 13
Select **Delegated permissions**.

## Step 14
Add the required permissions based on your needs:

### Mail access
- Mail.Read
- Mail.Send

### Calendar access
- Calendars.Read
- Calendars.ReadWrite

### OneDrive access
- Files.Read
- Files.ReadWrite

### Microsoft To Do access
- Tasks.Read
- Tasks.ReadWrite

## Step 15
After selecting the permissions, click **Add permissions**.

## Step 16
Once the permissions are added, click **Grant admin consent** to allow the application to run on behalf of all users.

## Step 17
From the left menu, click **Authentication**.

## Step 18
Click **Add a platform** and select **Web**.

## Step 19
Enter the following value in the **Redirect URI** field: https://app.puq.ai/oauth2/callback

Save the changes.

After completing these steps, a single set of credentials can be used for OAuth 2.0 integration with the following services:

- **microsoft-outlook**
- **outlook-calendar**
- **onedrive**
- **microsoft-to-do**

The required credentials are:
- **Client ID**
- **Client Secret**