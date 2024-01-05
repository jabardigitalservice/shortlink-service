import Joi from 'joi'
import { RegexSubdomain } from '../../../helpers/regex'

export const RequestSchema = Joi.object({
    short_link: Joi.string().regex(RegexSubdomain).optional(),
    url: Joi.string().uri().required(),
    expired: Joi.date().min(new Date()).optional(),
})
