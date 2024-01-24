import { Op } from 'sequelize'
import config from '../config/config'
import ShortLink from '../database/sequelize/schemas/short_link.schema'
import Sequalize from '../database/sequelize/sequelize'
import Logger from '../pkg/logger'

const run = async () => {
    const logger = new Logger(config)
    const connection = await Sequalize.Connect(config, logger)

    try {
        const counter = await ShortLink(connection).destroy({
            where: {
                expired: { [Op.not]: null, [Op.lt]: new Date() },
            },
        })

        logger.Info(
            'successfully deleted expired data, count data: ' + counter
        )
    } catch (error: any) {
        logger.Error(error.message)
    }

    await connection.close()
}

export default run()
