import Joi from "joi";
export const lineValidation={
    body:Joi.object().keys({
        name:Joi.string().required(),
        code:Joi.string().required()
    })
}