import { Router } from 'express'
import PointNexusController from '../controllers/PointNexusController'

const pointController = Router()

pointController.post('/', PointNexusController.post)
export default pointController
