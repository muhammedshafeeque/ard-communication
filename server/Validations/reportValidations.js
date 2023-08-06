import Joi from "joi";
export const reportValidate = {
  body: Joi.object().keys({
    closingBalance: Joi.number().required(),
    outstandings: Joi.array().required().items(
      Joi.object().keys({
        shopId: Joi.string(),
        amount: Joi.number(),
      })
    ),
    cashOnBank: Joi.number().required(),
    outstandIn: Joi.array().required().items(
      Joi.object().keys({
        shopId: Joi.string(),
        amount: Joi.number(),
      })
    ),
  }),
};
