const { Message: MessageType } = require('wechaty')
const Message = require('./models/message')
const TianTi = require('./tianTi')
const _ = require('lodash')

// 消息监听回调
module.exports = (bot) => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return

    console.log('=============================')
    console.log(`msg : ${msg}`)
    console.log(
      `from: ${msg.from() ? msg.from().name() : null}: ${
        msg.from() ? msg.from().id : null
      }`
    )
    console.log(`to: ${msg.to()}`)
    console.log(`text: ${msg.text()}`)
    console.log(`isRoom: ${msg.room()}`)
    console.log('=============================')

    // 判断此消息类型是否为文本
    if (msg.type() == MessageType.Type.Text) {
      // 判断消息类型来自群聊
      if (msg.room()) {
        // 获取群聊
        const room = await msg.room()
        const roomId = room.id
        const contact = await msg.from()
        const text = await msg.text()

        const contactId = contact.id

        await Message.create({
          roomId,
          contactId,
          text,
        })

        // 收到消息，提到自己
        if (await msg.mentionSelf()) {
          // 获取提到自己的名字
          let self = await msg.to()
          self = `@${self.name()}`
          // 获取消息内容，拿到整个消息文本，去掉 @+名字
          let sendText = msg.text().replace(self, '')
          sendText = sendText.slice(1)

          if (_.includes(sendText, '天梯')) {
            TianTi.next({ room, bot })
            return
          }
          return
        }
      }
    }
  }
}
