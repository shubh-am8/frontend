exports.PagesPath = {
  DocPage: appRoot + "/api/doc/index.html",
};
exports.controllersPath = {
  customerController: appRoot + "/api/controllers/customerController.js",
  fileUploadController: appRoot + "/api/controllers/fileUploadController.js",
  signInController: appRoot + "/api/controllers/signInController.js",
  userController: appRoot + "/api/controllers/userController.js",
  triplePlayApisController: appRoot + "/api/controllers/triplePlayApisController.js",
};
exports.routesPath = {
  fileUploadRoutes: appRoot + "/api/routes/fileUploadRoutes.js",
  userRoutes: appRoot + "/api/routes/userRoutes.js",
  customerRoutes: appRoot + "/api/routes/customerRoutes.js",
  triplePlayApisRoutes: appRoot + "/api/routes/triplePlayApisRoutes.js",
};

exports.filesPath = {
  routes: appRoot + "/api/routes/index.js",
  resHelper: appRoot + "/api/helpers/response/apiResponse.js",
  dBContaxt: appRoot + "/api/db/connectDb.js",
  redisClientContaxt: appRoot + "/api/db/connectRedisClient.js",
  encryption: appRoot + "/api/helpers/crypto/encryption.js",
  config: appRoot + "/api/helpers/constantData/config.js",
  authHelper: appRoot + "/api/helpers/auth/authHelper.js",
  msgConst: appRoot + "/api/helpers/constantData/msgConst.js",
  whatsAppMsgQueue: appRoot + "/api/helpers/queue/whatsAppMsgQueue.js",
  emailTemplate: appRoot + "/api/helpers/email/emailTemplate.js",
  nodeEmailer: appRoot + "/api/helpers/email/nodeEmailer.js",
  commonHelper: appRoot + "/api/helpers/common/commonHelper.js",
  knexFile: appRoot + "/knexfile.js",
  smsSender: appRoot + "/api/helpers/sms/smsSender.js",
};
exports.reqModelsPath = {
  usersReqModel: appRoot + "/api/reqmodels/usersReqModel.js",
  signInReqModel: appRoot + "/api/reqmodels/signInReqModel.js",
  customerReqModel: appRoot + "/api/reqmodels/customerReqModel.js",
  triplePlayApisReqModel: appRoot + "/api/reqmodels/triplePlayApisReqModel.js",
};
exports.modelsPath = {
  usersModel: appRoot + "/api/models/usersModel.js",
  customerModel: appRoot + "/api/models/customerModel.js",
  customerDocModel: appRoot + "/api/models/customerDocModel.js",
};