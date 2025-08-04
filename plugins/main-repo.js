const axios = require('axios');
const config = require('../settings');
const { malvin } = require('../malvin');
const fs = require('fs');

// Cache for GitHub API response
const repoCache = new Map();

malvin({
    pattern: 'repo',
    alias: ['sc', 'script'],
    desc: 'Fetch information about the bot\'s GitHub repository.',
    react: '🪄',
    category: 'info',
    filename: __filename,
}, async (malvin, mek, m, { from, reply }) => {
    const githubRepoURL = config.REPO_URL || 'https://github.com/XdKing2/MALVIN-XD';
    const cacheKey = githubRepoURL;

    try {
        // Check cache first
        let repoData;
        if (repoCache.has(cacheKey)) {
            repoData = repoCache.get(cacheKey);
        } else {
            // Parse GitHub URL
            const url = new URL(githubRepoURL);
            const [, username, repoName] = url.pathname.split('/').filter(Boolean);
            if (!username || !repoName) throw new Error('Invalid GitHub URL');

            // Fetch repo data
            const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
            if (response.status !== 200) throw new Error(`GitHub API error: ${response.status}`);

            repoData = response.data;
            repoCache.set(cacheKey, repoData);
            if (repoCache.size > 10) repoCache.clear(); // Prevent memory leak
        }

        // Format response
        const formattedInfo = `
╭═✦〔 🤖 *${config.BOT_NAME} ʀᴇᴘᴏ* 〕✦═╮
│ 𖠌  *ɴᴀᴍᴇ*       : ${repoData.name}
│ ⭐  *sᴛᴀʀs*      : ${repoData.stargazers_count}
│ 🍴  *ғᴏʀᴋs*      : ${repoData.forks_count}
│ 👤  *ᴏᴡɴᴇʀ*      : ${config.DEV_NAME || 'MALVIN KING'}
│ 🧾  *ᴅᴇsᴄ*       : ${repoData.description || 'N/A'}
│ 🔗  *ʟɪɴᴋ*       : ${githubRepoURL}
│ 💡  *ᴛʏᴘᴇ*       : ${config.PREFIX || '.'}allmenu _to start_
╰═⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬═╯`;

        // Reusable context info
        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                newsletterName: config.OWNER_NAME || 'MALVIN KING',
                serverMessageId: 143
            }
        };

        // Send image with caption
        let sentMsg;
        try {
            sentMsg = await malvin.sendMessage(from, {
                image: { url: config.REPO_IMAGE_URL || 'https://files.catbox.moe/01f9y1.jpg' },
                caption: formattedInfo,
                contextInfo
            }, { quoted: mek });
        } catch (e) {
            console.error('Image send failed:', e);
            sentMsg = await malvin.sendMessage(from, {
                text: formattedInfo,
                contextInfo
            }, { quoted: mek });
        }

        // Send audio with delay
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await malvin.sendMessage(from, {
                audio: { url: config.REPO_AUDIO_URL || 'https://files.catbox.moe/wz8rh7.mp3' },
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: mek });
        } catch (e) {
            console.error('Audio send failed:', e);
        }

    } catch (error) {
        console.error('❌ Error in repo command:', error.message);
        let errorMsg = '⚠️ Failed to fetch repo info.';
        if (error.message.includes('Invalid GitHub URL')) {
            errorMsg += ' Invalid repository URL.';
        } else if (error.message.includes('GitHub API error')) {
            errorMsg += ' GitHub API is unreachable.';
        } else {
            errorMsg += ' Please try again later.';
        }
        await reply(errorMsg);
    }
});