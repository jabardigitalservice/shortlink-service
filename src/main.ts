import config from './config/config'
import Sequelize from './database/sequelize/sequelize'
import ShortLinks from './modules/short_links/short_links'
import Logger from './pkg/logger'
import Http from './transport/http/http'

const main = async () => {
    const logger = new Logger(config)
    // const connection = await Mongo.Connect(logger, config)
    const connection = await Sequelize.Connect(config, logger)

    const http = new Http(logger, config)

    // Start Load Modules
    new ShortLinks(logger, http, config, connection)
    // End Load Modules

    http.Run(config.app.port.http)

    return {
        http,
    }
}

export default main()
