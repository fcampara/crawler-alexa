const dotenv = require('dotenv')

const env = {
  development: '.env',
  production: '.env'
}

dotenv.config({
  path: env[process.env.ENV]
})
