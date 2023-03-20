const Joi = require("joi");

module.exports.updateWaMessageStatusV1ReqModel = {
  msgData: Joi.object().required(),
};