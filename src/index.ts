require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const log4js = require('log4js')
const router = require('./router')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT: string = process.env.PORT || '5000'
const app = express()

const logger = log4js.getLogger()
logger.level = process.env.LOG_LEVEL

logger.info('log4js log info')
logger.debug('log4js log debug')
// logger.error('log4js log error')

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use('/api', router)
app.use(errorMiddleware)

const start: Function = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
