import { addDays } from 'date-fns'
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
            await this.deleteLink(result.id, result.is_random_short_code)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        }

        this.repository.UpdateClick(result.id)

        return result
    }

    private async deleteLink(id: string, is_random_short_code: boolean) {
        if (is_random_short_code) this.repository.Delete(id)
    }

    public async Show(id: string) {
        const result = await this.repository.FindByID(id)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        return result
    }

    public async Delete(id: string) {
        const result = await this.repository.Delete(id)

        if (!result)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        return result
    }

    public async Store(body: RequestBody) {
        if (!body.short_code) {
            body.short_code = this.generateRandomString(6)
            body.expired = addDays(new Date(), 7)
        }

        const result = await this.repository.FindByUniq(body.short_code)

        if (result)
            throw new error(
                statusCode.BAD_REQUEST,
                Translate('exists', { attribute: 'short_code' })
            )

        return this.repository.Store(body)
    }

    public async Update(body: RequestBody, id: string) {
        let item = await this.repository.FindByID(id)

        if (!item)
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )

        const short_link = await this.repository.FindByUniq(body.short_code, id)

        if (short_link)
            throw new error(
                statusCode.BAD_REQUEST,
                Translate('exists', { attribute: 'short_code' })
            )

        if (!body.short_code) body.short_code = item.short_code

        const result = await this.repository.Update(body, id)

        return result
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
