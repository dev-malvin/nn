//---------------------------------------------------------------------------
//           MALVIN-XD 
//---------------------------------------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE ⚠️  
//---------------------------------------------------------------------------
const { malvin, commands } = require('../malvin');
const config = require('../settings');
const prefix = config.PREFIX;
const os = require('os');
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { exec } = require('child_process');
const { writeFileSync } = require('fs');
const path = require('path');
const { setConfig, getConfig } = require("../lib/configdb");
const { setPrefix } = require('../lib/prefix');
const axios = require('axios');
const FormData = require('form-data');

malvin({
    pattern: "admin-events",
    alias: ["adminevents"],
    desc: "Enable or disable admin event notifications",
    category: "settings",
    filename: __filename
},
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ADMIN_EVENTS = "true";
        return reply("*✅ ᴀᴅᴍɪɴ ᴇᴠᴇɴᴛ ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴs ᴀʀᴇ ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.ADMIN_EVENTS = "false";
        return reply("*❌ ᴀᴅᴍɪɴ ᴇᴠᴇɴᴛ ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴs ᴀʀᴇ ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴀᴅᴍɪɴ-ᴇᴠᴇɴᴛs ᴏɴ*");
    }
});

malvin({
    pattern: "faketyping",
    alias: ["faketyping"],
    desc: "Enable or disable fake typing of status",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.FAKE_TYPING = "true";
        return reply("*✅ ғᴀᴋᴇ ᴛʏᴘɪɴɢ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.FAKE_TYPING = "false";
        return reply("*❌ ғᴀᴋᴇ ᴛʏᴘɪɴɢ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ғᴀᴋᴇᴛʏᴘɪɴɢ ᴏɴ*");
    }
});

malvin({
    pattern: "fakerecording",
    alias: ["fakerecording"],
    desc: "Enable or disable fake recording of statuses",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.FAKE_RECORDING = "true";
        return reply("*✅ ғᴀᴋᴇ ʀᴇᴄᴏʀᴅɪɴɢ ᴏғ sᴛᴀᴛᴜs ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.FAKE_RECORDING = "false";
        return reply("*❌ ғᴀᴋᴇ ʀᴇᴄᴏʀᴅɪɴɢ ᴏғ sᴛᴀᴛᴜs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ғᴀᴋᴇʀᴇᴄᴏʀᴅɪɴɢ ᴏɴ*");
    }
});

malvin({
    pattern: "welcome",
    alias: ["welcomeset"],
    desc: "Enable or disable welcome messages for new members",
    category: "settings",
    filename: __filename
},
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.WELCOME = "true";
        return reply("*✅ ᴡᴇʟᴄᴏᴍᴇ ᴍᴇssᴀɢᴇs ᴀʀᴇ ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.WELCOME = "false";
        return reply("*❌ ᴡᴇʟᴄᴏᴍᴇ ᴍᴇssᴀɢᴇs ᴀʀᴇ ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴡᴇʟᴄᴏᴍᴇ ᴏɴ*");
    }
});

malvin({
    pattern: "mode",
    alias: ["setmode"],
    react: "🫟",
    desc: "Set bot mode to private or public.",
    category: "settings",
    filename: __filename,
}, async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    if (!args[0]) {
        return reply(`*❌ ᴄᴜʀʀᴇɴᴛ ᴍᴏᴅᴇ: ${config.MODE}*\n\n*usage: .mode private or .mode public')}*`);
    }
   
    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("*✅ ʙᴏᴛ ᴍᴏᴅᴇ ɪs ɴᴏᴡ sᴇᴛ ᴛᴏ ᴘʀɪᴠᴀᴛᴇ.*");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("*✅ ʙᴏᴛ ᴍᴏᴅᴇ ɪs ɴᴏᴡ sᴇᴛ ᴛᴏ ᴘᴜʙʟɪᴄ.*");
    } else {
        return reply("*❌ ɪɴᴠᴀʟɪᴅ ᴍᴏᴅᴇ. ᴘʟᴇᴀsᴇ ᴜsᴇ .ᴍᴏᴅᴇ ᴘʀɪᴠᴀᴛᴇ ᴏʀ .ᴍᴏᴅᴇ ᴘᴜʙʟɪᴄ*");
    }
});

