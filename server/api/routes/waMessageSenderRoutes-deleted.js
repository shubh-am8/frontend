const express = require("express");
const { sendWaMessage } = require(_pathConst.controllersPath.waMessageSenderController);
const { sendWaMessageV1ReqModel } = require(_pathConst.reqModelsPath.whatsAppMessageSenderReqModel);
const { updateWaMsgStatus } = require(_pathConst.controllersPath.updateWaMsgStatusController);
const { updateWaMessageStatusV1ReqModel } = require(_pathConst.reqModelsPath.whatsAppMessageStatusUpdateReqModel);
const { authorizeClientToken } = require(_pathConst.filesPath.authHelper);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const router = express.Router();
router.post('/sendMessages', validator.body(sendWaMessageV1ReqModel), authorizeClientToken, sendWaMessage);
router.post('/updateMessageStatus', validator.body(updateWaMessageStatusV1ReqModel), authorizeClientToken, updateWaMsgStatus);

module.exports = router;