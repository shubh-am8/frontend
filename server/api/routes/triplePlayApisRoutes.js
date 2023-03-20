const express = require("express");
const { getPartnerList, getResellerList, getPlanList } = require(_pathConst.controllersPath.triplePlayApisController);
const { getPartnerListReqModel, getResellerListReqModel, getPlanListReqModel } = require(_pathConst.reqModelsPath.triplePlayApisReqModel);
const { authorize } = require(_pathConst.filesPath.authHelper);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const router = express.Router();
router.post('/getPartnerList', authorize, validator.body(getPartnerListReqModel), getPartnerList);
router.post('/getResellerList', authorize, validator.body(getResellerListReqModel), getResellerList);
router.post('/getPlanList', authorize, validator.body(getPlanListReqModel), getPlanList);

module.exports = router;