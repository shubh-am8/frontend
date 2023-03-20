const express = require("express");
const router = express.Router();
const { loginWithOtp, verifyOtp } = require(_pathConst.controllersPath.signInController);
const { loginWithOtpReqModel, verifyOtpReqModel } = require(_pathConst.reqModelsPath.signInReqModel);
const { getUsers, addUser } = require(_pathConst.controllersPath.userController);
const { getUsersReqModel, addUserReqModel } = require(_pathConst.reqModelsPath.usersReqModel);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const { authorize } = require(_pathConst.filesPath.authHelper);

router.post('/loginWithOtp', validator.body(loginWithOtpReqModel), loginWithOtp);
router.post('/verifyOtp', authorize, validator.body(verifyOtpReqModel), verifyOtp);
router.post('/getUsers', authorize, validator.body(getUsersReqModel), getUsers);
router.post('/addUser', authorize, validator.body(addUserReqModel), addUser);


module.exports = router;