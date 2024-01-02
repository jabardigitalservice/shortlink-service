import Http from '../../transport/http/http'
import Logger from '../../pkg/logger'
import Usecase from './usecase/usecase'
import Handler from './delivery/http/handler'
import { Config } from '../../config/config.interface'
import { Connection } from '../../database/sequelize/interface'
import Repository from './repository/mysql/repository'
import Sequelize from '../../database/sequelize/sequelize'

class ShortLinks {
    constructor(
        private logger: Logger,
        private http: Http,
        private config: Config,
        connection: Connection
    ) {
        const schema = Sequelize.Schema(connection)
        const repository = new Repository(logger, schema)
        const usecase = new Usecase(logger, repository)
        this.loadHttp(usecase)
    }

    private loadHttp(usecase: Usecase) {
        const handler = new Handler(this.logger, this.http, usecase)
        this.httpPublic(handler)
        this.httpPrivate(handler)
    }

    private httpPublic(handler: Handler) {}

    public httpPrivate(handler: Handler) {
        const Router = this.http.Router()

        Router.post('/shorten', handler.Store())
        Router.get('/:shortCode', handler.RedirectLink())

        this.http.SetRouter('/', Router)
    }
}

export default ShortLinks
