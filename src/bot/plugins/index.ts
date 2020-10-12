import {
    QRCodeTerminal,
    EventLogger,
    DingDong,
} from 'wechaty-plugin-contrib'

const pluginList = [
    QRCodeTerminal(),
    EventLogger(),
    DingDong(),
]

export {pluginList}