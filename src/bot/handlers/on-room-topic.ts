import { Contact, log, Room, Wechaty } from 'wechaty';

async function onRoomTopic(this: Wechaty, room: Room, newTopic: string, oldTopic: string, changer: Contact): Promise<void> {
  log.info('on-room-topic', 'onRoomTopic(%s, %s, %s, %s).', room, newTopic, oldTopic, changer);
}

export default onRoomTopic;
