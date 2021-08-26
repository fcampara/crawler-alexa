import { Router } from 'express'
import { HEALTH_CHECK, POINT } from '../constant/routes'
import PointRoutes from './point.routes'
import DashgooRoutes from './dashgoo.routes'

const routes = new Router()

routes.get(HEALTH_CHECK, async (_, res) => {
  res.json(`Is alive`)
})

routes.use(POINT, PointRoutes)
routes.use('/dashgoo', DashgooRoutes)

export default routes
