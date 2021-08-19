import app from './app'
import { LoggerApp } from './lib/loggers'
const port = process.env.PORT || '2604'

app.listen(port, () => {
  LoggerApp(`Server running in ${port}`)
})
