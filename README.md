# FixTwitterDiscordBot - Deployment Guide

## Overview
This is a **Discord bot** designed to:
✅ Fix Twitter and Instagram links in Discord messages  
✅ Provide a fun `/roulette` command  
✅ Fetch **League of Legends build links** using `/build <champion>`

This guide will help you **set up, run, and deploy** the bot on **Railway** for **24/7 availability**.

---

## 1️⃣ Prerequisites
Before you start, make sure you have:
- ✅ A **Discord Bot Token** ([Create a bot here](https://discord.com/developers/applications))
- ✅ A **GitHub account** (for storing the bot code)
- ✅ A **Railway.app account** ([Sign up here](https://railway.app/))
- ✅ **Node.js** installed (>= v16)
- ✅ **npm** (comes with Node.js)

---

## 2️⃣ Creating the Discord Bot
### **Step 1: Create a Discord Application**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → Enter a name → **Create**
3. Go to **Bot** on the sidebar, then click **Add Bot**
4. Copy the **Bot Token** (you will need this later)
5. Under **Privileged Gateway Intents**, enable:
   - ✅ **MESSAGE CONTENT INTENT**
   - ✅ **SERVER MEMBERS INTENT** (if needed)

### **Step 2: Invite the Bot to Your Server**
1. Go to **OAuth2** → Click **URL Generator**
2. Under **Scopes**, check `bot` and `applications.commands`
3. Under **Bot Permissions**, select:
   - **View Channels**
   - **Send Messages**
   - **Manage Messages**
   - **Embed Links**
   - **Read Message History**
   - **Use Slash Commands**
4. Copy the **generated URL** and invite the bot to your server.

---

## 3️⃣ Clone the Repository
```sh
git clone https://github.com/TomasPereiraa/FixTwitterDiscordBot.git
cd FixTwitterDiscordBot
```

---

## 4️⃣ Install Dependencies
```sh
npm install
```

---

## 5️⃣ Create a `.env` File
Create a `.env` file in the project root and add:
```env
DISCORD_BOT_TOKEN=your-bot-token-here
CLIENT_ID=your-discord-application-id
```
**Replace** `your-bot-token-here` and `your-discord-application-id` with your actual values.

---

## 6️⃣ Organizing the Bot Files
```
/discord-bot
│── /commands
│   ├── roulette.js  # Slash command for roulette
│   ├── build.js  # Slash command for LoL champion builds
│── /events
│   ├── interactionCreate.js  # Handles commands & autocomplete
│   ├── messageCreate.js  # Handles Twitter/Instagram link fix
│   ├── ready.js  # Runs when bot starts
│── /data
│   ├── champions.json  # List of all LoL champions for autocomplete
│── index.js  # Main bot file
│── deploy-commands.js  # Registers slash commands
│── .env  # Stores bot token
│── package.json  # Project dependencies
```

---

## 7️⃣ Add the `/build` Command
### **Step 1: Create `/commands/build.js`**
Create a new file at **`/commands/build.js`**:


---

### **Step 2: Create `/data/champions.json`**
Create a new file at **`/data/champions.json`** and add:
```json
[
    "aatrox",
    "ahri",
    "akali",
    "alistar",
...
]
```
(Extend this list with all League of Legends champions.)

---

## 8️⃣ Deploy Slash Commands
```sh
node deploy-commands.js
```
If successful, you should see:
```
Registering slash commands...
Slash commands registered successfully.
```

---

## 9️⃣ Run the Bot Locally (Optional for Testing)
```sh
node index.js
```
If successful, you should see:
```
Logged in as YOURBOTNAME#YOURBOTNUMBERTAG
```

---

## 🔟 Deploy on Railway
### **Step 1: Create a Railway Project**
1. Go to [Railway.app](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub Repo**.
3. Select your **FixTwitterDiscordBot** repository.

### **Step 2: Add Environment Variables**
1. In Railway, go to **Settings → Variables**.
2. Add the following variables:
   - `DISCORD_BOT_TOKEN = your-bot-token-here`
   - `CLIENT_ID = your-discord-application-id`

### **Step 3: Deploy the Bot**
1. Railway will detect the project as a **Node.js** app.
2. Click **Deploy** and wait for the process to complete.
3. Once deployed, check the logs to confirm it's running:
   ```sh
   Logged in as FixTwitter#8837
   ```

---

## 🎉 Done!
Your bot is now live and running **24/7** on Railway! 🚀

