import app from './app'
import { LoggerApp } from './lib/loggers'
const port = process.env.PORT || '3333'

app.listen(port, () => {
  LoggerApp(`Server running in ${port}`)
})
