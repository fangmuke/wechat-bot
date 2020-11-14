import { EventHotHandler, EventHotHandlerConfig } from 'wechaty-plugin-contrib';

const config: EventHotHandlerConfig = {
  scan: '../handlers/on-scan',
  friendship: '../handlers/on-friendship',
  login: '../handlers/on-login',
  logout: '../handlers/on-logout',
  message: '../handlers/on-message',
  error: '../handlers/on-error',
  'room-invite': '../handlers/on-room-invite',
  'room-join': '../handlers/on-room-join',
  'room-leave': '../handlers/on-room-leave',
  'room-topic': '../handlers/on-room-topic',
};

const EventHotHandlerPlugin = EventHotHandler(config);

export { EventHotHandlerPlugin };
