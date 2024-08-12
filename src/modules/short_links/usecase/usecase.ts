import { RequestParams } from '../../../helpers/requestParams'
import { Translate } from '../../../helpers/translate'
import error from '../../../pkg/error'
import Logger from '../../../pkg/logger'
import statusCode from '../../../pkg/statusCode'
import { RequestBody } from '../entity/interface'
import Repository from '../repository/mysql/repository'

class Usecase {
    constructor(private logger: Logger, private repository: Repository) {}

    public async FindByShortCode(short_code: string) {
        const result = await this.repository.FindByShortCode(short_code)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        if (result.expired && new Date(result.expired) <= new Date()) {
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        }

        this.repository.UpdateClick(result.id)

        return result
    }

    public async Show(short_code: string) {
        const result = await this.repository.FindByShortCode(short_code)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        return result
    }

    public async Delete(short_code: string) {
        const result = await this.repository.Delete(short_code)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        return result
    }

    public async Store(body: RequestBody) {
        if (!body.short_code) body.short_code = this.generateRandomString(6)
        const result = await this.repository.FindByShortCode(body.short_code)

        if (result)
            throw new error(
                statusCode.BAD_REQUEST,
                Translate('exists', { attribute: 'short_link' })
            )

        return this.repository.Store(body)
    }

    private generateRandomString(length: number) {
        const characters =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let randomString = ''

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters.charAt(randomIndex)
        }

        return randomString
    }

    public async Fetch(request: RequestParams) {
        const result = await this.repository.Fetch(request)
        return result
    }
}

export default Usecase
