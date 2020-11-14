import { Contact, log, Wechaty } from 'wechaty';

async function onLogout(this: Wechaty, user: Contact): Promise<void> {
  log.info('on-logout', 'onLogout(%s).', user);
}

export default onLogout;
