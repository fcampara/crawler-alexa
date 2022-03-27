import './bootstrap'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes/_index.routes'

class App {
  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
    this.exceptionsHandler()
  }

  middlewares () {
    this.server.use(cors())
    this.server.use(helmet())
    this.server.use(express.json())
  }

  routes () {
    this.server.use('/api/v1', routes)
  }

  exceptionsHandler () {
    this.server.use(async (err, _, res, __) => {
      const message =
        (err.message?.message && 'Erro interno') ||
        err.message ||
        'Error interno'

      const errors =
        err.errors?.map(({ name, error, message, validatorKey }) => ({
          name: name || validatorKey,
          error: error || message
        })) || []

      const status = err.status || 500
      const error = {
        info: {
          message,
          errors,
          status
        },
        status
      }
      return res.status(error.status).json(error.info)
    })
  }
}

export default new App().server
