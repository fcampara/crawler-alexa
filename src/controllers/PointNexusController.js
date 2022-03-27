import { StatusCodes } from 'http-status-codes'
import PointNexusService from '../services/PointNexusService'

class PointNexusController {
  async post (_, res) {
    await PointNexusService.beatTime()
    res.status(StatusCodes.OK).json({})
  }
}

export default new PointNexusController()
