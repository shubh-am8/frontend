const express = require("express");
const { insertChatLog } = require(_pathConst.controllersPath.chatLogController);
const { insertChatLogV1ReqModel } = require(_pathConst.reqModelsPath.chatLogsReqModel);
const { authorizeClientToken } = require(_pathConst.filesPath.authHelper);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const router = express.Router();
router.post('/insertChatLog', validator.body(insertChatLogV1ReqModel), authorizeClientToken, insertChatLog);

module.exports = router;