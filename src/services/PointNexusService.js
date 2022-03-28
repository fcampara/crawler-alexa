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
        el.value = 'PASS'
      })

      await page.waitForSelector('#cboLocal')
      await page.$eval('#cboLocal', function (el) {
        el.value = '6055'
      })

      await page.waitForSelector('#nexuscaptcha')
      await page.waitForSelector('#imgCaptcha')
      const logo = await page.$('#imgCaptcha')
      const box = await logo.boundingBox()
      const { x, y, width, height } = box
      const base64 = await page.screenshot({ clip: { x, y, width, height }, encoding: 'base64' })
      const imageBuffer = Buffer.from(base64, 'base64')

      await tesseract.load()
      await tesseract.loadLanguage('eng')
      await tesseract.initialize('eng')
      const {
        data: { text }
      } = await tesseract.recognize(imageBuffer)

      LoggerBeatTime('captcha', text)

      await page.waitForSelector('#captchacode')
      await page.$eval('#captchacode', (el, value) => (el.value = value), text)

      await page.click('#btOk')

      await page.waitForFunction(
        'document.querySelector("#btOk").innerText.includes("Registrar")'
      )

      await page.waitForSelector('.notification')
      const backgroundColor = await page.evaluate(() => {
        return document.querySelector('.notification').style.backgroundColor
      })

      if (backgroundColor === 'goldenrod') {
        LoggerBeatTime('Wrong captcha retry')
        await browser.close()
        return this.beatTime()
      }

      await page.on('dialog', async (dialog) => dialog.accept())
      LoggerBeatTime('Beat time end')
      await browser.close()
    } catch (error) {
      LoggerBeatTime('Error in beat time fired', error)
    }
  }
}

export default new PointNexusService()
