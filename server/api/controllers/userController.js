const { getAllUsers, isUserExists, updateUser, insertUser } = require(_pathConst.modelsPath.usersModel);
exports.getUsers = async (req, res) => {
    try {
        const { refreshedToken, userData: { userId, userMobileNumber, userRole }, body: { pageNumber, pageSize, search } } = req;
        if (userRole == 'Admin') {
            let userData = await getAllUsers({ pageNumber, pageSize, search });
            // userData.data[0].updated_at = new Date(userData.data[0].updated_at).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
            console.log(userData.data[0].updated_at)
            // console.log( new Date(userData.data[0].updated_at).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
           
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, userData, refreshedToken);

        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.notAuthorize, 409, {}, refreshedToken);
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
exports.addUser = async (req, res) => {
    try {
        const { refreshedToken, userData: { userId, userRole }, body: { name, mobileNumber, email, role, status } } = req;
        if (userRole == 'Admin') {
            let userReqObj = {
                user_name: name,
                user_mobile: mobileNumber,
                user_email: email,
                user_role: role,
                created_by: userId,
                user_status: status,
            }
            let userData = await insertUser(userReqObj);
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, userData, refreshedToken);

        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.notAuthorize, 409, {}, refreshedToken);
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};