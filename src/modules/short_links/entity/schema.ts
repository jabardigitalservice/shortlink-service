import Joi from 'joi'
import { RegexPath } from '../../../helpers/regex'
import { uriWithSpaces } from '../../../helpers/joi'

export const RequestSchema = Joi.object({
    short_code: Joi.string().min(6).regex(RegexPath).optional(),
    url: Joi.string().custom(uriWithSpaces).required(),
    expired: Joi.date().min(new Date()).optional(),
    is_active: Joi.boolean().optional().default(true),
})
