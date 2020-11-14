import { log, Friendship, Wechaty } from 'wechaty';

async function onFriendship(this: Wechaty, friendship: Friendship): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s).', friendship);
}

export default onFriendship;
