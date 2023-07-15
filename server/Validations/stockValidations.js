import Joi from "joi";
export const stockValidation = {
  body: Joi.object().keys({
    dseId: Joi.string().required(),
    code: Joi.string().required(),
  }),
};