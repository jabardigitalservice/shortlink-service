import Joi from 'joi'

export const RequestSchema = Joi.object({
    short_link: Joi.string().alphanum().optional(),
    url: Joi.string().uri().required(),
    expired: Joi.date().min(new Date()).optional(),
})
