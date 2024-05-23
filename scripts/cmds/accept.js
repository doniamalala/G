const axios = require("axios");

module.exports = {
  config: {
    description: "Automatically accept pending threads",
    role: "botadmin",
    credits: "Rejard",
    cooldown: 10
  },

  onStart: async ({ api, event, args, commands }) => {
    const list = [
      ...(await api.getThreadList(1, null, ['PENDING'])),
      ...(await api.getThreadList(1, null, ['OTHER']))
    ];

    if (list[0]) {
      list.forEach(thread => {
        api.sendMessage(
          'Congrats! this Thread has been approved by botadmin. You can now use our bot. Type !help to see all the commands. Thanks 👍',
          thread.threadID
        );
      });

      api.sendMessage("Threads Accepted Successfully.", event.threadID, event.messageID);
    } else {
      api.sendMessage("There are no pending thread requests.", event.threadID, event.messageID);
    }
  }
};
