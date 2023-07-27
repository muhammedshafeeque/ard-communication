import Joi from "joi";
export const resetPasswordValidate = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};
