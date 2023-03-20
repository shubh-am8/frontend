const jwt = require('jwt-simple')
const moment = require('moment')
const { getUser } = require(_pathConst.modelsPath.usersModel);
const { getCustomer } = require(_pathConst.modelsPath.customerModel);
const TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 * @api {function} createJWToken createJWToken
 *  @apiName createJWToken
 *  @apiGroup AuthHelper
 *  @apiParam {object}  user A object of user information  .
 *  @apiDescription Create unique token with 1 minutes expire time .
 */
const createJWToken = async function (data) {
    try {
        let { oldToken, userId, userOTPVerified } = data;
        if (oldToken) {
            userId = await getUserIdFromToken(oldToken);
        }
        const userData = await getUser({ user_id: userId });
        const { user_id, user_name, user_email, user_role, user_status, user_mobile, } = userData;
        const user = {
            userId: user_id,
            userName: user_name,
            userEmail: user_email,
            userMobileNumber: user_mobile,
            userRole: user_role,
            userStatus: user_status,
            userOTPVerified: userOTPVerified ? userOTPVerified : false
        }
        var payload = {
            user: user,
            iat: moment().unix()
            // exp: moment().add(1, 'minutes').unix() 
        }
        return jwt.encode(payload, TOKEN_SECRET)
    } catch (error) {
        throw error;
    }
}
const createVerifiyEkcyJWToken = async function (data) {
    try {
        let { customerId } = data;
        // const userData = await getCustomer({ customer_id: customerId });
        // const { user_id, user_name, user_email, user_role, user_status, user_mobile, } = userData;
        const customer = {
            customer_id: customerId
        }
        var payload = {
            customer: customer,
            iat: moment().unix()
            // exp: moment().add(1, 'minutes').unix() 
        }
        return jwt.encode(payload, TOKEN_SECRET)
    } catch (error) {
        throw error;
    }
}
/**
 * @api {function} Get Only user Id from token
 *  @apiName authorize
 *  @apiGroup AuthHelper
 *  @apiParam {object}  req A object of Request Call from Client  .
 *  @apiParam {object}  res A object of Response Call to Client .
 *  @apiParam {callback}  next A Callback to pass request to next midleware .
 *  @apiDescription A midleware to authorize the REST call .
 */
const getUserIdFromToken = async function (token) {
    try {
        let tokenData = null;
        tokenData = jwt.decode(token, config.TOKEN_SECRET)
        const userId = tokenData.user.user_id
        return userId;
    } catch (error) {
        throw error;
    }
}
/**
 * @api {function} Get whoe user info from token
 *  @apiName authorize
 *  @apiGroup AuthHelper
 *  @apiParam {object}  req A object of Request Call from Client  .
 *  @apiParam {object}  res A object of Response Call to Client .
 *  @apiParam {callback}  next A Callback to pass request to next midleware .
 *  @apiDescription A midleware to authorize the REST call .
 */
const getUserDetailsFromToken = async function (token) {
    try {
        let tokenData = null;
        tokenData = jwt.decode(token, config.TOKEN_SECRET)
        const user = tokenData.user
        return user;
    } catch (error) {
        throw error;
    }
}
/**
 * @api {function} authorize authorize
 *  @apiName authorize
 *  @apiGroup AuthHelper
 *  @apiParam {object}  req A object of Request Call from Client  .
 *  @apiParam {object}  res A object of Response Call to Client .
 *  @apiParam {callback}  next A Callback to pass request to next midleware .
 *  @apiDescription A midleware to authorize the REST call .
 */
const authorize = async function (req, res, next) {
    var resModel = {
        Status: false,
        Message: "",
        Data: {}
    };
    if (!req.header('Authorization')) {
        resModel.Message = 'Please make sure your request has an Authorization header';
        return res.status(401).send(resModel);
    }
    var token = req.header('Authorization');
    var payload = null
    try {
        payload = jwt.decode(token, TOKEN_SECRET)
    } catch (err) {
        resModel.Message = err.message;
        return res.status(401).send(resModel);
    }
    if (payload.exp <= moment().unix()) {
        resModel.Message = 'Token has expired';
        return res.status(401).send(resModel);
    }
    if (payload) {
        if(payload.user){
            const { user: { userId, userName, userEmail, userRole, userStatus, userNumber } } = payload;
            const refreshedToken = await createJWToken({ userId: userId, userOTPVerified: true })
            req.userData = payload.user
            req.refreshedToken = refreshedToken;
            req.oldToken = token;

        }else if(payload.customer){

        }
    }
    next();
}
const authorizeCustomer = async function (req, res, next) {
    var resModel = {
        Status: false,
        Message: "",
        Data: {}
    };
    var token = req.header('Authorization');
    if (!token) {
        resModel.Message = 'Please make sure your request has an Authorization header';
        return res.status(401).send(resModel);
    }
    var payload = null
    try {
        payload = jwt.decode(token, TOKEN_SECRET)
    } catch (err) {
        resModel.Message = err.message;
        return res.status(401).send(resModel);
    }
    if (payload.exp <= moment().unix()) {
        resModel.Message = 'Token has expired';
        return res.status(401).send(resModel);
    }
    if (payload) {
        req.customerData = payload.customer
        req.oldToken = token;
    }
    next();
}

module.exports = {
    createJWToken,
    getUserIdFromToken,
    authorize,
    getUserDetailsFromToken,
    createVerifiyEkcyJWToken,
    authorizeCustomer
}