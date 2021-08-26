import { StatusCodes } from 'http-status-codes'
import DashgooService from '../services/DashgooService'

class DashgooController {
  async post(_, res) {
      const pdf = await DashgooService.generatePdf()
      res.contentType("application/pdf");
      res.send(pdf);
  }
}

export default new DashgooController()
