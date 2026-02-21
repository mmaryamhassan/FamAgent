📱 **FamAgent - An automated agent responding to your family**

A lightweight WhatsApp automation agent built using @whiskeysockets/baileys.
FamAgent listens for incoming messages (e.g., from mom 👀) and can automatically reply based on custom logic.
Currently supports keyword-based auto replies and is designed to be upgraded into a smart AI-powered assistant.

🚀 **Features**
✅ WhatsApp Web connection using Baileys
✅ QR-based authentication
✅ Persistent session (multi-file auth)
✅ Message listener using messages.upsert
✅ Filter messages by specific contact
✅ Keyword-based auto replies
🔜 AI-powered smart replies (planned)

🛠 **Tech Stack**
Node.js (ES Modules)
WhiskeySockets Baileys (@whiskeysockets/baileys)
qrcode-terminal

📦 **Installation**
Clone the repository:
git clone "https://github.com/mmaryamhassan/FamAgent.git"
cd FamAgent

Initialize project:
npm init -y

Install dependencies:
npm install 

⚙️ **Setup**
Make sure your package.json contains:
"type": "module"
This allows the usage of import syntax.
▶️ Running the Project
Start the agent - run: node index.js
A QR code will appear in the terminal.
Open WhatsApp → Linked Devices → Link a Device → Scan the QR.
Once connected, you should see: FamAgent is ready!!

📁 **Project Structure**
famagent/
│
├── auth/               # Auto-generated session credentials
├── index.js            # Main bot logic
├── package.json
└── README.md

🧠 **How It Works**
Connects to WhatsApp using Baileys
Saves session credentials in /auth
Listens to: sock.ev.on('messages.upsert')
Filters:
Only a specific number
Ignores messages sent by yourself
Extracts message text
Runs keyword check
Sends an automatic reply

🔄 Session Expiry
If you see:
Connection closed. Reconnecting: false
Your session likely expired.

Fix:
Stop server
Delete /auth folder
Run again
Scan QR

⚠️ **Important Notes**
Only one running instance at a time
Do not delete /auth unless re-linking

Ensure the number format is:
countrycode + number + @s.whatsapp.net
Example (Pakistan): 923001234567@s.whatsapp.net

🔮 **Future Improvements**
Busy mode toggle
Message logging
Smart AI replies
Command handling system
Multi-contact support


👩‍💻 **Author**
Built while fasting and panic debugging by Maryiam Hassan 

Email: mmaryamhassann1@gmail.com
