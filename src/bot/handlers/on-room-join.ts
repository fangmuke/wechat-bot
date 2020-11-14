import { Contact, log, Room, Wechaty } from 'wechaty';

async function onRoomJoin(this: Wechaty, room: Room, inviteeList: Contact[], inviter: Contact): Promise<void> {
  log.info('on-room-join', 'onRoomJoin(%s, %s, %s).', room, inviteeList.join(','), inviter);
}

export default onRoomJoin;
