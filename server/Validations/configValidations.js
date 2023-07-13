import Joi from "joi";
export const lineValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
  }),
};
export const dseValidation = {
  body: Joi.object().keys({
    mobile: Joi.number().required(),
    stock: Joi.number(),
    activeUser: Joi.string(),
  }),
};
