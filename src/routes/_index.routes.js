import { Router } from 'express'
import { HEALTH_CHECK, POINT_AHGORA, POINT_NEXUS } from '../constant/routes'
import PointAhgoraRoutes from './pointAhgora.routes'
import PointNexusRoutes from './pointNexus.routes'

const routes = new Router()

routes.get(HEALTH_CHECK, async (_, res) => {
  res.json('Is alive')
})

routes.use(POINT_AHGORA, PointAhgoraRoutes)
routes.use(POINT_NEXUS, PointNexusRoutes)

export default routes
