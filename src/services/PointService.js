import puppeteer from 'puppeteer-core'
import { POINT_PASSWORD, POINT_USER } from '../constant/enviroments'

const URL = 'https://www.ahgora.com.br/batidaonline'

class PointService {
  async beatTime() {
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
    await page.$eval('#account_i', el => el.value = POINT_USER);

    await page.waitForSelector('#password_i');
    await page.$eval('#password_i', el => el.value = POINT_PASSWORD);

    await page.click('#botao_entrar')
  }
}

export default new PointService()
