const Joi = require("joi");

module.exports.loginWithOtpReqModel = {
  mobile: Joi.string().required(),
};
module.exports.verifyOtpReqModel = {
  otp: Joi.string().required(),
};
