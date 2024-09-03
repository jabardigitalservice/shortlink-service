import Http from '../../transport/http/http'
import Logger from '../../pkg/logger'
import Usecase from './usecase/usecase'
import Handler from './delivery/http/handler'
import { Config } from '../../config/config.interface'
import { Connection } from '../../database/sequelize/interface'
import Repository from './repository/mysql/repository'
import Sequelize from '../../database/sequelize/sequelize'

class ShortLinks {
    private usecase: Usecase
    constructor(
        private logger: Logger,
        private config: Config,
        connection: Connection
    ) {
        const schema = Sequelize.Schema(connection)
        const repository = new Repository(logger, schema)
        this.usecase = new Usecase(logger, repository)
    }

    public RunHttp(http: Http) {
        const handler = new Handler(this.logger, http, this.usecase)
        this.httpPublic(handler, http)
        this.httpPrivate(handler, http)
    }

    private httpPublic(handler: Handler, http: Http) {}

    private httpPrivate(handler: Handler, http: Http) {
        const Router = http.Router()

        Router.post('/shorten', handler.Store())
        Router.put('/:id', handler.Update())
        Router.delete('/:id', handler.Delete())
        Router.get('/:shortCode', handler.RedirectLink())
        Router.get('/:id/detail', handler.Show())
        Router.get('/', handler.Fetch)

        http.SetRouter('/', Router)
    }
}

export default ShortLinks
