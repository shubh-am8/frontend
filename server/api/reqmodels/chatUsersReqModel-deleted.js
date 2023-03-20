const Joi = require("joi");

module.exports.getChatUsersV1ReqModel = {
  chatUserMobile: Joi.string().required(),
  clientId: Joi.string().required(),
};

