/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import {logger,errorLogger} from './shared/logger'
import {Server} from 'http'

//uncaught handler
process.on('uncaughtException', (error) => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info("❤ Database is connected successfully")
    server=app.listen(config.port, () => {
      logger.info(`🌭 database is connected on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection faild', error)
  }

  //unhandle rejection handler
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()


//signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received');
  if (server) {
    server.close()
  }
})