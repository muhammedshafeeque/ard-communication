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
export const shopValidation={
  body:Joi.object().keys({
    mobile:Joi.number().required(),
    name:Joi.string().required(),
    flexiNumber:Joi.number().required(),
    outStandigs:Joi.number(),
    contactPerson:Joi.string()

  })
}
export const mapLineToDseValidation={
  body:Joi.object().keys({
    lineId:Joi.string().required()
  })
}
export const mapUserToDseValidation={
  body:Joi.object().keys({
    userId:Joi.string().required()
  })
}