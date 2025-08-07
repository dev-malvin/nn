const axios = require('axios');
const config = require('../settings');
const { malvin } = require('../malvin');
const { URL } = require('url');

// Cache for GitHub API response with TTL
const repoCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

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
        const cached = repoCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            repoData = cached.data;
        } else {
            // Parse GitHub URL
            const url = new URL(githubRepoURL);
            const [, username, repoName] = url.pathname.split('/').filter(Boolean);
            if (!username || !repoName) {
                throw new Error('Invalid GitHub URL');
            }

            // Fetch repo data
            const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                },
                timeout: 5000
            });

            if (response.status !== 200) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            repoData = response.data;
            repoCache.set(cacheKey, { data: repoData, timestamp: Date.now() });
            if (repoCache.size > 10) {
                repoCache.delete(repoCache.keys().next().value);
            }
        }

        // Format response
        const formattedInfo = `
╭═✦〔 🤖 *${config.BOT_NAME || 'MALVIN-XD'} ʀᴇᴘᴏ* 〕✦═╮
│ 𖠌  *ɴᴀᴍᴇ*       : ${repoData.name}
│ ⭐  *sᴛᴀʀs*      : ${repoData.stargazers_count}
│ 🍴  *ғᴏʀᴋs*      : ${repoData.forks_count}
│ 👤  *ᴏᴡɴᴇʀ*      : ${config.DEV_NAME || repoData.owner.login}
│ 🧾  *ᴅᴇsᴄ*       : ${repoData.description || 'N/A'}
│ 🔗  *ʟɪɴᴋ*       : ${githubRepoURL}
│ 💡  *ᴛʏᴘᴇ*       : ${config.PREFIX || '.'}allmenu _to start_
╰═⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬⚬═╯`;

        // Context info
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

        // Send response
        const sendOptions = { quoted: mek, contextInfo };
        
        // Try sending with image first
        try {
            await malvin.sendMessage(from, {
                image: { url: config.REPO_IMAGE_URL || 'https://files.catbox.moe/01f9y1.jpg' },
                caption: formattedInfo,
                ...sendOptions
            });
        } catch (imageError) {
            console.warn('Image send failed:', imageError.message);
            await malvin.sendMessage(from, {
                text: formattedInfo,
                ...sendOptions
            });
        }

        // Send audio with delay
        if (config.AUDIO_URL) {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await malvin.sendMessage(from, {
                    audio: { url: config.AUDIO_URL || 'https://files.catbox.moe/wz8rh7.mp3' },
                    mimetype: 'audio/mpeg',
                    ptt: true,
                    ...sendOptions
                });
            } catch (audioError) {
                console.warn('Audio send failed:', audioError.message);
            }
        }

    } catch (error) {
        console.error('❌ Repo command error:', error.message);
        const errorMessages = {
            'Invalid GitHub URL': 'Invalid repository URL provided.',
            'GitHub API error': 'Unable to reach GitHub API.',
            'Request timed out': 'GitHub API request timed out.'
        };
        
        const errorMsg = errorMessages[error.message] 
            ? `⚠️ Failed to fetch repo info: ${errorMessages[error.message]}`
            : '⚠️ Failed to fetch repo info. Please try again later.';
            
        await reply(errorMsg);
    }
});
