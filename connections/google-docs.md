---
title: Google Docs
description: Learn how to connect to Google Docs in puq.ai
parent: Connections
nav_order: 29
---

# Google Docs
Learn how to connect Google Docs to puq.ai.

## Option 1 — Use Default puq.ai Connection (Recommended)
If you signed in to **puq.ai using Google**, you can use the default connection.

When selecting the OAuth app in puq.ai, choose **puq.ai** from the select box.  
In this case, the connection will be created **automatically** using the Google account you used to log in.

No additional configuration is required.

---

## Option 2 — Connect Using Your Own OAuth Client (Client ID & Client Secret)

### Step 1
Go to Google Cloud Console:  
https://console.cloud.google.com

### Step 2
From **Quick access**, click **APIs & Services**.

(resim 1)

### Step 3
From the sidebar, click **Credentials**.

(resim 2)

---

### Step 4 — Create or Select a Project

#### If you don’t have any projects
Click **Create a project**, fill in the form, and create the project.

(resim 3)

#### If you already have projects
Click the current project name in the top bar and select an existing project,  
or click **New Project** to create a new one.

If a suitable project already exists, simply select it.

---

### Step 5 — Create OAuth Credentials
From the top bar, click **Create credentials** → **OAuth client ID**.

### Step 6
Click **Configure consent screen**.  
(If a consent screen is already configured, skip to Step 10.)

### Step 7
Click **Get started** and complete the consent screen setup.

(resim 4)  
(resim 5)  
(resim 6)  
(resim 7)

Click **Create**.

---

### Step 8
After the consent screen is created, click **Create OAuth client**.

(resim 8)

### Step 9
Select **Web application** as the application type.

(resim 9)

### Step 10
Fill in the form and click **Create**.

(resim 10)

### Step 11
Once the OAuth client is created, you will see your:

- **Client ID**
- **Client Secret**

(resim 11)

You can now use this **Client ID** and **Client Secret** in **puq.ai** to complete the Google connection.
