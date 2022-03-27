import puppeteer from 'puppeteer-core'
import { LoggerBeatTime } from '../lib/loggers'
import tesseract from '../lib/tesseract'

const URL = 'https://cvccorp.nexusweb.com.br/'

class PointNexusService {
  async beatTime () {
    LoggerBeatTime('Beat time fired')
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--disable-infobars'],
        executablePath: '/opt/google/chrome/google-chrome',
        userDataDir: '/home/felipecs/.config/google-chrome/Default'
      })

      const page = await browser.newPage()
      await page.goto(URL, {
        waitUntil: 'networkidle2'
      })

      await page.waitForSelector('#cboCampo')
      await page.$eval('#cboCampo', function (el) {
        el.value = '2'
      })

      await page.waitForSelector('#txtValor')
      await page.$eval('#txtValor', function (el) {
        el.value = 'CPF'
      })

      await page.waitForSelector('#txtSENHA')
      await page.$eval('#txtSENHA', function (el) {
        el.value = 'PASSWORD'
      })

      await page.waitForSelector('#cboLocal')
      await page.$eval('#cboLocal', function (el) {
        el.value = '6055'
      })

      await page.waitForSelector('#imgCaptcha') // wait for the selector to load
      const logo = await page.$('#imgCaptcha')
      const box = await logo.boundingBox() // this method returns an array of geometric parameters of the element in pixels.
      const x = box.x // coordinate x
      const y = box.y // coordinate y
      const w = box.width // area width
      const h = box.height // area height
      const base64 = await page.screenshot({ clip: { x: x, y: y, width: w, height: h }, encoding: 'base64' }) // take screenshot of the required area in puppeteer
      const imageBuffer = Buffer.from(base64, 'base64')

      await tesseract.load()
      await tesseract.loadLanguage('eng')
      await tesseract.initialize('eng')
      const {
        data: { text }
      } = await tesseract.recognize(imageBuffer)
      await tesseract.terminate()

      LoggerBeatTime('captcha', text)

      await page.waitForSelector('#captchacode')
      await page.$eval('#captchacode', (el, value) => (el.value = value), text)

      LoggerBeatTime('Beat time end')
      await browser.close()
    } catch (error) {
      LoggerBeatTime('Error in beat time fired', error)
    }
  }
}

export default new PointNexusService()
