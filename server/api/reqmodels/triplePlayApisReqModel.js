const Joi = require("joi");

module.exports.getPartnerListReqModel = {

};
module.exports.getResellerListReqModel = {
  partnerName: Joi.string().allow("").allow(null).optional()
};
module.exports.getPlanListReqModel = {
  partnerName: Joi.string().allow("").allow(null).optional(),
  resellerName: Joi.string().allow("").allow(null).optional()
};
