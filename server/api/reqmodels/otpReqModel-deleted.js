const Joi = require("joi");

module.exports.verifyResetOtpModel = {
  email: Joi.string().email({ tlds: { allow: false } }),
  resetOtp: Joi.string().required(),
};
