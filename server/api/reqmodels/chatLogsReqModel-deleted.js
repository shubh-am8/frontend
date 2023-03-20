const Joi = require("joi");

module.exports.insertChatLogV1ReqModel = {
  chatUserMobile: Joi.string().required(),
  chatUserName: Joi.string().required(),
  clientId: Joi.string().required(),
  chatType: Joi.string().required(),
  chatUserId: Joi.number().allow("").allow(null).optional(),
  nextReplyNodeId: Joi.string().allow("").allow(null).required(),
  chatUserResponse: Joi.string().required(),
  chatUserResponseRaw: Joi.string().required(),
};
