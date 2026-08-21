import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

const API_BASE = "https://xjawadtech.vercel.app";

cmd({
    pattern: "tt",
    alias: ["tiktok", "tik"],
    desc: "Download TikTok video",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, text, reply }) => {

    try {

        if (!text) {
            return reply(
`❌ TikTok link send karein

Example:
.tt https://www.tiktok.com/@user/video/123`
            );
        }

        if (!text.includes("tiktok.com")) {
            return reply("❌ Valid TikTok link bhejein!");
        }


        await conn.sendMessage(from, {
            text:
`🎵 *TIKTOK DOWNLOADER*

⏳ Video download ho rahi hai...

> Powered by 𝐒𝐀𝐇𝐈𝐋-𝐌𝐃💀🚩`
        }, { quoted: mek });


        let videoUrl = null;
        let success = false;


        const apis = [
            `${API_BASE}/tiktok?url=${encodeURIComponent(text)}`,
            `${API_BASE}/tt?url=${encodeURIComponent(text)}`,
            `${API_BASE}/tiktokdl?url=${encodeURIComponent(text)}`
        ];


        for (let api of apis) {

            try {

                const res = await axios.get(api, {
                    timeout: 20000
                });


                videoUrl =
                res.data?.download?.url ||
                res.data?.result?.video ||
                res.data?.video ||
                res.data?.url;


                if (videoUrl) {

                    await conn.sendMessage(from, {

                        video: {
                            url: videoUrl
                        },

                        caption:
`🎵 *TIKTOK VIDEO*

✅ Download Complete

> Powered by 𝐒𝐀𝐇𝐈𝐋-𝐌𝐃💀🚩`

                    }, { quoted: mek });


                    success = true;
                    break;
                }


            } catch (e) {
                continue;
            }
        }


        if (!success) {
            return reply(
"❌ TikTok download failed. API response nahi mila."
            );
        }


        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });


    } catch (err) {

        console.log("TT ERROR:", err);

        reply("❌ Error occurred!");

    }

});
