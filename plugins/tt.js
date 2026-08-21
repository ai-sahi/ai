import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

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


        const api =
        `https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/video?url=${encodeURIComponent(text)}`;


        const res = await axios.get(api, {
            timeout: 30000,
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host":
                "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
                "x-rapidapi-key":
                "YOUR_RAPIDAPI_KEY"
            }
        });


        const videoUrl =
        res.data?.video?.[0] ||
        res.data?.video ||
        res.data?.url;


        if (!videoUrl) {
            return reply("❌ Video URL nahi mili.");
        }


        await conn.sendMessage(from, {
            video: {
                url: videoUrl
            },
            caption:
`🎵 *TIKTOK VIDEO*

✅ Download Complete

> Powered by 𝐒𝐀𝐇𝐈𝐋-𝐌𝐃💀🚩`
        }, { quoted: mek });


        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });


    } catch (err) {

        console.log("TT ERROR:", err?.response?.data || err);

        reply("❌ TikTok download failed.");
    }

});
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
