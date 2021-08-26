import { Router } from 'express'
import DashgooController from '../controllers/DashgooController'

const dashgooController = Router()

dashgooController.post('/',  DashgooController.post)
export default dashgooController
