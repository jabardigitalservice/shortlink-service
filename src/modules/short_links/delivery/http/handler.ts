import Http from '../../../../transport/http/http'
import Logger from '../../../../pkg/logger'
import Usecase from '../../usecase/usecase'
import { NextFunction, Response } from 'express'
import statusCode from '../../../../pkg/statusCode'
import { ValidateFormRequest } from '../../../../helpers/validate'
import { RequestSchema } from '../../entity/schema'
import { GetImageUrl } from '../../../../helpers/http'

class Handler {
    constructor(
        private logger: Logger,
        private http: Http,
        private usecase: Usecase
    ) {}

    public RedirectLink() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const data = await this.usecase.FindByShortCode(
                    req.params.shortCode
                )
                this.logger.Info(statusCode[statusCode.OK], {
                    additional_info: this.http.AdditionalInfo(
                        req,
                        statusCode.OK
                    ),
                    short_links: { FindByShortCode: data },
                })

                const image = await GetImageUrl(data.url)
                if (image) {
                    res.setHeader('Content-Type', image.content_type)
                    return res.send(image.data)
                }

                return res.redirect(data.url)
            } catch (error) {
                return next(error)
            }
        }
    }

    public Show() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const data = await this.usecase.Show(req.params.shortCode)

                this.logger.Info(statusCode[statusCode.OK], {
                    additional_info: this.http.AdditionalInfo(
                        req,
                        statusCode.OK
                    ),
                })

                return res.json({ data })
            } catch (error) {
                return next(error)
            }
        }
    }

    public Store() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const body = ValidateFormRequest(RequestSchema, req.body)
                const result = await this.usecase.Store(body)
                this.logger.Info(statusCode[statusCode.CREATED], {
                    additional_info: this.http.AdditionalInfo(
                        req,
                        statusCode.CREATED
                    ),
                    short_links: { store: body },
                })
                return res.status(statusCode.CREATED).json({
                    data: {
                        short_link:
                            this.http.GetDomain(req) + '/' + result.short_code,
                    },
                })
            } catch (error) {
                return next(error)
            }
        }
    }
}

export default Handler
