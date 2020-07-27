const { DelayQueue } = require('rx-queue')

module.exports = new DelayQueue(2000).subscribe(async ({ msg, bot }) => {
  const contact = await msg.from()
  const room = await msg.room()
  const exampleContact = await bot.Contact.load('wxid_vdha0qorca4e22')
  let exampleAlias = await room.alias(exampleContact)
  if (exampleAlias == null) {
    exampleAlias = exampleContact.name()
  }

  room.say(
    `
bot指令：(@${exampleAlias} 不可以复制)
    - 天梯 查询群发言Top10 例：@bot 天梯
    - 我的天梯 查询我的发言 例：@bot 我的天梯`,
    contact
  )
})