malvin({
    pattern: "auto-typing",
    description: "Enable or disable auto-typing feature.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ᴛʏᴘɪɴɢ ᴏɴ*");
    }

    config.AUTO_TYPING = status === "on" ? "true" : "false";
    return reply(`*✅ ᴀᴜᴛᴏ-ᴛʏᴘɪɴɢ ʜᴀs ʙᴇᴇɴ ᴛᴜʀɴᴇᴅ ${status}.*`);
});

malvin({
    pattern: "mention-reply",
    alias: ["menetionreply", "mee"],
    description: "Set bot status to always online or offline.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.MENTION_REPLY = "true";
        return reply("*✅ ᴍᴇɴᴛɪᴏɴ ʀᴇᴘʟʏ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.MENTION_REPLY = "false";
        return reply("*❌ ᴍᴇɴᴛɪᴏɴ ʀᴇᴘʟʏ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴍᴇᴇ ᴏɴ*");
    }
});

malvin({
    pattern: "always-online",
    alias: ["alwaysonline"],
    desc: "Enable or disable the always online mode",
    category: "settings",
    filename: __filename
},
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ALWAYS_ONLINE = "true";
        await reply("*✅ ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ ᴍᴏᴅᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.ALWAYS_ONLINE = "false";
        await reply("*❌ ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ ᴍᴏᴅᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        await reply("*🛠️ ᴇxᴀᴍᴘʟᴇ: .ᴀʟᴡᴀʏs-ᴏɴʟɪɴᴇ ᴏɴ*");
    }
});

malvin({
    pattern: "auto-recording",
    alias: ["autorecoding"],
    description: "Enable or disable auto-recording feature.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ʀᴇᴄᴏʀᴅɪɴɢ ᴏɴ*");
    }

    config.AUTO_RECORDING = status === "on" ? "true" : "false";
    if (status === "on") {
        await malvin.sendPresenceUpdate("recording", from);
        return reply("*✅ ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ. ʙᴏᴛ ɪs ʀᴇᴄᴏʀᴅɪɴɢ...*");
    } else {
        await malvin.sendPresenceUpdate("available", from);
        return reply("*❌ ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ ʜᴀs ʙᴇᴇɴ ᴅɪsᴀʙʟᴇᴅ.*");
    }
});

