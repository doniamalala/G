const axios = require('axios');

module.exports = {
  config: {
    name: 'gpt5',
    version: '1.0',
    author: 'Open Ai',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: {
      en: `GPT-5 offers context-aware, empathetic interactions, integrating real-time updates and multimodal inputs for proactive, dynamic, and personalized assistance.`
    },
    longDescription: {
      en: `GPT-5 offers context-aware, empathetic interactions, integrating real-time updates and multimodal inputs for proactive, dynamic, and personalized assistance.`
    },
    guide: {
      en: '{pn}gpt-5 [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking GPT - 5. Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/gpt-5?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent GPT - 5's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from GPT - 5 API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get GPT - 5's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
