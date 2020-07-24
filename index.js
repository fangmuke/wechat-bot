const { Wechaty } = require('wechaty')
const { Sequelize, DataTypes, Op } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')

const puppet = 'wechaty-puppet-padplus' // 使用ipad 的方式接入。

const bot = Wechaty.instance({
  name: 'bot',
  puppet,
}) // Global Instance

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'bot.db',
})

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: DataTypes.TEXT,
    contactId: DataTypes.TEXT,
    text: DataTypes.BLOB,
  },
  {
    updatedAt: false,
  }
)

// sequelize.sync({ force: true })
// return

bot.start()

bot.on('scan', (qrcode, status) =>
  console.log(
    `Scan QR Code to login: ${status}\nhttps://wechaty.github.io/qrcode/${encodeURIComponent(
      qrcode
    )}`
  )
)

bot.on('login', (user) => {
  console.log(`User ${user} logined`)
})

bot.on('message', async (msg) => {
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()

  if (room) {
    const roomId = room.id
    const contactId = contact.id
    const topic = await room.topic()
    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
    Message.create({
      roomId,
      contactId,
      text,
    })

    if (text == '天梯') {
      const start = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      const end = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      const count = await Message.count({
        where: {
          createdAt: {
            [Op.between]: [start, end],
          },
        },
      })
      const messages = await Message.findAll({
        attributes: [
          'contactId',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where: {
          createdAt: {
            [Op.between]: [start, end],
          },
        },
        group: 'contactId',
        order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
        limit: 10,
      })
      let message = `本群天梯排行榜
(${start} - ${end}) - ${count}`

      await Promise.all(
        messages.map(async (msg, index) => {
          const contact = bot.Contact.load(msg.getDataValue('contactId'))
          const alias = await room.alias(contact)

          message += `
top${index + 1} ${alias} - ${msg.getDataValue('count')}`
        })
      )
      await room.say(message)
    }
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
  }
})