malvin({
    pattern: "auto-seen",
    alias: ["autostatusview"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("*✅ ᴀᴜᴛᴏ-ᴠɪᴇᴡɪɴɢ ᴏғ sᴛᴀᴛᴜsᴇs ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("*❌ ᴀᴜᴛᴏ-ᴠɪᴇᴡɪɴɢ ᴏғ sᴛᴀᴛᴜsᴇs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-sᴇᴇɴ ᴏɴ*");
    }
});

malvin({
    pattern: "status-react",
    alias: ["statusreaction"],
    desc: "Enable or disable auto-liking of statuses",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("*✅ ᴀᴜᴛᴏ-ʟɪᴋɪɴɢ ᴏғ sᴛᴀᴛᴜsᴇs ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("*❌ ᴀᴜᴛᴏ-ʟɪᴋɪɴɢ ᴏғ sᴛᴀᴛᴜsᴇs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .sᴛᴀᴛᴜs-ʀᴇᴀᴄᴛ ᴏɴ*");
    }
});

malvin({
    pattern: "read-message",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.READ_MESSAGE = "true";
        return reply("*✅ ʀᴇᴀᴅᴍᴇssᴀɢᴇ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.READ_MESSAGE = "false";
        return reply("*❌ ʀᴇᴀᴅᴍᴇssᴀɢᴇ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ʀᴇᴀᴅ-ᴍᴇssᴀɢᴇ ᴏɴ*");
    }
});

malvin({
    pattern: "auto-voice",
    alias: ["autovoice"],
    desc: "enable or disable auto-voice.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_VOICE = "true";
        return reply("*✅ ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_VOICE = "false";
        return reply("*❌ ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ᴠᴏɪᴄᴇ ᴏɴ*");
    }
});

malvin({
    pattern: "anti-bad",
    alias: ["antibadword"],
    desc: "enable or disable anti-bad.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTI_BAD_WORD = "true";
        return reply("*✅ ᴀɴᴛɪ ʙᴀᴅ ᴡᴏʀᴅ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.ANTI_BAD_WORD = "false";
        return reply("*❌ ᴀɴᴛɪ ʙᴀᴅ ᴡᴏʀᴅ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴀɴᴛɪ-ʙᴀᴅ ᴏɴ*");
    }
});

malvin({
    pattern: "auto-sticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_STICKER = "true";
        return reply("*✅ ᴀᴜᴛᴏ-sᴛɪᴄᴋᴇʀ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_STICKER = "false";
        return reply("*❌ ᴀᴜᴛᴏ-sᴛɪᴄᴋᴇʀ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-sᴛɪᴄᴋᴇʀ ᴏɴ*");
    }
});

malvin({
    pattern: "auto-reply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_REPLY = "true";
        return reply("*✅ ᴀᴜᴛᴏ-ʀᴇᴘʟʏ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_REPLY = "false";
        return reply("*❌ ᴀᴜᴛᴏ-ʀᴇᴘʟʏ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ʀᴇᴘʟʏ ᴏɴ*");
    }
});

malvin({
    pattern: "auto-react",
    alias: ["autoreact"],
    desc: "Enable or disable the autoreact feature",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_REACT = "true";
        await reply("*✅ ᴀᴜᴛᴏʀᴇᴀᴄᴛ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_REACT = "false";
        await reply("*❌ ᴀᴜᴛᴏʀᴇᴀᴄᴛ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        await reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ ᴏɴ*");
    }
});

malvin({
    pattern: "status-reply",
    alias: ["autostatusreply"],
    desc: "enable or disable status-reply.",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.AUTO_STATUS_REPLY = "true";
        return reply("*✅ sᴛᴀᴛᴜs-ʀᴇᴘʟʏ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.AUTO_STATUS_REPLY = "false";
        return reply("*❌ sᴛᴀᴛᴜs-ʀᴇᴘʟʏ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .sᴛᴀᴛᴜs-ʀᴇᴘʟʏ ᴏɴ*");
    }
});

malvin({
    pattern: "antilink",
    alias: ["antilinks"],
    desc: "Enable or disable ANTI_LINK in groups",
    category: "group",
    react: "🚫",
    filename: __filename
}, async (malvin, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("*❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ᴀ ɢʀᴏᴜᴘ.*");
        if (!isBotAdmins) return reply("*❌ ʙᴏᴛ ᴍᴜsᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isAdmins) return reply("*❌ ʏᴏᴜ ᴍᴜsᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");

        if (args[0] === "on") {
            config.ANTI_LINK = "true";
            return reply("*✅ ᴀɴᴛɪ_ʟɪɴᴋ ʜᴀs ʙᴇᴇɴ ᴇɴᴀʙʟᴇᴅ.*");
        } else if (args[0] === "off") {
            config.ANTI_LINK = "false";
            return reply("*❌ ᴀɴᴛɪ_ʟɪɴᴋ ʜᴀs ʙᴇᴇɴ ᴅɪsᴀʙʟᴇᴅ.*");
        } else {
            return reply("*❌ ᴜsᴀɢᴇ: .ᴀɴᴛɪʟɪɴᴋ ᴏɴ/ᴏғғ*");
        }
    } catch (e) {
        return reply(`*❌ ᴇʀʀᴏʀ: ${e.message}*`);
    }
});

malvin({
    pattern: "antilinkkick",
    alias: ["kicklink"],
    desc: "Enable or disable ANTI_LINK_KICK in groups",
    category: "group",
    react: "⚠️",
    filename: __filename
}, async (malvin, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("*❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ᴀ ɢʀᴏᴜᴘ.*");
        if (!isBotAdmins) return reply("*❌ ʙᴏᴛ ᴍᴜsᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isAdmins) return reply("*❌ ʏᴏᴜ ᴍᴜsᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");

        if (args[0] === "on") {
            config.ANTI_LINK_KICK = "true";
            return reply("*✅ ᴀɴᴛɪ_ʟɪɴᴋ_ᴋɪᴄᴋ ʜᴀs ʙᴇᴇɴ ᴇɴᴀʙʟᴇᴅ.*");
        } else if (args[0] === "off") {
            config.ANTI_LINK_KICK = "false";
            return reply("*❌ ᴀɴᴛɪ_ʟɪɴᴋ_ᴋɪᴄᴋ ʜᴀs ʙᴇᴇɴ ᴅɪsᴀʙʟᴇᴅ.*");
        } else {
            return reply("*❌ ᴜsᴀɢᴇ: .ᴀɴᴛɪʟɪɴᴋᴋɪᴄᴋ ᴏɴ/ᴏғғ*");
        }
    } catch (e) {
        return reply(`*❌ ᴇʀʀᴏʀ: ${e.message}*`);
    }
});

malvin({
    pattern: "deletelink",
    alias: ["linksdelete"],
    desc: "Enable or disable DELETE_LINKS in groups",
    category: "group",
    react: "❌",
    filename: __filename
}, async (malvin, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("*❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ᴀ ɢʀᴏᴜᴘ.*");
        if (!isBotAdmins) return reply("*❌ ʙᴏᴛ ᴍᴜsᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isAdmins) return reply("*❌ ʏᴏᴜ ᴍᴜsᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");

        if (args[0] === "on") {
            config.DELETE_LINKS = "true";
            return reply("*✅ ᴅᴇʟᴇᴛᴇ_ʟɪɴᴋs ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
        } else if (args[0] === "off") {
            config.DELETE_LINKS = "false";
            return reply("*❌ ᴅᴇʟᴇᴛᴇ_ʟɪɴᴋs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
        } else {
            return reply("*❌ ᴜsᴀɢᴇ: .ᴅᴇʟᴇᴛᴇʟɪɴᴋ ᴏɴ/ᴏғғ*");
        }
    } catch (e) {
        return reply(`*❌ ᴇʀʀᴏʀ: ${e.message}*`);
    }
});

malvin({
    pattern: "setvar",
    alias: ["envvar", "malvinlist"],
    react: "📜",
    desc: "List all commands and their current status.",
    category: "settings",
    filename: __filename,
}, async (malvin, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const malvinList = `
*╭━━━〔 🛠️ ᴍᴀʟᴠɪɴ-ᴠ3 sᴇᴛᴛɪɴɢs 〕━━⬣*

*🔧 1.*  *ᴍᴏᴅᴇ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.MODE || "public"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}mode private/public

*🎯 2.*  *ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_TYPING || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autotyping on/off

*🌐 3.*  *ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.ALWAYS_ONLINE || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}alwaysonline on/off

*🎙️ 4.*  *ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_RECORDING || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autorecording on/off

*📖 5.*  *ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴛᴜs* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_STATUS_REACT || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autoreadstatus on/off

*🚫 6.*  *ᴀɴᴛɪ ʙᴀᴅ ᴡᴏʀᴅ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.ANTI_BAD_WORD || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}antibad on/off

*🗑️ 7.*  *ᴀɴᴛɪ ᴅᴇʟᴇᴛᴇ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.ANTI_DELETE || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}antidelete on/off

*🖼️ 8.*  *ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_STICKER || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autosticker on/off

*💬 9.*  *ᴀᴜᴛᴏ ʀᴇᴘʟʏ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_REPLY || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autoreply on/off

*❤️ 10.* *ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_REACT || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autoreact on/off

*📢 11.* *sᴛᴀᴛᴜs ʀᴇᴘʟʏ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.AUTO_STATUS_REPLY || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}autostatusreply on/off

*🔗 12.* *ᴀɴᴛɪ ʟɪɴᴋ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.ANTI_LINK || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}antilink on/off

*🤖 13.* *ᴀɴᴛɪ ʙᴏᴛ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.ANTI_BOT || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}antibot off/warn/delete/kick

*💖 14.* *ʜᴇᴀʀᴛ ʀᴇᴀᴄᴛ* :
   ┗ *sᴛᴀᴛᴜs*: ${config.HEART_REACT || "off"}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}heartreact on/off

*🧩 15.* *sᴇᴛ ᴘʀᴇғɪx* :
   ┗ *ᴄᴜʀʀᴇɴᴛ*: ${config.PREFIX || "."}
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}setprefix <new_prefix>

*📊 16.* *ᴘᴏʟʟ ᴄᴍᴅ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}poll question;option1,option2,...

*💞 17.* *ʀᴀɴᴅᴏᴍ sʜɪᴘ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}randomship

*👥 18.* *ɴᴇᴡ ɢʀᴏᴜᴘ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}newgc group_name;num1,num2,...

*🚪 19.* *ᴇxɪᴛ ɢʀᴏᴜᴘ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}exit

*🔗 20.* *ɪɴᴠɪᴛᴇ ʟɪɴᴋ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}invite2

*📢 21.* *ʙʀᴏᴀᴅᴄᴀsᴛ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}broadcast <text>

*🖼️ 22.* *sᴇᴛ ɢʀᴏᴜᴘ ᴘɪᴄ* :
   ┗ *ᴜsᴀɢᴇ*: ${config.PREFIX}setgrouppp (reply to image)

*╰─📌 ɴᴏᴛᴇ*: *ᴜsᴇ "ᴏɴ/ᴏғғ" ᴛᴏ ᴇɴᴀʙʟᴇ ᴏʀ ᴅɪsᴀʙʟᴇ ᴇᴀᴄʜ ғᴇᴀᴛᴜʀᴇ.*
`;

    return reply(malvinList);
});

malvin({
    pattern: "heartreact",
    react: "💖",
    alias: ["heart"],
    desc: "Enable or disable heart react.",
    category: "settings",
    filename: __filename,
}, async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const option = args[0]?.toLowerCase();
    
    if (option === "on" || option === "true") {
        config.HEART_REACT = "true";
        return reply("*✅ ʜᴇᴀʀᴛ ʀᴇᴀᴄᴛ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (option === "off" || option === "false") {
        config.HEART_REACT = "false";
        return reply("*❌ ʜᴇᴀʀᴛ ʀᴇᴀᴄᴛ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*🔥 ᴇxᴀᴍᴘʟᴇ: .ʜᴇᴀʀᴛʀᴇᴀᴄᴛ ᴏɴ ᴏʀ .ʜᴇᴀʀᴛʀᴇᴀᴄᴛ ᴏғғ*");
    }
});

malvin({
    pattern: "antibot",
    alias: ["antibot"],
    desc: "Enable Antibot and set action (off/warn/delete/kick)",
    category: "group",
    filename: __filename
}, async (malvin, mek, m, { q, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    if (!q) {
        return reply(`*❌ ᴄᴜʀʀᴇɴᴛ ᴀɴᴛɪʙᴏᴛ ᴀᴄᴛɪᴏɴ: ${antibotAction.toUpperCase()}*\n\n*ᴜsᴇ .ᴀɴᴛɪʙᴏᴛ ᴏғғ/ᴡᴀʀɴ/ᴅᴇʟᴇᴛᴇ/ᴋɪᴄᴋ ᴛᴏ ᴄʜᴀɴɢᴇ ɪᴛ.*`);
    }

    const action = q.toLowerCase();
    if (["off", "warn", "delete", "kick"].includes(action)) {
        antibotAction = action;
        return reply(`*✅ ᴀɴᴛɪʙᴏᴛ ᴀᴄᴛɪᴏɴ sᴇᴛ ᴛᴏ: ${action.toUpperCase()}*`);
    } else {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀɴᴛɪʙᴏᴛ ᴏғғ/ᴡᴀʀɴ/ᴅᴇʟᴇᴛᴇ/ᴋɪᴄᴋ*");
    }
});

malvin({
    pattern: "setreacts",
    alias: ["customemojis", "emojis", "cemojis"],
    desc: "Set custom reaction emojis for the bot",
    category: "owner",
    react: "🌈",
    filename: __filename
}, async (malvin, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪOregon ɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const emojiList = args.join(" ").trim();
    if (!emojiList) return reply("*❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴄᴏᴍᴍᴀ-sᴇᴘᴀʀᴀᴛᴇᴅ ʟɪsᴛ ᴏғ ᴇᴍᴏᴊɪs.*\n\n*ᴇxᴀᴍᴘʟᴇ: .sᴇᴛʀᴇᴀᴄᴛs 💖,💗,💘,💕*");

    await setConfig("CUSTOM_REACT_EMOJIS", emojiList);

    await reply(`*✅ ᴄᴜsᴛᴏᴍ ʀᴇᴀᴄᴛɪᴏɴ ᴇᴍᴏᴊɪs ᴜᴘᴅᴀᴛᴇᴅ ᴛᴏ:*\n${emojiList}\n\n*♻️ ʀᴇsᴛᴀʀᴛɪɴɢ ʙᴏᴛ ᴛᴏ ᴀᴘᴘʟʏ ᴄʜᴀɴɢᴇs...*`);
    setTimeout(() => exec("pm2 restart all"), 2000);
});

malvin({
    pattern: "customreact",
    alias: ["creact", "reactc"],
    react: "😎",
    desc: "Enable or disable custom reactions",
    category: "settings",
    filename: __filename
},
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.CUSTOM_REACT = "true";
        return reply("*✅ ᴄᴜsᴛᴏᴍ ʀᴇᴀᴄᴛɪᴏɴs ᴀʀᴇ ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.CUSTOM_REACT = "false";
        return reply("*❌ ᴄᴜsᴛᴏᴍ ʀᴇᴀᴄᴛɪᴏɴs ᴀʀᴇ ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ᴄᴜsᴛᴏᴍʀᴇᴀᴄᴛ ᴏɴ*");
    }
});

malvin({
    pattern: "ownerreact",
    alias: ["owner-react", "selfreact", "self-react"],
    react: "👑",
    desc: "Enable or disable the owner react feature",
    category: "settings",
    filename: __filename
},    
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.OWNER_REACT = "true";
        await reply("*✅ ᴏᴡɴᴇʀʀᴇᴀᴄᴛ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.OWNER_REACT = "false";
        await reply("*❌ ᴏᴡɴᴇʀʀᴇᴀᴄᴛ ғᴇᴀᴛᴜʀᴇ ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        await reply("*🔥 ᴇxᴀᴍᴘʟᴇ: .ᴏᴡɴᴇʀʀᴇᴀᴄᴛ ᴏɴ*");
    }
});

malvin({
    pattern: "anti-call",
    react: "🫟",
    alias: ["anticall"],
    desc: "Enable or disable anti-call feature",
    category: "owner",
    filename: __filename
},
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTI_CALL = "true";
        return reply("*✅ ᴀɴᴛɪ-ᴄᴀʟʟ ʜᴀs ʙᴇᴇɴ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.ANTI_CALL = "false";
        return reply("*❌ ᴀɴᴛɪ-ᴄᴀʟʟ ʜᴀs ʙᴇᴇɴ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*🏷️ ᴇxᴀᴍᴘʟᴇ: .ᴀɴᴛɪ-ᴄᴀʟʟ ᴏɴ/ᴏғғ*");
    }
});

malvin({
    pattern: "goodbye",
    alias: ["setgoodbye"],
    react: "✅",
    desc: "Enable or disable goodbye messages for leaving members",
    category: "settings",
    filename: __filename
},
async (malvin, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.GOODBYE = "true";
        return reply("*✅ ɢᴏᴏᴅʙʏᴇ ᴍᴇssᴀɢᴇs ᴀʀᴇ ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ.*");
    } else if (status === "off") {
        config.GOODBYE = "false";
        return reply("*❌ ɢᴏᴏᴅʙʏᴇ ᴍᴇssᴀɢᴇs ᴀʀᴇ ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*");
    } else {
        return reply("*❌ ᴇxᴀᴍᴘʟᴇ: .ɢᴏᴏᴅʙʏᴇ ᴏɴ*");
    }
});

malvin({
    pattern: "setbotname",
    alias: ["botname"],
    desc: "Set the bot's name",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (malvin, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");
    const newName = args.join(" ").trim();
    if (!newName) return reply("*❌ ᴘʀᴏᴠɪᴅᴇ ᴀ ʙᴏᴛ ɴᴀᴍᴇ.*");

    await setConfig("BOT_NAME", newName);

    await reply(`*✅ ʙᴏᴛ ɴᴀᴍᴇ ᴜᴘᴅᴀᴛᴇᴅ ᴛᴏ: ${newName}*\n\n*♻️ ʀᴇsᴛᴀʀᴛɪɴɢ...*`);
    setTimeout(() => exec("pm2 restart all"), 2000);
});

malvin({
    pattern: "setownername",
    alias: ["ownername"],
    desc: "Set the owner's name",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (malvin, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");
    const name = args.join(" ").trim();
    if (!name) return reply("*❌ ᴘʀᴏᴠɪᴅᴇ ᴀɴ ᴏᴡɴᴇʀ ɴᴀᴍᴇ.*");

    await setConfig("OWNER_NAME", name);

    await reply(`*✅ ᴏᴡɴᴇʀ ɴᴀᴍᴇ ᴜᴘᴅᴀᴛᴇᴅ ᴛᴏ: ${name}*\n\n*♻️ ʀᴇsᴛᴀʀᴛɪɴɢ...*`);
    setTimeout(() => exec("pm2 restart all"), 2000);
});

malvin({
    pattern: "setbotimage",
    alias: ["botdp", "botpic", "botimage"],
    desc: "Set the bot's image URL",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (malvin, mek, m, { args, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

        let imageUrl = args[0];

        if (!imageUrl && m.quoted) {
            const quotedMsg = m.quoted;
            const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
            if (!mimeType.startsWith("image")) return reply("*❌ ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ.*");

            const mediaBuffer = await quotedMsg.download();
            const extension = mimeType.includes("jpeg") ? ".jpg" : ".png";
            const tempFilePath = path.join(os.tmpdir(), `botimg_${Date.now()}${extension}`);
            fs.writeFileSync(tempFilePath, mediaBuffer);

            const form = new FormData();
            form.append("fileToUpload", fs.createReadStream(tempFilePath), `botimage${extension}`);
            form.append("reqtype", "fileupload");

            const response = await axios.post("https://catbox.moe/user/api.php", form, {
                headers: form.getHeaders()
            });

            fs.unlinkSync(tempFilePath);

            if (typeof response.data !== 'string' || !response.data.startsWith('https://')) {
                throw new Error(`Catbox upload failed: ${response.data}`);
            }

            imageUrl = response.data;
        }

        if (!imageUrl || !imageUrl.startsWith("http")) {
            return reply("*❌ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɪᴍᴀɢᴇ ᴜʀʟ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ.*");
        }

        await setConfig("MENU_IMAGE_URL", imageUrl);

        await reply(`*✅ ʙᴏᴛ ɪᴍᴀɢᴇ ᴜᴘᴅᴀᴛᴇᴅ.*\n\n*ɴᴇᴡ ᴜʀʟ: ${imageUrl}*\n\n*♻️ ʀᴇsᴛᴀʀᴛɪɴɢ...*`);
        setTimeout(() => exec("pm2 restart all"), 2000);

    } catch (err) {
        console.error(err);
        return reply(`*❌ ᴇʀʀᴏʀ: ${err.message || err}*`);
    }
});

malvin({
    pattern: "setprefix",
    alias: ["prefix"],
    react: "🪄",
    desc: "Change the bot's command prefix.",
    category: "settings",
    filename: __filename,
}, async (malvin, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const newPrefix = args[0];
    if (!newPrefix) return reply("*❌ ᴘʀᴏᴠɪᴅᴇ ɴᴇᴡ ᴘʀᴇғɪx. ᴇxᴀᴍᴘʟᴇ: .sᴇᴛᴘʀᴇғɪx !*");

    setPrefix(newPrefix); // updates without reboot
    return reply(`*✅ ᴘʀᴇғɪx ᴜᴘᴅᴀᴛᴇᴅ ᴛᴏ: ${newPrefix}*`);
});

// Malvin Kings Code