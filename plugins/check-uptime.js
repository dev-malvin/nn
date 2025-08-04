


const { malvin } = require('../malvin');
const { runtime } = require('../lib/functions');
const config = require('../settings');

malvin({
    pattern: "uptime",
    alias: ["runtime", "up"],
    desc: "Show bot uptime with stylish formats",
    category: "main",
    react: "⏱️",
    filename: __filename
},
async (malvin, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        
        
        // Style 1: Retro Terminal
        const style1 = `
╭───⏱️ *ᴜᴘᴛɪᴍᴇ ʀᴇᴘᴏʀᴛ* ⏱️
│
│ 🔋 *Online for:* ${uptime}
│ 🕰️ *Since:* ${startTime.toLocaleString()}
│ 🧩 *Status:* Online & stable
│
╰─➤ ${config.DESCRIPTION || 'Bot powered by Malvin King.'}

`;


        const styles = [style1];
        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        await malvin.sendMessage(from, { 
            text: selectedStyle,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ-xᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});