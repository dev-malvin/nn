//---------------------------------------------
//           MALVIN-XD  
//---------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE OR REMOVE THIS CREDIT⚠️  
//---------------------------------------------
const config = require('../settings');
const { malvin } = require('../malvin');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

/**
 * Downloads a GitHub repository as a ZIP file.
 * @param {Object} malvin - The bot instance.
 * @param {Object} m - The message object.
 * @param {Object} store - The store object (unused).
 * @param {Object} params - Destructured parameters (from, args, reply).
 */
malvin({
    pattern: 'gitclone',
    alias: ['git'],
    desc: 'Download GitHub repository as a zip file.',
    react: '📦',
    category: 'download',
    filename: __filename
}, async (malvin, m, store, { from, args, reply }) => {
    if (!args[0]) {
        return reply(
            '❌ *GitHub link missing!*\n\n' +
            'Usage example:\n' +
            '`.gitclone https://github.com/username/repository [branch]`\n'
        );
    }

    // Validate and extract username, repo, and optional branch
    const regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\/tree\/([^\/]+))?(?:\.git)?/i;
    const match = args[0].match(regex);
    if (!match) {
        return reply('⚠️ *Invalid GitHub URL!*\nPlease provide a valid GitHub repository link (e.g., https://github.com/username/repository).');
    }

    const [, username, repo, branch = ''] = match;
    const branchPath = branch ? `/${branch}` : '';
    const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball${branchPath}`;

    try {
        // Check cache for filename
        const cacheKey = `${username}/${repo}${branchPath}`;
        let fileName = cache.get(cacheKey);

        if (!fileName) {
            // Check if repo exists and get metadata
            const headResp = await fetch(zipUrl, { method: 'HEAD' });
            if (!headResp.ok) {
                if (headResp.status === 429) {
                    return reply('❌ *Rate limit exceeded!*\nPlease try again later.');
                } else if (headResp.status === 404) {
                    return reply('❌ *Repository not found or inaccessible!*\nPlease verify the URL and try again.');
                }
                throw new Error(`HTTP ${headResp.status}: ${headResp.statusText}`);
            }

            // Extract filename from headers or fallback
            const contentDisp = headResp.headers.get('content-disposition') || '';
            const fileNameMatch = contentDisp.match(/filename="?(.+)"?/);
            fileName = fileNameMatch ? fileNameMatch[1] : `${repo}${branch ? `-${branch}` : ''}.zip`;

            // Cache filename
            cache.set(cacheKey, fileName);

            // Check file size
            const contentLength = headResp.headers.get('content-length');
            const fileSizeMB = contentLength ? (parseInt(contentLength) / 1024 / 1024).toFixed(2) : 'Unknown';
            if (fileSizeMB !== 'Unknown' && parseFloat(fileSizeMB) > 100) {
                await reply(`⚠️ *Warning:* The repository is large (${fileSizeMB} MB). Download may take time.`);
            }
        }

        // Stylish response
        await reply(
            `📥 *Downloading repository...*\n\n` +
            `🔹 *Repository:* ${username}/${repo}${branch ? ` (${branch})` : ''}\n` +
            `🔹 *Filename:* ${fileName}\n` +
            `🔹 *Powered by Malvin King* 👑`
        );

        // Send ZIP file as document
        await malvin.sendMessage(from, {
            document: { url: zipUrl },
            fileName,
            mimetype: 'application/zip',
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: 'MALVIN-XD GIT DOWNLOAD',
                    body: `Repository: ${username}/${repo}`,
                    thumbnailUrl:  { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/qumhu4.jpg' }, // Replace with your logo URL
                    sourceUrl: args[0]
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error('GitClone error:', error);
        return reply(`❌ *Download failed!*\n${error.message || 'Please try again later.'}`);
    }
});

// Code by Malvin King
