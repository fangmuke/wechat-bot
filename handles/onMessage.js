const { Message: MessageType } = require('wechaty')
const Message = require('../models/message')
const tianTi = require('./tianTi')
const _ = require('lodash')
const myTianTi = require('./myTianTi')
const tip = require('./tip')

module.exports = (bot) => {
  return async function onMessage(msg) {
    if (msg.self()) return
    if (msg.type() == 0) return

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

    if (msg.room()) {
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

      if (msg.type() == MessageType.Type.Text) {
        let self = await msg.to()
        self = `@${self.name()}`

        if (await msg.mentionSelf()) {
          let sendText = msg.text().replace(self, '')

          await room.sync()

          if (_.includes(sendText, '我的天梯')) {
            myTianTi.next({ msg, bot })
            return
          }

          if (_.includes(sendText, '天梯')) {
            tianTi.next({ msg, bot })
            return
          }

          tip.next({ msg, bot })
          return
        } else {
          if (_.includes(text, self)) {
            tip.next({ msg, bot })
            return
          }
        }
      }
    }
  }
}
