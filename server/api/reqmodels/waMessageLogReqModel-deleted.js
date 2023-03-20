const Joi = require("joi");

module.exports.addWaMessageReqModel = {
  wa_user_mobile: Joi.number().required(),
  wa_message_id: Joi.number().required(),
  res_json: Joi.string().required(),
  status: Joi.string().required(),
  client_id: Joi.number().required()
};

module.exports.getWaMessageReqModel = {
  wa_user_mobile: Joi.number().allow("").optional(),
  wa_message_id: Joi.number().allow("").optional(),
  client_id: Joi.number().allow("").optional(),
  date: Joi.number().allow("").optional(),
};



