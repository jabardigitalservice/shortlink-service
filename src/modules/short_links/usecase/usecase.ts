import { Translate } from '../../../helpers/translate'
import error from '../../../pkg/error'
import Logger from '../../../pkg/logger'
import statusCode from '../../../pkg/statusCode'
import { RequestBody } from '../entity/interface'
import Repository from '../repository/mysql/repository'

class Usecase {
    constructor(private logger: Logger, private repository: Repository) {}

    public async FindByAlias(alias: string) {
        const result = await this.repository.FindByAlias(alias)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        this.repository.UpdateClick(result.id)

        return result
    }

    public async Store(body: RequestBody) {
        const result = await this.repository.FindByAlias(body.alias)

        if (result)
            throw new error(
                statusCode.BAD_REQUEST,
                Translate('exists', { attribute: 'alias' })
            )

        return this.repository.Store(body)
    }
}

export default Usecase
