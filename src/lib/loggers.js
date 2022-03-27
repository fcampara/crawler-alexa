import dayjs from './dayjs'
import debug from 'debug'

const origFormatArgs = debug.formatArgs
debug.formatArgs = function (args) {
  args[0] = `[${dayjs().format('HH:mm:ss')}] - ${args[0]}`

  origFormatArgs.call(this, args)
}

const logger = debug('app')
export const LoggerApp = logger
export const LoggerBeatTime = logger.extend('beat-time')
export const LoggerTesseract = logger.extend('tesseract')
