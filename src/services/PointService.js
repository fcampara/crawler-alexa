import puppeteer from 'puppeteer'
import path from 'path'

const URL = 'https://www.ahgora.com.br/batidaonline'

class PointService {
  async beatTime(payload = {}) {
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

  }
}

export default new PointService()
