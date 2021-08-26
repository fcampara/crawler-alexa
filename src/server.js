import app from './app'
import { LoggerApp } from './lib/loggers'
const port = process.env.PORT || '2605'

app.listen(port, () => {
  LoggerApp(`Server running in ${port}`)
})
