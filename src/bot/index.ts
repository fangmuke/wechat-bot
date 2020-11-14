import { Wechaty, WechatyOptions } from 'wechaty';
import { pluginList } from './plugins';

let wechaty: undefined | Wechaty;

function getBot(options?: WechatyOptions): Wechaty {
  if (wechaty == undefined) {
    wechaty = new Wechaty(options);

    wechaty.use(
      ...pluginList,
    );
  }

  return wechaty;
}

export { getBot };
