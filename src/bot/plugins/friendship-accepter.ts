import { FriendshipAccepter, FriendshipAccepterConfig } from 'wechaty-plugin-contrib';
import { get } from 'config';

const NEW_FRIEND_GREETING = [
  `Hi, 我的名字是${get('bot.name')}, 我是房木可基于Wechaty开发的WeChat-Bot。
GitHub：https://github.com/fangmuke/wechat-bot`,
  '如果你对WeChat-Bot感兴趣，只需要向我发送"房木可"，我会将他的名片发送给你。',
  '如果需要我的二维码名片，只需要向我发送"Bot"，我会将我的二维码名片发送给你。',
  '祝你玩的开心！',
];

const config: FriendshipAccepterConfig = {
  greeting: NEW_FRIEND_GREETING,
};

const FriendshipAccepterPlugin = FriendshipAccepter(config);

export { FriendshipAccepterPlugin };
