import Logger from '../../../../pkg/logger'
import { RequestBody } from '../../entity/interface'
import { Schema } from '../../../../database/sequelize/interface'
import { RequestParams } from '../../../../helpers/requestParams'

class Repository {
    constructor(private logger: Logger, private schema: Schema) {}

    public async FindByShortCode(short_code: string) {
        const item = await this.schema.short_link.findOne({
            where: { short_code, is_active: true },
        })

        return item
    }

    public async FindByUniq(short_code: string, id?: string) {
        const filter = { short_code }

        if (id) Object.assign(filter, { id: { [this.schema.Op.ne]: id } })

        const item = await this.schema.short_link.findOne({
            where: filter,
        })

        return item
    }

    public async FindByID(id: string) {
        const item = await this.schema.short_link.findByPk(id)

        return item
    }

    public async UpdateClick(id: string) {
        await this.schema.short_link.increment('clicks', {
            by: 1,
            where: { id },
        })
    }

    public async Store(body: RequestBody) {
        return this.schema.short_link.create(body)
    }

    public async Delete(id: string) {
        return this.schema.short_link.destroy({
            where: { id },
        })
    }

    public async Update(body: RequestBody, id: string) {
        return this.schema.short_link.update(
            {
                ...body,
                updated_at: new Date(),
            },
            {
                where: {
                    id,
                },
            }
        )
    }

    public async Fetch({
        limit,
        offset,
        is_active,
        keyword,
        sort_order,
        sort_by,
    }: RequestParams) {
        const filter = {}

        if (is_active) Object.assign(filter, { is_active })

        if (keyword) {
            Object.assign(filter, {
                [this.schema.Op.or]: [
                    {
                        title: {
                            [this.schema.Op.like]: `%${keyword}%`,
                        },
                    },
                    {
                        short_code: {
                            [this.schema.Op.like]: `%${keyword}%`,
                        },
                    },
                    {
                        url: {
                            [this.schema.Op.like]: `%${keyword}%`,
                        },
                    },
                ],
            })
        }

        if (!['created_at', 'title', 'short_code'].includes(sort_by)) {
            sort_by = 'created_at'
        }

        const { count, rows } = await this.schema.short_link.findAndCountAll({
            limit,
            offset: offset,
            where: filter,
            order: [[sort_by, sort_order]],
        })

        return {
            data: rows,
            count,
        }
    }
}

export default Repository
