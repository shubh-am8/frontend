const express = require("express");
const router = express.Router();
const { getWhatsAppMsgs, sendWhatsAppMsgs, scnWhatsAppWebhook, sendTemplateMessageV1, tripleplayBroadbandWebhook } = require(_pathConst.controllersPath.whatsAppController);
const { greenLeaseWebhook,channelWebhook } = require(_pathConst.controllersPath.sendReceiveWaMsgController);
const { sendWhatsAppMsgReqModel, sendTemplateMessageV1ReqModel } = require(_pathConst.reqModelsPath.whatsAppReqModel);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const { authorize, authorizeClientToken, authorizeClientTokenV1 } = require(_pathConst.filesPath.authHelper);
router.post('/getMsgs', channelWebhook);
router.post('/sendMsg', authorizeClientToken, validator.body(sendWhatsAppMsgReqModel), sendWhatsAppMsgs);
router.post('/scnWhatsAppWebhook', scnWhatsAppWebhook);
router.post('/tripleplayBroadbandWebhook', tripleplayBroadbandWebhook);
router.post('/greenLeaseWebhook', greenLeaseWebhook);
router.post('/sendTemplateMessage', authorizeClientTokenV1, validator.body(sendTemplateMessageV1ReqModel), sendTemplateMessageV1);

module.exports = router;
