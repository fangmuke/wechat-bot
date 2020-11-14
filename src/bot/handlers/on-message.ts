import { log, Message, Wechaty } from 'wechaty';

async function onMessage(this: Wechaty, message: Message): Promise<void> {
  log.info('on-message', 'onMessage(%s).', message);
}

export default onMessage;
