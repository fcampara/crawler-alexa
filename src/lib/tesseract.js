import { createWorker } from 'tesseract.js'
import { LoggerTesseract } from './loggers'

const tesseract = createWorker({
  logger: LoggerTesseract
})

export default tesseract
