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
            // Parse GitHub URL with better validation
            let username, repoName;
            
            try {
                const url = new URL(githubRepoURL);
                const pathParts = url.pathname.split('/').filter(Boolean);
                
                if (pathParts.length < 2) {
                    throw new Error('Invalid GitHub URL format');
                }
                
                // Handle GitHub URLs with or without trailing slash
                username = pathParts[0];
                repoName = pathParts[1].replace(/\.git$/, ''); // Remove .git if present
                
                if (!username || !repoName) {
                    throw new Error('Could not extract username/repo from URL');
                }
            } catch (parseError) {
                console.error('URL parsing error:', parseError);
                // Try fallback to default values if parsing fails
                username = 'XdKing2';
                repoName = 'MALVIN-XD';
            }

            // Fetch repo data with better error handling
            try {
                const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`, {
                    headers: {
                        'User-Agent': 'MALVIN-BOT' // GitHub requires user-agent
                    },
                    timeout: 5000
                });
                
                if (response.status !== 200) {
                    throw new Error(`GitHub API responded with status ${response.status}`);
                }
                
                repoData = response.data;
                repoCache.set(cacheKey, repoData);
                
                // Set cache expiration (1 hour)
                setTimeout(() => repoCache.delete(cacheKey), 3600000);
            } catch (apiError) {
                console.error('GitHub API error:', apiError);
                // Use fallback data if API fails
                repoData = {
                    name: repoName,
                    stargazers_count: 'N/A',
                    forks_count: 'N/A',
                    description: config.BOT_DESCRIPTION || 'A WhatsApp bot created by MALVIN KING'
                };
            }
        }

        // Format response
        const formattedInfo = `
╭═✦〔 🤖 *${config.BOT_NAME} ʀᴇᴘᴏ* 〕✦═╮
│ 𖠌  *ɴᴀᴍᴇ*       : ${repoData.name || 'MALVIN-XD'}
│ ⭐  *sᴛᴀʀs*      : ${repoData.stargazers_count || 'N/A'}
│ �  *ғᴏʀᴋs*      : ${repoData.forks_count || 'N/A'}
│ 👤  *ᴏᴡɴᴇʀ*      : ${config.DEV_NAME || 'MALVIN KING'}
│ 🧾  *ᴅᴇsᴄ*       : ${repoData.description || 'A WhatsApp bot created by MALVIN KING'}
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

        // Send image with caption with fallback
        try {
            await malvin.sendMessage(from, {
                image: { 
                    url: config.REPO_IMAGE_URL || 'https://files.catbox.moe/01f9y1.jpg',
                    // Add fallback in case image fails to load
                    caption: formattedInfo
                },
                caption: formattedInfo,
                contextInfo
            }, { quoted: mek });
        } catch (imageError) {
            console.error('Image send failed, sending text only:', imageError);
            await malvin.sendMessage(from, {
                text: formattedInfo,
                contextInfo
            }, { quoted: mek });
        }

        // Send audio with delay and better error handling
        setTimeout(async () => {
            try {
                await malvin.sendMessage(from, {
                    audio: { 
                        url: config.REPO_AUDIO_URL || 'https://files.catbox.moe/wz8rh7.mp3',
                        // Add fallback properties
                        mimetype: 'audio/mp4',
                        ptt: true
                    },
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: mek });
            } catch (audioError) {
                console.error('Audio send failed:', audioError);
            }
        }, 1000);

    } catch (error) {
        console.error('❌ Error in repo command:', error);
        let errorMsg = '⚠️ Failed to fetch repo info. ';
        
        if (error.message.includes('GitHub API')) {
            errorMsg += 'Using cached data.';
        } else {
            errorMsg += 'Please try again later.';
        }
        
        await reply(errorMsg);
    }
});            if (repoCache.size > 10) repoCache.clear(); // Prevent memory leak
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
