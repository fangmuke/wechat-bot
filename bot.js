const { Wechaty } = require('wechaty')
const qrcode = require('qrcode-terminal')
const onMessage = require('./handles/onMessage')

/**
 * ----------------------------------------------------------------------
                    写字楼里写字间，写字间里程序员;
                    程序人员写程序，又拿程序换酒钱。
                    酒醒只在网上坐，酒醉还来网下眠;
                    酒醉酒醒日复日，网上网下年复年。
                    但愿老死电脑间，不愿鞠躬老板前;
                    奔驰宝马贵者趣，公交自行程序员。
                    别人笑我忒疯癫，我笑自己命太贱;
                    不见满街漂亮妹，哪个归得程序员。 ​
 * ----------------------------------------------------------------------
*/

const puppet = 'wechaty-puppet-padplus'

const bot = Wechaty.instance({
  name: 'bot',
  puppet,
})

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
