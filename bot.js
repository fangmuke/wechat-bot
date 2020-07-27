const { Wechaty } = require('wechaty')
const qrcode = require('qrcode-terminal')
const onMessage = require('./handles/onMessage')

const puppet = 'wechaty-puppet-padplus' // 使用ipad 的方式接入。

const bot = Wechaty.instance({
  name: 'bot',
  puppet,
})

bot.start()

bot.on('scan', (url, code) => {
  qrcode.generate(url, { small: true })

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
