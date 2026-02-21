//makeWASocket-->interact with whatsapp 
//useMultiFileAuthState-->to rem login creds
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import qrcode, { error } from "qrcode-terminal" //method for connection with WA

async function startfamagent() {
    // to reconnect succssfully but DO NOT USE IN PROD!!!!
    const { state, saveCreds } = await useMultiFileAuthState("auth")
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    })
    sock.ev.on("creds.update", saveCreds)

    //creatin connection
    sock.ev.on("connection.update", (update) => {
        console.log("updating", update)
        // on a qr event, the connection and lastDisconnect fields will be empty
        // In prod, send this string to your frontend then generate the QR there
        const { connection, lastDisconnect, qr } = update
        if (qr) {
            qrcode.generate(qr, { small: true })
        }
        if (connection === 'open') {
            console.log("FamAgent is ready!!") //linked with wa
        }
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log("Connection closed. Reconnecting:", shouldReconnect)
            // console.log("status code error", statusCode)
            if (shouldReconnect) {
                startfamagent()
            }
        }
    })

    //looking for new msg from mom using msg.upsert if yes then read it
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const momNum = "923212747945@s.whatsapp.net"
        const msg = messages[0]   // baileys send msgs in form of array so one ata time
        // console.log("upsert event triggered")
        if (!msg.message) return
        if (msg.key.remoteJid !== momNum) return // filter only mom
        if (msg.key.fromMe) return // if i sent the msg ignore it do not read
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text
        console.log("Incoming message from mom:", text) //prints the text from mom
        // checking for words like where, when to give automated reply 
        if (!text) return
        const lowerText =  text.toLowerCase()
        if (lowerText.includes('when') || lowerText.includes('where')){
            await sock.sendMessage(momNum, {
                text : "I'm in class right now, i ll call u later..."
            })
        }
    })
}
startfamagent()