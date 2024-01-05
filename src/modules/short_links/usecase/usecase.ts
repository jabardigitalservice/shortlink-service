import { Translate } from '../../../helpers/translate'
import error from '../../../pkg/error'
import Logger from '../../../pkg/logger'
import statusCode from '../../../pkg/statusCode'
import { RequestBody } from '../entity/interface'
import Repository from '../repository/mysql/repository'
import { v4 as uuidv4 } from 'uuid'

class Usecase {
    constructor(private logger: Logger, private repository: Repository) {}

    public async FindByShortCode(short_link: string) {
        const result = await this.repository.FindByShortCode(short_link)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        if (result.expired && new Date(result.expired) <= new Date()) {
            this.repository.Delete(result.id)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        }

        this.repository.UpdateClick(result.id)

        return result
    }

    public async Store(body: RequestBody) {
        if (!body.short_link) body.short_link = uuidv4()
        const result = await this.repository.FindByShortCode(body.short_link)

        if (result)
            throw new error(
                statusCode.BAD_REQUEST,
                Translate('exists', { attribute: 'short_link' })
            )

        return this.repository.Store(body)
    }
}

export default Usecase
