import { StatusCodes } from "http-status-codes"
import PointService from "../services/PointService"

class PointController {
  async post(req, res) {
    const point = await PointService.beatTime()
    res.status(StatusCodes.OK).json({})
  }
}

export default new PointController()
