import {log} from "wechaty";
import {getBot} from "./bot";

async function main() {
    log.verbose('main', 'main()')

    const bot = getBot('fangmuke_bot')

    await bot.start()
}

main()
    .catch((e) => {
        log.error('Main', 'main() rejection: %s', e)
        console.error(e)
        process.exit(1)
    })