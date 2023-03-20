const Joi = require("joi");

module.exports.addLeadsReqModel = {
  name: Joi.string().required(),
  email: Joi.string().optional().allow(null, ''),
  subject: Joi.string().optional().allow(null, ''),
  content: Joi.string().optional().allow(null, ''),
  contact_number: Joi.string().optional().allow(null, ''),
  recaptcha_response: Joi.string().optional().allow(null, ''),

};



