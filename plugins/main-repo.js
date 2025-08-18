
const fetch = require('node-fetch');
const config = require('../settings');
const { malvin } = require('../malvin');
const fs = require('fs');

malvin({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Fetch information about a GitHub repository.",
    react: "🪄",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/XdKing2/MALVIN-XD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repo data from GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const repoData = await response.json();

        // Prepare caption
        const formattedInfo = `
╭──〔 🚀 ᴍᴀʟᴠɪɴ xᴅ ʀᴇᴘᴏ 〕──
│
├─ 𖥸 *ɴᴀᴍᴇ*   : ${repoData.name}
├─ ⭐ *sᴛᴀʀs*    : ${repoData.stargazers_count}
├─ 🍴 *ғᴏʀᴋs*    : ${repoData.forks_count}
├─ 👑 *ᴏᴡɴᴇʀ*   : ᴍᴀʟᴠɪɴ ᴋɪɴɢ
├─ 📜 *ᴅᴇsᴄ* : ${repoData.description || 'No description available'}
├─ 🔗 *ʀᴇᴘᴏ ʟɪɴᴋ*  : ${githubRepoURL}
├─ 🧠 *sᴛᴀʀᴛ*     :  *${config.PREFIX}ᴍᴇɴᴜ* tᴏ ʙᴇɢɪɴ
│
╰──〔 *ᴅᴇᴠ ᴍᴀʟᴠɪɴ* 〕──
`;

        // Generate unique session ID
        const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create buttons message
        const buttonsMessage = {
            image: { url: 'https://files.catbox.moe/01f9y1.jpg' },
            caption: formattedInfo,
            footer: config.FOOTER || '> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ xᴅ ',
            buttons: [
                {
                    buttonId: `repo-visit-${sessionId}`,
                    buttonText: { displayText: '🌐 Visit Repo' },
                    type: 1
                },
                {
                    buttonId: `repo-owner-${sessionId}`,
                    buttonText: { displayText: '👑 Owner Profile' },
                    type: 1
                },
                {
                    buttonId: `repo-audio-${sessionId}`,
                    buttonText: { displayText: '🎵 Play Intro' },
                    type: 1
                }
            ],
            headerType: 4, // Image header
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                    newsletterName: '🔥ᴍᴀʟᴠɪɴ-ʀᴇᴘᴏ🔥',
                    serverMessageId: 143
                }
            }
        };

        // Send message with buttons
        const sentMsg = await conn.sendMessage(from, buttonsMessage, { quoted: mek });
        const messageId = sentMsg.key.id;

        // Button handler
        const buttonHandler = async (msgData) => {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg.message?.buttonsResponseMessage) return;

            const buttonId = receivedMsg.message.buttonsResponseMessage.selectedButtonId;
            const senderId = receivedMsg.key.remoteJid;
            const isReplyToBot = receivedMsg.message.buttonsResponseMessage.contextInfo?.stanzaId === messageId;

            if (isReplyToBot && senderId === from && buttonId.includes(sessionId)) {
                conn.ev.off('messages.upsert', buttonHandler); // Remove listener

                await conn.sendMessage(from, { react: { text: '⏳', key: receivedMsg.key } });

                try {
                    if (buttonId.startsWith(`repo-visit-${sessionId}`)) {
                        await reply(`🌐 Visit the repo here: ${githubRepoURL}`);
                    } else if (buttonId.startsWith(`repo-owner-${sessionId}`)) {
                        await reply(`👑 Check out the owner profile: https://github.com/${username}`);
                    } else if (buttonId.startsWith(`repo-audio-${sessionId}`)) {
                        // Send audio intro
                        await conn.sendMessage(from, {
                            audio: { url: 'https://files.catbox.moe/z47dgd.mp3' },
                            mimetype: 'audio/mp4',
                            ptt: true
                        }, { quoted: receivedMsg });
                    }
                    await conn.sendMessage(from, { react: { text: '✅', key: receivedMsg.key } });
                } catch (error) {
                    console.error('Button Handler Error:', error);
                    await conn.sendMessage(from, { react: { text: '❌', key: receivedMsg.key } });
                    await reply(`❎ Error: ${error.message || 'Action failed'}`);
                }
            }
        };

        // Add listener
        conn.ev.on('messages.upsert', buttonHandler);

        // Remove listener after 1 minute
        setTimeout(() => {
            conn.ev.off('messages.upsert', buttonHandler);
        }, 60000);

    } catch (error) {
        console.error("❌ Error in repo command:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply("⚠️ Failed to fetch repo info. Please try again later.");
    }
});



malvin({
    pattern: "repo2",
    alias: ["sc2", "script2"],
    desc: "Fetch information about a GitHub repository.",
    react: "🪄",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/XdKing2/MALVIN-XD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const repoData = await response.json();

        const formattedInfo = `

╭──〔 🚀 ᴍᴀʟᴠɪɴ xᴅ ʀᴇᴘᴏ 〕──
│
├─ 𖥸 *ɴᴀᴍᴇ*   : ${repoData.name}
├─ ⭐ *sᴛᴀʀs*    : ${repoData.stargazers_count}
├─ 🍴 *ғᴏʀᴋs*    : ${repoData.forks_count}
├─ 👑 *ᴏᴡɴᴇʀ*   : ᴍᴀʟᴠɪɴ ᴋɪɴɢ
├─ 📜 *ᴅᴇsᴄ* : ${repoData.description || 'No description available'}
├─ 🔗 *ʀᴇᴘᴏ ʟɪɴᴋ*  : ${repoUrl}
├─ 🧠 *sᴛᴀʀᴛ*     :  *${config.PREFIX}ᴍᴇɴᴜ* tᴏ ʙᴇɢɪɴ
│
╰──〔 *ᴅᴇᴠ ᴍᴀʟᴠɪɴ* 〕──

`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/01f9y1.jpg' },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                    newsletterName: '🔥ᴍᴀʟᴠɪɴ-ʀᴇᴘᴏ🔥',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio intro
        await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/z47dgd.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });
    

    } catch (error) {
        console.error("❌ Error in repo command:", error);
        reply("⚠️ Failed to fetch repo info. Please try again later.");
    }
});
