import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const API BASE "    ";


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
       `https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index?url=${encodeURIComponent(text)}`
];
        


        for (let api of apis) {

            try {

                const res = await axios.get(api, {
                timeout: 20000,
                headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
                "x-rapidapi-key": "6244db707amsh3d633c3d12356c7p1ac590jsnfc09c1e57771"   
        }
);


                videoUrl =
                res.data?.video?.[0] ||
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
