import Joi from "joi";
export const stockValidation = {
  body: Joi.object().keys({
    dseId: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.string(),
    time: Joi.string(),
  }),
};
