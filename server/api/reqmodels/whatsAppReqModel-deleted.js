const Joi = require("joi");


module.exports.sendWhatsAppMsgReqModel = {
  mobile: Joi.array().items(Joi.string()).required(),
  header: Joi.object().keys(({
    type: Joi.string().required(),
    file_url: Joi.string().required(),
    file_name: Joi.string().required(),
  }))
    .allow(null).allow("").optional(),
  buttons: Joi.array().items(
    Joi.object({
      sub_type: Joi.string().required(),
      index: Joi.string().required(),
      type: Joi.string().required(),
      parameter_type: Joi.string().required(),
      parameter_type: Joi.string().required(),
      parameter_text: Joi.string().required(),
    })
  )
    .allow(null).allow("").optional(),
  message: Joi.array().items(Joi.string()).required(),
  templateName: Joi.string().required(),
};


module.exports.sendTemplateMessageV1ReqModel = {
  messages: Joi.array().items(
    Joi.object({
      mobile: Joi.string().min(10).max(10).required(),
      template_name: Joi.string().required(),
      template_param: Joi.array().items(Joi.string()).required(),
      header: Joi.object().keys(({
        type: Joi.string().required(),
        text: Joi.string().allow(null).allow("").optional(),
        file_url: Joi.string().allow(null).allow("").optional(),
        file_name: Joi.string().allow(null).allow("").optional(),
      }))
        .allow(null).allow("").optional(),
      buttons: Joi.array().items(
        Joi.object({
          sub_type: Joi.string().required(),
          index: Joi.string().required(),
          type: Joi.string().required(),
          parameter_type: Joi.string().required(),
          parameter_text: Joi.string().required(),
        })
      )
        .allow(null).allow("").optional(),
    })
  )
    .min(1)
    // .max(2)   // this is commented for now, to set limit at once how many requests we handel we have to define here 
    .required(),
};