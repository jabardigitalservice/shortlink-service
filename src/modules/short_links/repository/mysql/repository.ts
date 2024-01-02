import Logger from '../../../../pkg/logger'
import { RequestBody } from '../../entity/interface'
import { Schema } from '../../../../database/sequelize/interface'

class Repository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async FindByShortCode(short_code: string) {
        const item = await this.schema.short_link.findOne({
            where: { short_code },
        })

        return item
    }

    public async UpdateClick(id: string) {
        await this.schema.short_link.increment('clicks', {
            by: 1,
            where: { id },
        })
    }

    public async Store(body: RequestBody) {
        return this.schema.short_link.create({
            url: body.url,
            short_code: body.short_link,
            expired: body.expired,
        })
    }

    public async Delete(id: string) {
        await this.schema.short_link.destroy({
            where: { id },
        })
    }
}

export default Repository
