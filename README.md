# FixTwitterDiscordBot - Deployment Guide

## Overview
This is a **Discord bot** designed to fix Twitter links in Discord messages. This guide will help you set up, run, and deploy the bot on **Railway** for 24/7 availability.

---

## Prerequisites
Before you start, make sure you have:
- A **Discord Bot Token** ([Create a bot here](https://discord.com/developers/applications)).
- A **GitHub account** (for storing the bot code).
- A **Railway.app account** ([Sign up here](https://railway.app/)).
- **Node.js** installed (>= v16).
- **npm** (comes with Node.js).

---

## 1️⃣ Creating the Discord Bot
### **Step 1: Create a Discord Application**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give it a name.
3. Go to **Bot** on the sidebar, then click **Add Bot**.
4. Copy the **Bot Token** (you will need this later).
5. Under **Privileged Gateway Intents**, enable:
   - **MESSAGE CONTENT INTENT** (important for reading messages).
   - **SERVER MEMBERS INTENT** (if needed).

### **Step 2: Invite the Bot to Your Server**
1. Go to the **OAuth2** tab → Click **URL Generator**.
2. Under **Scopes**, check `bot`.
3. Under **Bot Permissions**, select the necessary permissions (Administrator or specific ones like Send Messages, Read Messages, Embed Links, Manage Messages, View Channels).
4. Copy the generated URL and paste it into your browser to invite the bot to your server.

---

## 2️⃣ Clone the Repository
```sh
git clone https://github.com/TomasPereiraa/FixTwitterDiscordBot.git
cd FixTwitterDiscordBot
```

---

## 3️⃣ Install Dependencies
```sh
npm install
```

---

## 4️⃣ Create a `.env` File
You need to set up your bot token in an **environment file**.
Create a `.env` file in the project root and add:
```env
DISCORD_BOT_TOKEN=your-bot-token-here
```

**Replace** `your-bot-token-here` with your actual bot token.

---

## 5️⃣ Run the Bot Locally (Optional for Testing)
```sh
node index.js
```
If successful, you should see:
```
Logged in as FixTwitter#8837
```

---

## 6️⃣ Deploy on Railway
### **Step 1: Create a Railway Project**
1. Go to [Railway.app](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub Repo**.
3. Select your **FixTwitterDiscordBot** repository.

### **Step 2: Add Environment Variables**
1. In Railway, go to **Settings → Variables**.
2. Add the following variable:
   - `DISCORD_BOT_TOKEN = your-bot-token-here`

### **Step 3: Deploy the Bot**
1. Railway will detect the project as a **Node.js** app.
2. Click **Deploy** and wait for the process to complete.
3. Once deployed, check the logs to confirm it's running:
   ```sh
   Logged in as FixTwitter#8837
   ```

---

## 7️⃣ Keep the Bot Running
- **Railway will keep the bot online 24/7**.
- If you have a **$5 trial**, the bot will run for about **1 month** before you need to upgrade.
- Check usage under **Railway → Billing → Usage**.

---

## 8️⃣ Troubleshooting
### **Bot is not responding?**
- Check if the bot is **added to your Discord server**.
- Verify that the **bot token is correct** in Railway.
- Look at **Railway logs** for errors.

### **Need to restart the bot?**
- In Railway, go to **Deployments → Restart**.

---

## 🎉 Done!
Your bot should now be live and running **24/7** on Railway! 🚀

