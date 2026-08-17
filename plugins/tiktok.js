tiktok.js

// 𝐒𝐀𝐇𝐈𝐋-𝐌𝐃💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "tiktok",
    desc: "Download TikTok videos.",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { q, reply }) => {
    try {

        if (!q) {
            return reply(
                "🎵 *TIKTOK DOWNLOADER*\n\n" +
                "📌 *Usage:* `.tiktok <TikTok URL>`\n\n" +
                "Example:\n" +
                "`.tiktok https://www.tiktok.com/@user/video/123456789`\n\n" +
                "⚡ *𝐒𝐀𝐇𝐈𝐋-𝐌𝐃💀🚩*"
            );
        }

        if (!q.includes("tiktok.com")) {
            return reply("❌ *Please send a valid TikTok URL.*");
        }

        await reply("⏳ *Downloading TikTok video...*");

        const response = await axios.post(
            "https://www.tikwm.com/api/",
            new URLSearchParams({
                url: q.trim(),
                hd: "1"
            }),
            {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                timeout: 30000
            }
        );

        const data = response.data;

        if (!data || data.code !== 0 || !data.data?.play) {
            return reply(
                "❌ *Video download failed.*\n\n" +
                "Try another public TikTok video."
            );
        }

        const videoUrl = data.data.play;

        const video = await axios.get(videoUrl, {
            responseType: "arraybuffer",
            timeout: 60000,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        await conn.sendMessage(
            mek.key.remoteJid,
            {
                video: Buffer.from(video.data),
                mimetype: "video/mp4",
                caption:
                    "🎵 *TikTok Downloaded Successfully!*\n\n" +
                    "👤 *Author:* " +
                    (data.data.author?.unique_id || "Unknown") +
                    "\n\n" +
                    "⚡ *𝐒𝐀𝐇𝐈𝐋-𝐌𝐃💀🚩*"
            },
            { quoted: mek }
        );

    } catch (error) {
        console.error("TikTok Downloader Error:", error);

        return reply(
            "❌ *TikTok Download Failed!*\n\n" +
            "Please try another public TikTok URL."
        );
    }
});
