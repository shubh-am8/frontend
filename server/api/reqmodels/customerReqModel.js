const Joi = require("joi");

module.exports.getCustomerReqModel = {
  pageNumber: Joi.number().allow("").allow(null).optional(),
  pageSize: Joi.number().allow("").allow(null).optional(),
  search: Joi.string().allow("").allow(null).optional(),
  customerId: Joi.number().allow("").allow(null).optional(),
};
module.exports.getCustomerByIdReqModel = {
  pageNumber: Joi.number().allow("").allow(null).optional(),
  pageSize: Joi.number().allow("").allow(null).optional(),
  search: Joi.string().allow("").allow(null).optional(),
  customerId: Joi.number().allow("").allow(null).optional(),
};
module.exports.addCustomerReqModel = {
  name: Joi.string().required(),
  userId: Joi.string().allow("").allow(null).optional(),
  // userId: Joi.string().required(),
  email: Joi.string().allow("").allow(null).optional(),
  mobile: Joi.string().required(),
  aadharNumber: Joi.string().allow("").allow(null).optional(),
  aadharFront: Joi.object().allow("").allow(null).optional(),
  aadharBack: Joi.object().allow("").allow(null).optional(),
  otherDocType: Joi.string().allow("").allow(null).optional(),
  otherDocFront: Joi.object().allow("").allow(null).optional(),
  otherDocBack: Joi.object().allow("").allow(null).optional(),
  installationAmt:Joi.number().allow("").allow(null).optional(),
  securityAmount:Joi.number().allow("").allow(null).optional(),
  address:Joi.string().allow("").allow(null).optional(),
  partner:Joi.string().allow("").allow(null).optional(),
  reseller:Joi.string().allow("").allow(null).optional(),
  plan:Joi.string().allow("").allow(null).optional(),

};
module.exports.updateCustomerReqModel = {
  customerId: Joi.number().allow("").allow(null).required(),
  name: Joi.string().required(),
  userId: Joi.string().allow("").allow(null).optional(),
  // userId: Joi.string().required(),
  email: Joi.string().allow("").allow(null).optional(),
  mobile: Joi.string().required(),
  aadharNumber: Joi.string().allow("").allow(null).optional(),
  aadharFront: Joi.object().allow("").allow(null).optional(),
  aadharBack: Joi.object().allow("").allow(null).optional(),
  otherDocType: Joi.string().allow("").allow(null).optional(),
  otherDocFront: Joi.object().allow("").allow(null).optional(),
  otherDocBack: Joi.object().allow("").allow(null).optional(),
  installationAmt:Joi.number().allow("").allow(null).optional(),
  securityAmount:Joi.number().allow("").allow(null).optional(),
  address:Joi.string().allow("").allow(null).optional(),
  partner:Joi.string().allow("").allow(null).optional(),
  reseller:Joi.string().allow("").allow(null).optional(),
  plan:Joi.string().allow("").allow(null).optional(),

};
// module.exports.updateProfileModel = {
//   user_type: Joi.string().allow("").optional(),
//   user_fname: Joi.string().allow("").optional(),
//   user_lname: Joi.string().allow("").optional(),
//   topics: Joi.array().allow("").optional(),
//   goals: Joi.array().allow("").optional(),
//   heighest_study_level: Joi.number().allow("").optional(),
//   fos_id: Joi.number().allow("").optional(),
//   profession_id: Joi.number().allow("").optional(),
//   user_pref1: Joi.number().allow("").optional(),
//   user_pref2: Joi.number().allow("").optional(),
//   user_pref3: Joi.number().allow("").optional(),
//   job_tittle: Joi.number().allow("").optional(), // profession_id in user table
// };

// module.exports.checkEmailExistsModel = {
//   email: Joi.string().email({ tlds: { allow: false } }),
// };
// module.exports.resetPasswordModel = {
//   password: Joi.string().required(),
//   confirm_password:Joi.string().required().valid(Joi.ref('password')),
// };
// module.exports.changePasswordReqModel = {
//   old_password: Joi.string().required(),
//   new_password: Joi.string().required(),
//   confirm_password:Joi.string().required().valid(Joi.ref('new_password')),
// };
// module.exports.getUpcomingSessionsReqModel = {
//   page_number: Joi.number().allow("").allow(null).optional(),
//   page_size: Joi.number().allow("").allow(null).optional(),
// };
// module.exports.getPastSessionsReqModel = {
//   page_number: Joi.number().allow("").allow(null).optional(),
//   page_size: Joi.number().allow("").allow(null).optional(),
// };
// module.exports.getUserTopicsReqModel = {
//   page_number: Joi.number().allow("").allow(null).optional(),
//   page_size: Joi.number().allow("").allow(null).optional(),
//   sorting_type: Joi.string().allow("").allow(null).optional(),
// };


module.exports.updateKycStatusReqModel = {
  customer_id: Joi.number().allow("").allow(null).optional(),
  customer_ekyc_status:Joi.string().valid("Rejected", "Approved").required()
};