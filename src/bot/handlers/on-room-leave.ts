import { Contact, log, Room, Wechaty } from 'wechaty';

async function onRoomLeave(this: Wechaty, room: Room, leaverList: Contact[], remover?: Contact): Promise<void> {
  log.info('on-room-leave', 'onRoomLeave(%s, %s, %s).', room, leaverList.join(','), remover);
}

export default onRoomLeave;
