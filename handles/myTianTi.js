const { DelayQueue } = require('rx-queue')
const Message = require('../models/message')
const { Sequelize, Op } = require('sequelize')
const moment = require('moment')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'bot.db',
})

module.exports = new DelayQueue(2000).subscribe(async ({ msg, bot }) => {
  const start = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  const end = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  const room = msg.room()
  const contact = msg.from()
  const roomId = room.id
  const contactId = contact.id

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
  })

  let index = messages
    .map((message) => message.getDataValue('contactId'))
    .indexOf(contactId)

  await room.say`${contact} 你的排名Top${index + 1} 发言数${messages[
    index
  ].getDataValue('count')}`
})
