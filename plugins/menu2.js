const config = require('../settings');
const moment = require('moment-timezone');
const { malvin, commands } = require('../malvin');
const { runtime } = require('../lib/functions');
const os = require('os');
const { getPrefix } = require('../lib/prefix');

malvin({
    pattern: 'menu2',
    alias: ['allmenu'],
    desc: 'Show all bot commands',
    category: 'menu',
    react: '⚡️',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        // Dynamic prefix
        const prefix = getPrefix();

        // Time, date, and system info
        const timezone = config.TIMEZONE || 'Africa/Nairobi';
        const time = moment().tz(timezone).format('HH:mm:ss');
        const date = moment().tz(timezone).format('dddd, DD MMMM YYYY');
        const platform = os.platform();
        const totalCommands = commands.length;

        // Menu header
        let menuText = `
╭═✦〔 🤖 *${config.BOT_NAME}* 〕✦═╮
│
│ 👤 *User:* @${sender.split('@')[0]}
│ ⏰ *Time:* ${time}
│ 📅 *Date:* ${date}
│ 🔄 *Runtime:* ${runtime(process.uptime())}
│ ⚙️ *Mode:* ${config.MODE}
│ 📡 *Platform:* ${platform}
│ ⌨️ *Prefix:* [ ${prefix} ]
│ 🧩 *Plugins:* ${totalCommands}
│ 👑 *Dev:* ${config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ-ᴛᴇᴄʜ'}
│ 🚀 *Version:* ${config.version}
│
╰═✪╾┄┄┄┄┄┄┄┄┄┄┄┄╼✪═╯
`;

        // Categorize commands
        let category = {};
        for (let cmd of commands) {
            if (!cmd.category || cmd.dontAdd) continue; // Skip uncategorized or hidden commands
            if (!category[cmd.category]) category[cmd.category] = [];
            category[cmd.category].push(cmd);
        }

        // Sort and display categories
        const keys = Object.keys(category).sort();
        for (let k of keys) {
            menuText += `\n\n╭═✦〔 ${k.toUpperCase()} MENU 〕✦═╮\n│`;
            const cmds = category[k]
                .filter(c => c.pattern) // Ensure command has a pattern
                .sort((a, b) => a.pattern.localeCompare(b.pattern)); // Alphabetical sort
            cmds.forEach((cmd) => {
                const usage = cmd.pattern.split('|')[0];
                menuText += `\n│ ➸ ${prefix}${usage}`;
            });
            menuText += `\n╰════════════`;
        }

        menuText += `\n\n> ${config.DESCRIPTION}`;

        // Context info for message
        const contextInfo = {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                serverMessageId: 143
            }
        };

        // Send menu image
        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/qumhu4.jpg' },
                caption: menuText,
                contextInfo
            },
            { quoted: mek }
        );

        // Send optional menu audio
        if (config.MENU_AUDIO_URL) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for smoother UX
            await malvin.sendMessage(
                from,
                {
                    audio: { url: config.MENU_AUDIO_URL || 'https://files.catbox.moe/wz8rh7.mp3' },
                    mimetype: 'audio/mp4',
                    ptt: true,
                    contextInfo
                },
                { quoted: mek }
            );
        }

    } catch (e) {
        console.error('Menu2 Error:', e.stack);
        reply(`❌ Error: Failed to display menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});