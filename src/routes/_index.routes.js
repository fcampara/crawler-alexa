import { Router } from 'express'
import { HEALTH_CHECK, POINT } from '../constant/routes'
import PointRoutes from './point.routes'

const routes = new Router()

routes.get(HEALTH_CHECK, async (_, res) => {
  res.json(`Is alive`)
})

routes.use(POINT, PointRoutes)

export default routes
