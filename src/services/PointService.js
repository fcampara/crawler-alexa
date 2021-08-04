import puppeteer from 'puppeteer-core'
import { POINT_PASSWORD, POINT_USER } from '../constant/enviroments'

const URL = 'https://www.ahgora.com.br/batidaonline'

class PointService {
  async beatTime() {
    console.log('Beat time fired')
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
    console.log('Beat time end')
  }
}

export default new PointService()
