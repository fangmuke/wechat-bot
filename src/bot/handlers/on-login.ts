import { Contact, log, VERSION, Wechaty } from 'wechaty';

async function onLogin(this: Wechaty, user: Contact): Promise<void> {
  const msg = `${user.name()} Wechaty@${VERSION} logged in`;
  log.info('on-login', 'onLogin(%s) %s.', user, msg);
  await user.say(msg);
}

export default onLogin;
