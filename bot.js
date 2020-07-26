const { Wechaty } = require('wechaty')
const onMessage = require('./onMessage')

const puppet = 'wechaty-puppet-padplus' // 使用ipad 的方式接入。

const bot = Wechaty.instance({
  name: 'bot',
  puppet,
}) // Global Instance

bot.start()

bot.on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    let loginUrl = url.replace(/\/qrcode\//, '/l/')
    require('qrcode-terminal').generate(loginUrl, 'small')
  }
  console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})

bot.on('login', (user) => {
  console.log(`User ${user} logined`)
})

bot.on('message', onMessage(bot))

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
