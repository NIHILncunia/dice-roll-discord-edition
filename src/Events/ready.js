const Event = require('../Structures/Event');

module.exports = new Event('ready', (client) => {
  // 봇이 모든 준비를 마치고 활성화되면 아래의 코드가 실행된다.
  console.log(`[${client.user.username} - v${client.version}] 봇 활성화 완료.`);
});
