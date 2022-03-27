import { Router } from 'express'
import PointAhgoraController from '../controllers/PointAhgoraController'

const pointController = Router()

pointController.post('/', PointAhgoraController.post)
export default pointController
