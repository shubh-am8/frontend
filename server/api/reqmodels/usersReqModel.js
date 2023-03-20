const Joi = require("joi");

module.exports.getUsersReqModel = {
  pageNumber: Joi.number().allow("").allow(null).optional(),
  pageSize: Joi.number().allow("").allow(null).optional(),
  search: Joi.string().allow("").allow(null).optional(),
};
module.exports.addUserReqModel = {
  name: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  email: Joi.string().allow("").allow(null).optional(),
  role: Joi.string().required(),
  status: Joi.string().required(),
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