const axios = require('axios');

module.exports = {
  config: {
    name: 'kiyokata',
    version: '1.0',
    author: 'Original Idea from: Akhiro',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: {
      en: `Kiyotaka is an Handsome AI Language Model inspired by a character from Classroom Of Elite, Kiyotaka exels as an fake person that uses his friends as a tool for his successfullness`
    },
    longDescription: {
      en: `Kiyotaka is an Handsome AI Language Model inspired by a character from Classroom Of Elite, Kiyotaka exels as an fake person that uses his friends as a tool for his successfullness`
    },
    guide: {
      en: '{pn}kiyokata [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking 🤵  | Kiyotaka AI. Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@public/api/kiyokata?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent 🤵  | Kiyotaka AI's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from 🤵  | Kiyotaka AI API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get 🤵  | Kiyotaka AI's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
