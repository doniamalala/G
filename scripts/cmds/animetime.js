const axios = require("axios");

const animeNames = ["one-piece", "wind-breaker", "mushoku-tensei-isekai-ittara-honki-dasu-2-part-2", "kimetsu-no-yaiba-hashira-geiko-hen"]; // Add your more names here

module.exports = {
  config: {
    name: "animetime", 
    aliases: ["at"],
    author: "Vex_Kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "Get anime episode release time",
    longDescription: "Get episode release time for specified anime or all listed anime",
    category: "fun",
    guide: "{p}animetime or {p}animetime {animeName}",
  },

  onStart: async function ({ api, event, message, args }) {
    const animeNameArg = args[0]; 
    let animeDataList = [];

    if (!animeNameArg) {
     
      try {
        for (const animeName of animeNames) {
          const response = await axios.get(`https://anime-time-one.vercel.app/kshitiz?name=${animeName}`);
          const animeData = formatAnimeData(response.data);
          animeDataList.push(animeData);
        }
        const replyMessage = animeDataList.join("\n\n");
        await message.reply(replyMessage);
      } catch (error) {
        console.error(error);
        message.reply("wrong anime name format.");
      }
    } else {
     
      try {
        const response = await axios.get(`https://anime-time-one.vercel.app/kshitiz?name=${animeNameArg}`);
        const animeData = formatAnimeData(response.data);
        await message.reply(animeData);
      } catch (error) {
        console.error(error);
        message.reply("anime name format is not mattching.");
      }
    }
  }
};

function formatAnimeData(data) {
  return `✰𝗔𝗡𝗜𝗠𝗘: ${data.animeName}\n✰𝗖𝗢𝗠𝗠𝗜𝗡𝗚 𝗔𝗧 ${data.subs}\n✰𝗖𝗢𝗨𝗡𝗧𝗗𝗢𝗪𝗡:\n    - 𝗥𝗔𝗪: ${data.countdown.raw}\n    - 𝗦𝗨𝗕:${data.countdown.subs}`;
}
