const axios = require('axios');

module.exports = {
  config: {
    name: 'zenmaster',
    version: '1.0',
    author: 'Serenity',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: {
      en: `Find peace and serenity with ZenMaster, your AI guide to mindfulness and meditation.`
    },
    longDescription: {
      en: `Find peace and serenity with ZenMaster, your AI guide to mindfulness and meditation.`
    },
    guide: {
      en: '{pn}zenmaster_by_serenity [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking ZenMaster. Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@nealianacagara/api/zenmaster_by_serenity?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent ZenMaster's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from ZenMaster API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get ZenMaster's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
