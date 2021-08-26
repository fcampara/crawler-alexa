import puppeteer from 'puppeteer-core'
import path from 'path'

class DashgooService {
  async generatePdf() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-infobars'],
      executablePath: '/opt/google/chrome/google-chrome',
      userDataDir: '/home/felipecs/.config/google-chrome/Default'
    })

    const page = await browser.newPage()
    await page.goto('http://localhost:3000/export/1', {
      waitUntil: 'networkidle2'
    })

     const pdfConfig = {
        printBackground: true,
        format: "Letter",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    };

    const pdf = await page.pdf(pdfConfig)

    await browser.close()

    return pdf
  }
}

export default new DashgooService()
