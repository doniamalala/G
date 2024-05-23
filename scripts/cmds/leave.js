module.exports = {
  config: {
    name: "leave",
    aliases: ["exit"],
    version: "1.0.0",
    credits: "atomic-zero",
    role: "botadmin",
    type: "utility",
    info: "Bot leave the group",
    usage: "[userID]",
    guide: "leave [userID]",
    cd: 80
  },

  onStart: async ({ api, event, args }) => {
    const { threadID, messageID } = event;

    try {
      if (!args[0]) {
        await api.removeUserFromGroup(api.getCurrentUserID(), threadID);
      } else if (!isNaN(args[0])) {
        await api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
      }
    } catch (error) {
      api.sendMessage(error.message, threadID, messageID);
    }
  }
};
