const express = require("express");
const router = express.Router();
const { addCustomer, getCustomers, getCustomerById, updateKycStatusData, getCustomerByFilter, updateCustomer, updateCustomerBySelf } = require(_pathConst.controllersPath.customerController);
const { addCustomerReqModel, getCustomerReqModel, updateKycStatusReqModel,getCustomerByIdReqModel, updateCustomerReqModel } = require(_pathConst.reqModelsPath.customerReqModel);
const validator = require("express-joi-validation")({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const { authorize, authorizeCustomer } = require(_pathConst.filesPath.authHelper);

router.post('/addCustomer', authorize, validator.body(addCustomerReqModel), addCustomer);
router.post('/getCustomers', authorize, validator.body(getCustomerReqModel), getCustomers);
router.post('/getCustomersFilterData', authorize, validator.body(getCustomerByIdReqModel), getCustomerByFilter);
router.get('/getCustomerById', authorizeCustomer, getCustomerById);
router.post('/updateKycStatus',authorize,validator.body(updateKycStatusReqModel),updateKycStatusData);
router.post('/updateCustomer',authorize,validator.body(updateCustomerReqModel),updateCustomer);
router.post('/updateCustomerBySelf', authorizeCustomer, validator.body(updateCustomerReqModel), updateCustomerBySelf);
// router.get('/updateKycStatus', validator.body(updateKycStatusReqModel), updateKycStatusData);
// router.post('/verifyOtp', authorize, validator.body(verifyOtpReqModel), verifyOtp);
// router.post('/getUsers', authorize, validator.body(getUsersReqModel), getUsers);
// router.post('/addUser', authorize, validator.body(addUserReqModel), addUser);


module.exports = router;