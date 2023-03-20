const { getUser, isUserExists, updateUser } = require(_pathConst.modelsPath.usersModel);
const { sendWhatsAppMsgV1} = require(_pathConst.filesPath.smsSender);
const { createJWToken } = require(_pathConst.filesPath.authHelper);
const { generateOTP } = require(_pathConst.filesPath.commonHelper);
// const { app: { whatsAppApiData: { otpTemplateName } } } = require(_pathConst.filesPath.configUrl);

/**
 * @api {post} /loginWithOtp Login With Otp
 * @apiName Log In
 * @apiGroup Account
 * @apiDescription Log In..
 * @apiSampleRequest /loginWithOtp 
 */
exports.loginWithOtp = async (req, res) => {
    try {
        const { mobile } = req.body;
        let otpLength = 4;
        const userExists = await isUserExists(mobile);
        if (userExists) {
            let request = new Object({ user_mobile: mobile });
            //Getting user details linked to email
            let userData = await getUser(request);
            const { user_id ,user_name} = userData;
            const otp = generateOTP(otpLength);
            let otpArr = [];
            let mobileArr = [];
            otpArr.push(otp);
            mobileArr.push(mobile);

            let WaMsgReqObj = {
                "msgData": {
                    "to": `91${mobile}`,
                    "type": "template",
                    "template_name": "tripleplay_ekyc_portal_login_otp_template",
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "text": user_name,
                                    "type": "text"
                                },
                                {
                                    "text": otp,
                                    "type": "text"
                                }
                            ]
                        }
                    ]
                }
            }

            let whatsAppMsgRes = sendWhatsAppMsgV1(WaMsgReqObj);
            // const { data: { status }, } = smsSenderRes;
            // if (status === 'success') {
                let updateUserOtp = await updateUser({ user_id: user_id, otp: otp });
            // } else {
            //     _resHelper.apiResponse(res, true, status, smsSenderRes.status, {}, '');
            // }
            const token = await createJWToken({ userId: user_id, userOTPVerified: false });
            let apiRes = {
                userId: user_id,
                userMobile: mobile
            }
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.otpSentSuccess, 200, apiRes, token);
        } else {
            _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.noUserFound, 404, {}, "");
        }
    } catch (err) {
      console.log(err)
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
exports.verifyOtp = async (req, res) => {
    try {
        const { refreshedToken, oldToken, userData: { userId, userMobileNumber }, body: { mobile, otp } } = req;
      console.log("req.body ",req.body)
      const userExists = await isUserExists(userMobileNumber);
      if (userExists) {
        let request = new Object({ user_mobile: userMobileNumber });
        let userData = await getUser(request);
        if (userData.otp === otp || (userData.is_tester_number && otp === "4444")) {
          let otpSetToNull = await updateUser({ user_id: userId, otp: null });
          let apiRes = {
            userId: userData.user_id,
            userMobile: userData.user_mobile,
            userRole: userData.user_role
          };
          _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.otpVerifySuccess, 200, apiRes, refreshedToken);
        } else {
          _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.otpVerifyUnSuccess, 409, {}, oldToken);
        };
      } else {
        _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.noUserFound, 409, {}, oldToken);
      };
    } catch (err) {
      _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
  };