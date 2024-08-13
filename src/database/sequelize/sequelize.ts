import { Config } from '../../config/config.interface'
import Logger from '../../pkg/logger'
import { Sequelize as createConnection, Dialect, Op } from 'sequelize'
import { Connection } from './interface'
import ShortLink from './schemas/short_link.schema'

class Sequalize {
    public static async Connect(config: Config, logger: Logger) {
        const {
            name,
            username,
            password,
            host,
            connection: dialect,
            pool,
        } = config.db

        const connection = new createConnection(name, username, password, {
            host: host,
            dialect: dialect as Dialect,
            logging: false,
            pool: {
                min: pool.min,
                max: pool.max,
                acquire: pool.acquire,
                idle: pool.idle,
            },
        })

        try {
            await connection.authenticate()
            logger.Info('Sequelize connection to database established')
        } catch (error) {
            logger.Error('Sequelize connection error:', error)
            process.exit(-1)
        }

        return connection
    }

    public static Schema = (connection: Connection) => {
        // load all schema on folder schemas
        const short_link = ShortLink(connection)

        // setup relation for eager loader in here
        // example: User.hasOne(Profile)
        return {
            short_link,
            // Add other models if needed

            // Add other require of the driver database
            connection,
            Op,
        }
    }
}

export default Sequalize
