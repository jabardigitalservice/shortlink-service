import Joi from 'joi'
import { RegexPath } from '../../../helpers/regex'

export const RequestSchema = Joi.object({
    short_link: Joi.string().regex(RegexPath).optional(),
    url: Joi.string().uri().required(),
    expired: Joi.date().min(new Date()).optional(),
})
