import Joi from 'joi'
import { RegexSubdomain } from '../../../helpers/regex'
import { v4 as uuidv4 } from 'uuid'

export const RequestSchema = Joi.object({
    alias: Joi.string().regex(RegexSubdomain).optional().default(uuidv4()),
    url: Joi.string().uri().required(),
})
