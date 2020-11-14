import {
  QRCodeTerminal,
  EventLogger,
} from 'wechaty-plugin-contrib';

import { EventHotHandlerPlugin } from './event-hot-handler';
import { FriendshipAccepterPlugin } from './friendship-accepter';
import * as roomInviterPlugin from './room-inviter';
import { ContactPlugin } from './contact-me';


const pluginList = [
  QRCodeTerminal(),
  EventLogger(),
  ContactPlugin(),
  EventHotHandlerPlugin,
  FriendshipAccepterPlugin,
  ...Object.values(roomInviterPlugin),
];

export { pluginList };
