import { log, Wechaty } from 'wechaty';

async function onError(this: Wechaty, e: Error): Promise<void> {
  log.error('on-error', 'onError(%s).', e);
  console.error(e);
  console.error(e.stack);
}

export default onError;
