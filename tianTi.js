const { DelayQueue } = require('rx-queue')
const { Message } = require('./models/message')
const { Sequelize, Op } = require('sequelize')
const moment = require('moment')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'bot.db',
})

const queue = new DelayQueue(2000) // set delay period time to 500 milliseconds
queue.subscribe(async ({ room, bot }) => {
  const start = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  const end = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  const roomId = room.id
  const count = await Message.count({
    where: {
      roomId,
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
      roomId,
      createdAt: {
        [Op.between]: [start, end],
      },
    },
    group: 'contactId',
    order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
    limit: 10,
  })

  let message = `本群天梯排行榜
(${start} - ${end}) - ${count}
`

  let i = 1
  await room.sync()
  for (const msg of messages) {
    let contact = bot.Contact.load(msg.getDataValue('contactId'))
    let alias = await room.alias(contact)

    message += `
top${i++} ${alias} - ${msg.getDataValue('count')}`
  }
  await room.say(message)
})

module.exports = queue
