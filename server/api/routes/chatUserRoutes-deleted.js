const express = require("express");
const { getChatUser } = require(_pathConst.controllersPath.chatUserController);
const { getChatUsersV1ReqModel } = require(_pathConst.reqModelsPath.chatUsersReqModel);
const { authorizeClientToken } = require(_pathConst.filesPath.authHelper);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const router = express.Router();
router.post('/getChatUsers', validator.body(getChatUsersV1ReqModel), authorizeClientToken, getChatUser);

module.exports = router;