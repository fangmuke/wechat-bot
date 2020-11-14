import { log, RoomInvitation, Wechaty } from 'wechaty';

async function onRoomInvite(this: Wechaty, roomInvitation: RoomInvitation): Promise<void> {
  log.info('on-room-invite', 'onRoomInvite(%s).', roomInvitation);
}

export default onRoomInvite;
