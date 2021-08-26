import puppeteer from 'puppeteer-core'
import { LoggerBeatTime } from '../lib/loggers'


const URL = 'https://www.ahgora.com.br/batidaonline'

class PointService {
  async beatTime() {
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

      await page.waitForSelector('#account_i');
      await page.$eval('#account_i', el => el.value = '00109');

      await page.waitForSelector('#password_i');
      await page.$eval('#password_i', el => el.value = 'Fe260493');

      await page.click('#botao_entrar')

      await browser.close()

      LoggerBeatTime('Beat time end')
      return { success: true }
    } catch (error) {
      LoggerBeatTime('Error in beat time fired', JSON.stringify(error, '', 2))
    }
  }
}

export default new PointService()
