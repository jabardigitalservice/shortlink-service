import Http from '../../../../transport/http/http'
import Logger from '../../../../pkg/logger'
import Usecase from '../../usecase/usecase'
import { NextFunction, Response } from 'express'
import statusCode from '../../../../pkg/statusCode'
import { ValidateFormRequest } from '../../../../helpers/validate'
import { RequestSchema } from '../../entity/schema'
import { GetObjectUrl } from '../../../../helpers/http'
import { GetMeta, GetRequestParams } from '../../../../helpers/requestParams'

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
                })

                const file = await GetObjectUrl(data.url)
                if (file) {
                    res.setHeader('Content-Type', file.content_type)
                    return res.send(file.data)
                }

                return res.redirect(data.url)
            } catch (error) {
                return res.redirect('page/404')
            }
        }
    }

    public Show() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const data = await this.usecase.Show(req.params.id)

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

    public Delete() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                await this.usecase.Delete(req.params.id)

                this.logger.Info(statusCode[statusCode.OK], {
                    additional_info: this.http.AdditionalInfo(
                        req,
                        statusCode.OK
                    ),
                })

                return res.json({ message: 'DELETED' })
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
                })
                return res.status(statusCode.CREATED).json({
                    data: {
                        short_link:
                            this.http.GetDomain(req) + '/' + result.short_code,
                        id: result.id,
                    },
                })
            } catch (error) {
                return next(error)
            }
        }
    }

    public Fetch = async (req: any, res: Response, next: NextFunction) => {
        try {
            const request = GetRequestParams(req.query)
            const { data, count } = await this.usecase.Fetch(request)
            this.logger.Info(statusCode[statusCode.OK], {
                additional_info: this.http.AdditionalInfo(req, statusCode.OK),
            })

            return res.json({ data, meta: GetMeta(request, count) })
        } catch (error) {
            return next(error)
        }
    }
}

export default Handler
