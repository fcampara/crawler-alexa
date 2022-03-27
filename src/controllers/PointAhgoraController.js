import { StatusCodes } from 'http-status-codes'
import PointAhgoraService from '../services/PointAhgoraService'

class PointAhgoraController {
  async post (_, res) {
    await PointAhgoraService.beatTime()
    res.status(StatusCodes.OK).json({})
  }
}

export default new PointAhgoraController()
