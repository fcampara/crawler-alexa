import { StatusCodes } from "http-status-codes"
import PointService from "../services/PointService"

class PointController {
  async post(_, res) {
    const point = await PointService.beatTime()
    res.status(StatusCodes.OK).json(point)
  }
}

export default new PointController()
