const config = require('../settings');
const { malvin } = require('../malvin');
const { runtime } = require('../lib/functions');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');

malvin({
    pattern: 'menu3',
    desc: 'Show the bot main menu',
    category: 'menu',
    react: '⚡',
    filename: __filename
}, async (malvin, mek, m, { from, sender, pushname, reply }) => {
    try {
        // Time and date info
        const timezone = config.TIMEZONE || 'Africa/Harare';
        const time = moment().tz(timezone).format('HH:mm:ss');
        const date = moment().tz(timezone).format('DD/MM/YYYY');
        const platform = os.platform(); // Get platform (e.g., 'linux', 'win32')

        const dec = `
╭━━━〔 🤖 *${config.BOT_NAME}* 〕━━━╮
┃ 🤴 *Owner:* ${config.OWNER_NAME}
┃ ⚙️ *Mode:* ${config.MODE}
┃ 📡 *Platform:* ${platform}
┃ 🧠 *Type:* NodeJs (Multi Device)
┃ ⏰ *Time:* ${time}
┃ 📅 *Date:* ${date}
┃ 🔄 *Uptime:* ${runtime(process.uptime())}
┃ ⌨️ *Prefix:* ${config.PREFIX}
┃ 🚀 *Version:* ${config.version}
╰━━━━━━━━━━━━━━━━

╭═✦〔 🧩 *ᴄᴀᴛᴇɢᴏʀʏ ʟɪsᴛ* 〕✦═╮
│
│ ➊ 📥  *ᴅᴏᴡɴʟᴏᴀᴅᴍᴇɴᴜ*
│ ➋ 💬  *ɢʀᴏᴜᴘᴍᴇɴᴜ*
│ ➌ 🕹️  *ғᴜɴᴍᴇɴᴜ*
│ ➍ 👑  *ᴏᴡɴᴇʀᴍᴇɴᴜ*
│ ➎ 🧠  *ᴀɪᴍᴇɴᴜ*
│ ➏ 🌸  *ᴀɴɪᴍᴇᴍᴇɴᴜ*
│ ➐ 🔁  *ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ*
│ ➑ 🧩  *ᴏᴛʜᴇʀᴍᴇɴᴜ*
│ ➒ 💫  *ʀᴇᴀᴄᴛɪᴏɴᴍᴇɴᴜ*
│ ➓ 🏕️  *ᴍᴀɪɴᴍᴇɴᴜ*
│ ⓫ 🎨  *ʟᴏɢᴏᴍᴇɴᴜ*
│ ⓬ ⚙️  *sᴇᴛᴛɪɴɢsᴍᴇɴᴜ*
│ ⓭ 🎵  *ᴀᴜᴅɪᴏᴍᴇɴᴜ*
│ ⓮ 🔒  *ᴘʀɪᴠᴀᴄʏᴍᴇɴᴜ*
│
╰═✪╾┄┄┄┄┄┄┄┄┄┄┄┄╼✪═╯

example usage ${config.PREFIX}logomenu

> ${config.DESCRIPTION}
`;

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
                caption: dec,
                contextInfo
            },
            { quoted: mek }
        );

        // Send menu audio (optional)
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
        console.error('Menu3 Error:', e.stack);
        reply(`❌ Error: Failed to display menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Download Menu
malvin({
    pattern: 'downloadmenu',
    alias: ['dlmenu', '1'],
    desc: 'Show the download menu',
    category: 'menu',
    react: '⤵️',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 📥 *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ* 〕✦═╮
│
│ 🌐 *sᴏᴄɪᴀʟ ᴍᴇᴅɪᴀ* 🌍
│ ➸ .fbdl
│ ➸ .igimagedl
│ ➸ .igvid
│ ➸ .pindl
│ ➸ .tiktok
│ ➸ .tiktok2
│ ➸ .twitter
│ ➸ .yt
│ ➸ .yt2
│ ➸ .ytpost
│ ➸ .yts
│
│ 💿 *ғɪʟᴇs & ᴀᴘᴘs* 💾
│ ➸ .apk
│ ➸ .gdrive
│ ➸ .gitclone
│ ➸ .mediafire
│ ➸ .mediafire2
│
│ 🎥 *ᴍᴇᴅɪᴀ ᴄᴏɴᴛᴇɴᴛ* 📹
│ ➸ .getimage
│ ➸ .img
│ ➸ .movie
│ ➸ .moviedl
│ ➸ .music
│ ➸ .play
│ ➸ .series
│ ➸ .song
│ ➸ .tovideo
│ ➸ .tovideo2
│ ➸ .video2
│ ➸ .video3
│ ➸ .xvideo
│
│ 📖 *ᴍɪsᴄ* 📚
│ ➸ .bible
│ ➸ .biblelist
│ ➸ .news
│ ➸ .npm
│ ➸ .pair
│ ➸ .tts
│
╰═✨🌟🌟🌟🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['1'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/jw8h57.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Download Menu Error:', e.stack);
        reply(`❌ Error: Failed to display download menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Group Menu
malvin({
    pattern: 'groupmenu',
    alias: ['gmenu', '2'],
    desc: 'Show the group menu',
    category: 'menu',
    react: '⤵️',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✧〔 💬 *ɢʀᴏᴜᴘ ᴍᴇɴᴜ* 〕✧═╮
│
│ 🔧 *ᴍᴀɴᴀɢᴇᴍᴇɴᴛ* 🛠️
│ ⬢ .requestlist
│ ⬢ .acceptall
│ ⬢ .rejectall
│ ⬢ .removemembers
│ ⬢ .removeadmins
│ ⬢ .removeall2
│ ⬢ .groupsprivacy
│ ⬢ .updategdesc
│ ⬢ .updategname
│ ⬢ .revoke
│ ⬢ .ginfo
│ ⬢ .newgc
│
│ 👥 *ɪɴᴛᴇʀᴀᴄᴛɪᴏɴ* 🤝
│ ⬢ .join
│ ⬢ .invite
│ ⬢ .hidetag
│ ⬢ .tagall
│ ⬢ .tagadmins
│ ⬢ .poll
│ ⬢ .broadcast2
│
│ 🔒 *sᴇᴄᴜʀɪᴛʏ* 🛡️
│ ⬢ .lockgc
│ ⬢ .unlockgc
│ ⬢ .unmute
│ ⬢ .antilink
│ ⬢ .antilinkkick
│ ⬢ .deletelink
│ ⬢ .antibot
│ ⬢ .delete
│ ⬢ .closetime
│ ⬢ .opentime
│ ⬢ .notify
│
│ 👑 *ᴀᴅᴍɪɴ* 🧑‍💼
│ ⬢ .add
│ ⬢ .bulkdemote
│ ⬢ .demote
│ ⬢ .out
│ ⬢ .promote
│ ⬢ .remove
│
╰═✨🔥🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['2'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/ceeo6k.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Group Menu Error:', e.stack);
        reply(`❌ Error: Failed to display group menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Fun Menu
malvin({
    pattern: 'funmenu',
    alias: ['fmenu', '3'],
    desc: 'Show the fun menu',
    category: 'menu',
    react: '😎',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 🕹️ *ғᴜɴ ᴍᴇɴᴜ* 〕✦═╮
│
│ 🎲 *ɢᴀᴍᴇs* 🎮
│ ✪ .8ball
│ ✪ .coinflip
│ ✪ .guessnumber
│ ✪ .rps
│ ✪ .tictactoe
│ ✪ .truth
│ ✪ .dare
│ ✪ .quiz
│ ✪ .roll
│
│ 😄 *sᴏᴄɪᴀʟ* 💖
│ ✪ .angry
│ ✪ .compliment
│ ✪ .confused
│ ✪ .cute
│ ✪ .flirt
│ ✪ .happy
│ ✪ .heart
│ ✪ .kiss
│ ✪ .lovetest
│ ✪ .loveyou
│ ✪ .sad
│ ✪ .shy
│ ✪ .couplepp
│ ✪ .ship
│
│ 🔥 *ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ* 🎉
│ ✪ .animequote
│ ✪ .didyouknow
│ ✪ .fact
│ ✪ .joke
│ ✪ .pickupline
│ ✪ .quote
│ ✪ .quoteimage
│ ✪ .spamjoke
│
│ 🎨 *ᴄʀᴇᴀᴛɪᴠᴇ* 🖌️
│ ✪ .aura
│ ✪ .character
│ ✪ .emoji
│ ✪ .emix
│ ✪ .fancy
│ ✪ .rcolor
│ ✪ .ringtone
│
│ ⚙️ *ᴍɪsᴄ* 🛠️
│ ✪ .compatibility
│ ✪ .count
│ ✪ .countx
│ ✪ .flip
│ ✪ .hack
│ ✪ .hot
│ ✪ .konami
│ ✪ .marige
│ ✪ .moon
│ ✪ .nikal
│ ✪ .pick
│ ✪ .pray4me
│ ✪ .rate
│ ✪ .remind
│ ✪ .repeat
│ ✪ .rw
│ ✪ .send
│ ✪ .shapar
│ ✪ .shout
│ ✪ .squidgame
│ ✪ .suspension
│
│ 🔞 *ɴsғᴡ* 🚫
│ ✪ .anal
│ ✪ .ejaculation
│ ✪ .erec
│ ✪ .nsfw
│ ✪ .nude
│ ✪ .orgasm
│ ✪ .penis
│ ✪ .sex
│ ✪ .suspension
│
╰═✨🌟🌟🌟🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['3'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/9qoecp.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Fun Menu Error:', e.stack);
        reply(`❌ Error: Failed to display fun menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Owner Menu
malvin({
    pattern: 'ownermenu',
    alias: ['omenu', '4'],
    desc: 'Show the owner menu',
    category: 'menu',
    react: '🔰',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply, isCreator }) => {
    try {
        if (!isCreator) return reply('❗ Only the bot owner can use this command.');

        const dec = `
╭═✧〔 👑 *ᴏᴡɴᴇʀ ᴍᴇɴᴜ* 〕✧═╮
│
│ 🔧 *ʙᴏᴛ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ* 🛠️
│ ➟ .admin
│ ➟ .setbotimage
│ ➟ .setbotname
│ ➟ .setownername
│ ➟ .setreacts
│ ➟ .shutdown
│ ➟ .restart
│ ➟ .update
│ ➟ .dev
│ ➟ .delsudo
│ ➟ .setsudo
│ ➟ .listsudo
│
│ 🚫 *ᴜsᴇʀ ᴄᴏɴᴛʀᴏʟ* 🚷
│ ➟ .ban
│ ➟ .unban
│ ➟ .block
│ ➟ .unblock
│ ➟ .listban
│
│ 📢 *ᴄᴏᴍᴍᴜɴɪᴄᴀᴛɪᴏɴ* 📣
│ ➟ .broadcast
│ ➟ .channelreact
│ ➟ .forward
│ ➟ .msg
│ ➟ .post
│
│ 🔍 *ɪɴғᴏʀᴍᴀᴛɪᴏɴ* 🔎
│ ➟ .getpp
│ ➟ .getprivacy
│ ➟ .gjid
│ ➟ .jid
│ ➟ .person
│ ➟ .savecontact
│
│ 🎨 *ᴄᴏɴᴛᴇɴᴛ* 🖼️
│ ➟ .pp
│ ➟ .sticker
│ ➟ .take
│ ➟ .dailyfact
│
│ 🔐 *sᴇᴄᴜʀɪᴛʏ* 🛡️
│ ➟ .anti-call
│ ➟ .clearchats
│
│ ⚙️ *ᴍɪsᴄ* 🛠️
│ ➟ .leave
│ ➟ .vv
│ ➟ .vv2
│ ➟ .vv4
│
╰═✨🔥🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['4'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/jw8h57.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Owner Menu Error:', e.stack);
        reply(`❌ Error: Failed to display owner menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// AI Menu
malvin({
    pattern: 'aimenu',
    alias: ['aimenu', '5'],
    desc: 'Show the AI menu',
    category: 'menu',
    react: '🤖',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 🧠 *ᴀɪ ᴍᴇɴᴜ* 〕✦═╮
│
│ 🤖 *ᴀɪ ᴍᴏᴅᴇʟs* 🧠
│ ⬣ .ai
│ ⬣ .deepseek
│ ⬣ .fluxai
│ ⬣ .llama3
│ ⬣ .malvin
│ ⬣ .metaai
│ ⬣ .openai
│ ⬣ .stabilityai
│ ⬣ .stablediffusion
│
╰═✨🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['5'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/ceeo6k.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('AI Menu Error:', e.stack);
        reply(`❌ Error: Failed to display AI menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Anime Menu
malvin({
    pattern: 'animemenu',
    alias: ['anmenu', '6'],
    desc: 'Show the anime menu',
    category: 'menu',
    react: '🧚',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✧〔 🌸 *ᴀɴɪᴍᴇ ᴍᴇɴᴜ* 〕✧═╮
│
│ 🌸 *ᴄʜᴀʀᴀᴄᴛᴇʀs* 🎀
│ ⊸ .animegirl
│ ⊸ .animegirl1
│ ⊸ .animegirl2
│ ⊸ .animegirl3
│ ⊸ .animegirl4
│ ⊸ .animegirl5
│ ⊸ .megumin
│ ⊸ .neko
│ ⊸ .waifu
│
│ 😺 *ᴀɴɪᴍᴀʟs* 🐾
│ ⊸ .awoo
│ ⊸ .cat
│ ⊸ .dog
│
│ 👗 *ᴄᴏsᴘʟᴀʏ* 👘
│ ⊸ .garl
│ ⊸ .maid
│
╰═✨🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['6'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/9qoecp.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Anime Menu Error:', e.stack);
        reply(`❌ Error: Failed to display anime menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Convert Menu
malvin({
    pattern: 'convertmenu',
    alias: ['cmenu', '7'],
    desc: 'Show the convert menu',
    category: 'menu',
    react: '🥀',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 🔁 *ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ* 〕✦═╮
│
│ 🖼️ *ɪᴍᴀɢᴇs* 📸
│ ✷ .blur
│ ✷ .grey
│ ✷ .imgjoke
│ ✷ .invert
│ ✷ .jail
│ ✷ .nokia
│ ✷ .rmbg
│ ✷ .wanted
│
│ 🎙️ *ᴀᴜᴅɪᴏ* 🎵
│ ✷ .aivoice
│ ✷ .tomp3
│ ✷ .toptt
│ ✷ .tts2
│ ✷ .tts3
│
│ 📄 *ғɪʟᴇs* 📑
│ ✷ .convert
│ ✷ .topdf
│ ✷ .vsticker
│
│ 🔗 *ᴜᴛɪʟɪᴛʏ* 🔧
│ ✷ .ad
│ ✷ .attp
│ ✷ .readmore
│ ✷ .tinyurl
│
╰═✨🌟🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['7'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/jw8h57.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Convert Menu Error:', e.stack);
        reply(`❌ Error: Failed to display convert menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Other Menu
malvin({
    pattern: 'othermenu',
    alias: ['otmenu', '8'],
    desc: 'Show the other menu',
    category: 'menu',
    react: '🤖',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✧〔 🧩 *ᴏᴛʜᴇʀ ᴍᴇɴᴜ* 〕✧═╮
│
│ 🔍 *ɪɴғᴏ* 📚
│ ├─ .countryinfo
│ ├─ .define
│ ├─ .weather
│ ├─ .wikipedia
│
│ 🌐 *sᴛᴀʟᴋɪɴɢ* 🌍
│ ├─ .tiktokstalk
│ ├─ .xstalk
│ ├─ .ytstalk
│ ├─ .githubstalk
│
│ 🔐 *ᴄᴏᴅɪɴɢ* 💻
│ ├─ .base64
│ ├─ .unbase64
│ ├─ .binary
│ ├─ .dbinary
│ ├─ .urlencode
│ ├─ .urldecode
│
│ ⚙️ *ᴜᴛɪʟɪᴛɪᴇs* 🛠️
│ ├─ .calculate
│ ├─ .caption
│ ├─ .checkmail
│ ├─ .createapi
│ ├─ .gpass
│ ├─ .imgscan
│ ├─ .npm
│ ├─ .otpbox
│ ├─ .srepo
│ ├─ .tempmail
│ ├─ .tempnum
│ ├─ .trt
│ ├─ .vcc
│ ├─ .wastalk
│ ├─ .cancelallreminders
│ ├─ .cancelreminder
│ ├─ .check
│ ├─ .myreminders
│ ├─ .reminder
│ ├─ .tourl
│
│ 📸 *ɪᴍᴀɢᴇs* 🖼️
│ ├─ .remini
│ ├─ .screenshot
│
╰═✨🔥🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['8'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/ceeo6k.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Other Menu Error:', e.stack);
        reply(`❌ Error: Failed to display other menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Reaction Menu
malvin({
    pattern: 'reactions',
    alias: ['reactionsmenu', '9'],
    desc: 'Show the reaction menu',
    category: 'menu',
    react: '💫',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 💫 *ʀᴇᴀᴄᴛɪᴏɴ ᴍᴇɴᴜ* 〕✦═╮
│
│ 😄 *ᴘᴏsɪᴛɪᴠᴇ* 💖
│ ⬩ .blush
│ ⬩ .cuddle
│ ⬩ .happy
│ ⬩ .highfive
│ ⬩ .hug
│ ⬩ .kiss
│ ⬩ .lick
│ ⬩ .nom
│ ⬩ .pat
│ ⬩ .smile
│ ⬩ .wave
│
│ 😺 *ᴘʟᴀʏғᴜʟ* 🎉
│ ⬩ .awoo
│ ⬩ .dance
│ ⬩ .glomp
│ ⬩ .handhold
│ ⬩ .poke
│ ⬩ .wink
│
│ 😈 *ᴛᴇᴀsɪɴɢ* 😜
│ ⬩ .bite
│ ⬩ .bonk
│ ⬩ .bully
│ ⬩ .cringe
│ ⬩ .cry
│ ⬩ .kill
│ ⬩ .slap
│ ⬩ .smug
│ ⬩ .yeet
│
╰═✨🌟🌟🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['9'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/122liy.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Reaction Menu Error:', e.stack);
        reply(`❌ Error: Failed to display reaction menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Main Menu
malvin({
    pattern: 'mainmenu',
    alias: ['mmenu', '10'],
    desc: 'Show the main menu',
    category: 'menu',
    react: '🗿',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✧〔 🏕️ *ᴍᴀɪɴ ᴍᴇɴᴜ* 〕✧═╮
│
│ 🤖 *sᴛᴀᴛᴜs* 📊
│ ⊹ .alive
│ ⊹ .alive2
│ ⊹ .online
│ ⊹ .ping
│ ⊹ .ping2
│ ⊹ .uptime
│ ⊹ .version
│
│ 📅 *sʏsᴛᴇᴍ* ⏰
│ ⊹ .date
│ ⊹ .time
│
│ 📚 *ɪɴғᴏ* ℹ️
│ ⊹ .bothosting
│ ⊹ .env
│ ⊹ .fetch
│ ⊹ .repo
│ ⊹ .support
│
│ 🆘 *ʜᴇʟᴘ* ❓
│ ⊹ .help
│ ⊹ .menu
│ ⊹ .menu2
│ ⊹ .menu3
│ ⊹ .list
│ ⊹ .report
│
│ 👤 *ᴏᴡɴᴇʀ* 👑
│ ⊹ .owner
│
╰═✨🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['10'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/bmze2e.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Main Menu Error:', e.stack);
        reply(`❌ Error: Failed to display main menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Logo Menu
malvin({
    pattern: 'logo',
    alias: ['logomenu', '11'],
    desc: 'Show the logo maker menu',
    category: 'menu',
    react: '🧃',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 🎨 *ʟᴏɢᴏ ᴍᴀᴋᴇʀ* 〕✦═╮
│
│ 🎨 *ᴛʜᴇᴍᴇs* 🌟
│ ⬢ .america
│ ⬢ .blackpink
│ ⬢ .naruto
│ ⬢ .nigeria
│ ⬢ .pornhub
│ ⬢ .sadgirl
│ ⬢ .thor
│ ⬢ .zodiac
│
│ ✨ *ᴇғғᴇᴄᴛs* 💥
│ ⬢ .3dcomic
│ ⬢ .3dpaper
│ ⬢ .boom
│ ⬢ .bulb
│ ⬢ .clouds
│ ⬢ .frozen
│ ⬢ .futuristic
│ ⬢ .galaxy
│ ⬢ .luxury
│ ⬢ .neonlight
│ ⬢ .sunset
│ ⬢ .typography
│ ⬢ .ytlogo
│
│ 🦁 *ᴄʜᴀʀᴀᴄᴛᴇʀs* 🐾
│ ⬢ .angelwings
│ ⬢ .bear
│ ⬢ .cat
│ ⬢ .deadpool
│ ⬢ .devilwings
│ ⬢ .dragonball
│ ⬢ .sans
│
│ 🖌️ *ᴄʀᴇᴀᴛɪᴠᴇ* 🎨
│ ⬢ .birthday
│ ⬢ .castle
│ ⬢ .eraser
│ ⬢ .hacker
│ ⬢ .leaf
│ ⬢ .paint
│ ⬢ .tatoo
│
╰═✨🌟🌟🌟🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['11'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/s6ol5l.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Logo Menu Error:', e.stack);
        reply(`❌ Error: Failed to display logo menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Settings Menu
malvin({
    pattern: 'settingsmenu',
    alias: ['smenu', '12'],
    desc: 'Show all bot configuration settings',
    category: 'owner',
    react: '⚙️',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply, isCreator }) => {
    try {
        if (!isCreator) return reply('❗ Only the bot owner can use this command.');

        const dec = `
╭═✧〔 ⚙️ *sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ* 〕✧═╮
│
│ 🤖 *ʙᴇʜᴀᴠɪᴏʀ* 🤖
│ ➢ .aichat
│ ➢ .auto-react
│ ➢ .auto-recording
│ ➢ .auto-reply
│ ➢ .auto-seen
│ ➢ .auto-sticker
│ ➢ .auto-typing
│ ➢ .auto-voice
│ ➢ .customreact
│ ➢ .fakerecording
│ ➢ .faketyping
│ ➢ .heartreact
│ ➢ .ownerreact
│ ➢ .status-react
│ ➢ .status-reply
│
│ 🔧 *ɢʀᴏᴜᴘ* 👥
│ ➢ .admin-events
│ ➢ .goodbye
│ ➢ .welcome
│ ➢ .mention-reply
│
│ ⚙️ *sʏsᴛᴇᴍ* 🛠️
│ ➢ .always-online
│ ➢ .mode
│ ➢ .setprefix
│ ➢ .setvar
│
│ 🛡️ *ғɪʟᴛᴇʀs* 🔒
│ ➢ .anti-bad
│ ➢ .antidelete
│
│ 📝 *ᴘʀᴏғɪʟᴇ* 🧑
│ ➢ .autobio
│
╰═✨🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['12'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/9qoecp.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Settings Menu Error:', e.stack);
        reply(`❌ Error: Failed to display settings menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Audio Menu
malvin({
    pattern: 'audiomenu',
    alias: ['admenu', '13'],
    desc: 'Show all audio effects commands',
    category: 'menu',
    react: '🎧',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        const dec = `
╭═✦〔 🎵 *ᴀᴜᴅɪᴏ ᴍᴇɴᴜ* 〕✦═╮
│
│ 🎵 *ᴇғғᴇᴄᴛs* 🎶
│ ⬩ .baby
│ ⬩ .bass
│ ⬩ .blown
│ ⬩ .chipmunk
│ ⬩ .deep
│ ⬩ .demon
│ ⬩ .earrape
│ ⬩ .fast
│ ⬩ .fat
│ ⬩ .nightcore
│ ⬩ .radio
│ ⬩ .reverse
│ ⬩ .robot
│ ⬩ .slow
│ ⬩ .smooth
│ ⬩ .tupai
│
╰═✨🌟🌟🌟🌟🌟🌟✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['13'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/ceeo6k.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Audio Menu Error:', e.stack);
        reply(`❌ Error: Failed to display audio menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});

// Privacy Menu
malvin({
    pattern: 'privacymenu',
    alias: ['pmenu', '14'],
    desc: 'Show all bot privacy settings',
    category: 'owner',
    react: '⚙️',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply, isCreator }) => {
    try {
        if (!isCreator) return reply('❗ Only the bot owner can use this command.');

        const dec = `
╭═✧〔 🔒 *ᴘʀɪᴠᴀᴄʏ ᴍᴇɴᴜ* 〕✧═╮
│
│ 🔒 *sᴇᴛᴛɪɴɢs* 🛡️
│ ✷ .anticall
│ ✷ .blocklist
│ ✷ .getbio
│ ✷ .groupsprivacy
│ ✷ .privacy
│ ✷ .setmyname
│ ✷ .setonline
│ ✷ .setppall
│ ✷ .updatebio
│ ✷ .pmblock
│
╰═✨🔥🔥🔥🔥🔥🔥🔥✨═╯

> ${config.DESCRIPTION}
`;

        await malvin.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGES?.['14'] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/jw8h57.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.NEWSLETTER_JID || '120363402507750390@newsletter',
                        newsletterName: config.OWNER_NAME || 'ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Privacy Menu Error:', e.stack);
        reply(`❌ Error: Failed to display privacy menu. Please try again later.\n\nDetails: ${e.message}`);
    }
});