---
title: Gmail
description: Learn how to connect to Gmail in puq.ai
parent: Connections
nav_order: 24
---

# Gmail
Learn how to connect Gmail to puq.ai.

## Option 1 — Use Default puq.ai Connection (Recommended)
If you signed in to **puq.ai using Google**, you can use the default connection.

When selecting the OAuth app in puq.ai, choose **puq.ai** from the select box.  
In this case, the connection will be created **automatically** using the Google account you used to log in.

No additional configuration is required.

---

### Step 2
From **Quick access**, click **APIs & Services**.

![Google]({{ '/assets/images/connections/google/000001.png' | relative_url }}){: width="100%" }

### Step 3
From the sidebar, click **Credentials**.

![Google]({{ '/assets/images/connections/google/000002.png' | relative_url }}){: width="30%" }

---

### Step 4 — Create or Select a Project

#### If you don’t have any projects
Click **Create a project**, fill in the form, and create the project.

![Google]({{ '/assets/images/connections/google/000003.png' | relative_url }}){: width="100%" }

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

![Google]({{ '/assets/images/connections/google/000004.png' | relative_url }}){: width="100%" }
![Google]({{ '/assets/images/connections/google/000005.png' | relative_url }}){: width="60%" }

![Google]({{ '/assets/images/connections/google/000006.png' | relative_url }}){: width="70%" }
![Google]({{ '/assets/images/connections/google/000007.png' | relative_url }}){: width="60%" }

Click **Create**.

---

### Step 8
After the consent screen is created, click **Create OAuth client**.

![Google]({{ '/assets/images/connections/google/000008.png' | relative_url }}){: width="100%" }

### Step 9
Select **Web application** as the application type.

![Google]({{ '/assets/images/connections/google/000009.png' | relative_url }}){: width="100%" }

### Step 10
Fill in the form and click **Create**.

![Google]({{ '/assets/images/connections/google/000010.png' | relative_url }}){: width="60%" }

### Step 11
Once the OAuth client is created, you will see your:

- **Client ID**
- **Client Secret**

![Google]({{ '/assets/images/connections/google/000011.png' | relative_url }}){: width="60%" }

You can now use this **Client ID** and **Client Secret** in **puq.ai** to complete the Google connection.
