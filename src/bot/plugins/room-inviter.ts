import { Contact, Room } from 'wechaty';
import { RoomInviter, RoomInviterConfig, talkers } from 'wechaty-plugin-contrib';


const repeat: talkers.ContactTalkerOptions = async (contact: Contact, room?: Room) => {
  await contact.say(`你已经加入[${await room?.topic()}]。`);
};

const listRoomInviterConfig: RoomInviterConfig[] = [
  {
    password: [
      /^bot-test$/i,
    ],
    room: /^Bot Test$/i,
    rule: [
      'Hi，我想邀请你加入Bot Test群组！',
    ],
    repeat,
    welcome: [
      '欢迎加入Bot Test群组!',
    ],
  },
];

let roomInviter = [];

for (const roomInviterConfig of listRoomInviterConfig) {
  roomInviter.push(RoomInviter(roomInviterConfig));
}

export { roomInviter };
