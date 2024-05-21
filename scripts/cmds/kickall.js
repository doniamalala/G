module.exports = {
  config: {
    name: "kickall",
    version: "1.0.0",
    role: 2,
    credits: "Cliff", // Original author
    description: "Remove all group members.",
    usages: "{p}kickall",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["bura"],
  },
  onStart: async function({ api, event, getText, args }) {
    const { participantIDs } = await api.getThreadInfo(event.threadID);

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID);

    return api.getThreadInfo(event.threadID, async (err, info) => {
      if (err) {
        return api.sendMessage("» An error occurred.", event.threadID);
      }
      if (!info.adminIDs.some(item => item.id == botID)) {
        return api.sendMessage(`» Need group admin rights.\nPlease add and try again.`, event.threadID, event.messageID);
      }
      if (info.adminIDs.some(item => item.id == event.senderID)) {
        setTimeout(() => {
          api.removeUserFromGroup(botID, event.threadID);
        }, 300000);
        api.sendMessage(`» Start deleting all members. Bye everyone.`, event.threadID, async () => {
          for (let id of listUserID) {
            await delay(1000);
            api.removeUserFromGroup(id, event.threadID);
          }
        });
      } else {
        return api.sendMessage('» Only group admins can use this command.', event.threadID, event.messageID);
      }
    });
  }
};
