const express = require("express");
const router = express.Router();
const {addWaMessageLog,getWaMessageLogData} = require(_pathConst.controllersPath.waMessageLogController);
const {addWaMessageReqModel,getWaMessageReqModel} = require(_pathConst.reqModelsPath.waMessageLogReqModel);

const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const { authorize } = require(_pathConst.filesPath.authHelper);

router.post('/insertWaMessageLogs', authorize,addWaMessageLog);
router.get('/getWaMessageLogs', authorize,getWaMessageLogData);
// router.get('/getTemplate', authorize, getTemplate);


module.exports = router;