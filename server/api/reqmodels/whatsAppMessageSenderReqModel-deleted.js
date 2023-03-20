const Joi = require("joi");

module.exports.sendWaMessageV1ReqModel = {
  msgData: Joi.object().allow(null).allow({}).allow("").optional(),
  chatUserResponse: Joi.string().required(),
  botTemplateId: Joi.string().allow(null).allow("").optional(),
  isBotReply: Joi.boolean().allow(null).allow("").optional(),
  isAgentReply: Joi.boolean().allow(null).allow("").optional(),
  agentId: Joi.string().allow(null).allow("").optional(),
  chatUserResponseWaMsgId: Joi.string().allow(null).allow("").optional(),
  chatUserResponseRaw: Joi.string().allow(null).allow("").optional(),
  chatUserName: Joi.string().allow(null).allow("").optional(),
  nextReplyNodeId: Joi.string().allow(null).allow("").optional(),
};

