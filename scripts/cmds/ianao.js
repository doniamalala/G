const axios = require('axios');

async function getUserNames(api, uid) {
  try {
    const userInfo = await api.getUserInfo([uid]);
    return Object.values(userInfo).map(user => user.name || `User${uid}`);
  } catch (error) {
    console.error('Erreur lors de la récupération des noms d\'utilisateur :', error);
    return [];
  }
}

function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  return text.split('').map(char => fontMapping[char] || char).join('');
}

module.exports = {
  config: {
    name: 'ianao',
    version: '1.1.1',
    hasPermssion: 0,
    role: 0,
    credits: 'hashier',
    description: 'Alimenté par Snowflakes AI',
    usePrefix: false,
    hasPrefix: false,
    commandCategory: 'snowflakes',
    usages: '[prompt]',
    usage: 'prompt',
    cooldowns: 0,
    aliases: ["snowai"],
    cooldown: 0,
  },
  onStart: async function({ api, event, args }) {
    const uid = event.senderID;
    const userNames = await getUserNames(api, uid);
    const user = args.join(" ");

    try {
      if (!user) {
        return api.sendMessage("Veuillez d'abord fournir une question !", event.threadID, event.messageID);
      }

      const searchMessage = await api.sendMessage(`🔍 𝙍𝙚𝙘𝙝𝙚𝙧𝙘𝙝𝙚 𝙋𝙡𝙚𝙖𝙨𝙚 𝙒𝙖𝙞𝙩....`, event.threadID);
      const response = await axios.get(`https://api.easy-api.online/v1/globalgpt?q=${encodeURIComponent(user)}`);
      const responseData = response.data;
      const content = formatFont(responseData.response);
      await api.sendMessage(`❄️ 𝗦𝗡𝗢𝗪𝗙𝗟𝗔𝗞𝗘𝗦 (𝐀𝐈)\n\n🖋️ Réponse : '${content}'\n\n👤 Question posée par : ${userNames.join(', ')}`, event.threadID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("Une erreur est survenue lors du traitement de votre demande.", event.threadID, event.messageID);
    }
  }
};

