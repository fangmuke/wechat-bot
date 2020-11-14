import { get } from 'config';
import { getBot } from './bot';
import PuppetPadlocal from 'wechaty-puppet-padlocal';
import { WechatyOptions } from 'wechaty';

async function main() {

  const name: string = get('bot.name');
  const host: string = get('padLocal.host');
  const port: number = get('padLocal.port');
  const token: string = get('padLocal.token');
  const serverCAFilePath: string = get('padLocal.serverCAFilePath');

  const puppet = new PuppetPadlocal({
    endpoint: `${host}:${port}`,
    token,
    serverCAFilePath,
  });

  const options: WechatyOptions = {name, puppet};

  const bot = getBot(options);

  await bot.start();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
