import Logger from '../../../../pkg/logger'
import { RequestBody } from '../../entity/interface'
import { Schema } from '../../../../database/sequelize/interface'

class Repository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async FindByAlias(alias: string) {
        const item = await this.schema.short_link.findOne({
            where: { alias },
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
            ...body,
        })
    }
}

export default Repository
