import { FileBox, Message, Wechaty, WechatyPlugin } from 'wechaty';
import { includes } from 'lodash';

export function ContactPlugin(): WechatyPlugin {
  return (wechaty: Wechaty) => {
    wechaty.on('message', async (message: Message) => {
      const type = message.type();
      const text = message.text();

      if (type === Message.Type.Text && message.room() == null) {
        if (includes(text, '房木可')) {
          const contactCard = await wechaty.Contact.find({id: 'wxid_vdha0qorca4e22'});
          if (contactCard) {
            await message.say(contactCard);
          }
        }
        if (includes(text, 'Bot')) {
          const fileBox = FileBox.fromQRCode('https://u.wechat.com/EAXXlC8l77ZK-2uCbLdYoKk');
          await message.say(fileBox);
        }
      }
    });
  };
}
