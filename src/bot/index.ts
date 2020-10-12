import {Wechaty, log,} from 'wechaty'

import {pluginList} from './plugins'

let index: undefined | Wechaty

function getBot(name: string): Wechaty {
    log.verbose('getWechaty', 'getFriday(%s)', name)

    const wechaty = new Wechaty({
        name,
    })

    void pluginList

    /**
     * Initialize Plugins
     */
    wechaty.use(
        ...pluginList,
    )

    index = wechaty

    return wechaty
}

export {getBot}