import { log, Wechaty } from 'wechaty';

async function onScan(this: Wechaty, qrcode: string, status: number): Promise<void> {
  log.info('on-scan', 'onScan() [%s] %s\nScan QR Code above to log in.', status, qrcode);
}

export default onScan;
