const { Sequelize, DataTypes } = require('sequelize')

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

module.exports = Message
