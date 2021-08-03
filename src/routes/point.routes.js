import { Router } from 'express'
import PointController from '../controllers/PointController'

const pointController = Router()

pointController.post('/',  PointController.post)
export default pointController
