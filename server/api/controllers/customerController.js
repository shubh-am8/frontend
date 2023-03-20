const { getAllCustomer, getCustomer, updateCustomer, insertCustomer, getCustomerById, updateKycStatus } = require(_pathConst.modelsPath.customerModel);
const { insertCustomerDoc } = require(_pathConst.modelsPath.customerDocModel);
const { createVerifiyEkcyJWToken } = require(_pathConst.filesPath.authHelper);
const { sendWhatsAppMsgV1 } = require(_pathConst.filesPath.smsSender);
const ekycVerificationTemplate = "customer_update_ekcy_notification_template";
exports.addCustomer = async (req, res) => {
    try {

        const { refreshedToken, userData: { userId, userRole }, body: {
            name, userId: customerUserId, email, mobile, aadharNumber, aadharFront, aadharBack,
            otherDocType, otherDocFront, otherDocBack, installationAmt, securityAmount,
            address, partner, reseller, plan } } = req;


        let customerId = "";
        if (userRole == 'Admin') {
            customerDocs = [];
            let customerReqObj = {
                customer_name: name,
                customer_user_id: customerUserId,
                customer_email: email ? email : null,
                customer_mobile: mobile,
                customer_adhar_number: aadharNumber ? aadharNumber : null,
                customer_created_by: userId,
                customer_installation_amt: installationAmt,
                customer_security_amt: securityAmount,
                customer_address: address,
                customer_partner: partner,
                customer_reseller: reseller,
                customer_plan: plan,
            };
            if (aadharFront) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: "Aadhaar Front",
                    customer_doc_file_name: aadharFront.file_name,
                    customer_doc_file_url: aadharFront.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (aadharBack) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: "Aadhaar Back",
                    customer_doc_file_name: aadharBack.file_name,
                    customer_doc_file_url: aadharBack.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (otherDocFront) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: otherDocType,
                    customer_doc_file_name: otherDocFront.file_name,
                    customer_doc_file_url: otherDocFront.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (otherDocBack) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: otherDocType,
                    customer_doc_file_name: otherDocBack.file_name,
                    customer_doc_file_url: otherDocBack.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            await insertCustomer(customerReqObj,
                async (insertedCustomerData) => {
                    console.log("insertedCustomerData  ==> ", insertedCustomerData)
                    finalCustomerDocReq = [];
                    if (customerDocs.length && insertedCustomerData) {
                        const { customer_id } = insertedCustomerData;
                        customerId = customer_id;
                        customerDocs.map(docReq => {
                            docReq.customer_id = customer_id;
                            finalCustomerDocReq.push(docReq);
                        });
                        console.log("finalCustomerDocReq  ==> ", finalCustomerDocReq)
                        await insertCustomerDoc(finalCustomerDocReq, customer_id);
                    }
                });
            if (customerId && mobile) {
                //! Sending Whats app Notification
                let customerToken = await createVerifiyEkcyJWToken({ customerId: customerId });
                let WaMsgReqObj = {
                    "msgData": {
                        "to": `91${mobile}`,
                        "type": "template",
                        "template_name": ekycVerificationTemplate,
                        "components": [
                            {
                                "type": "header",
                                "parameters": [
                                    {
                                        "type": "image",
                                        "image": {
                                            "link": "https://ucarecdn.com/2efa0c77-3647-4379-a20b-e974ad251946/tripleplaybannernew.png",
                                            "filename": "tripleplay-header-logo.png"
                                        }
                                    }
                                ]
                            },
                            {
                                "type": "body",
                                "parameters": [
                                    {
                                        "text": name,
                                        "type": "text"
                                    }
                                ]
                            },
                            {
                                "type": "button",//"button",
                                "sub_type": "url",//"url",
                                "index": 0,//"0", 
                                "parameters": [
                                    {
                                        "type": "text",//"text",
                                        "text": `update-customer-ekyc/${customerToken}`
                                    }
                                ]
                            }
                        ]
                    }
                }
                let whatsAppMsgRes = sendWhatsAppMsgV1(WaMsgReqObj);
            };
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, {}, refreshedToken);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.notAuthorize, 409, {}, refreshedToken);
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
// exports.getCustomers = async (req, res) => {
//     try {
//         const { refreshedToken, userData: { userId, userMobileNumber, userRole }, body: { pageNumber, pageSize, search, customerId } } = req;
//         let customerData = await getAllCustomer({ pageNumber, pageSize, search, customer_id: customerId });
//         _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, customerData, refreshedToken);
//     } catch (err) {
//         _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
//     }
// };

exports.getCustomers = async (req, res) => {
    try {
        const { refreshedToken, userData: { userId, userMobileNumber, userRole }, body: { pageNumber, pageSize, search, customerId } } = req;
        // let reqObj = { customerId }
        let customerData = await getAllCustomer({ pageNumber, pageSize, search, customer_id: customerId });

        if (customerData) {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchedSuccess, 200, customerData);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.noRecFound, 404, {});
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
//! get customer by filer
exports.getCustomerById = async (req, res) => {
    try {
        const { oldToken, customerData: { customer_id } } = req;
        // let reqObj = { customerId }
        let customerData = await getCustomerById({ customer_id: customer_id });


        if (customerData) {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchedSuccess, 200, customerData);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.noRecFound, 404, {});
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
exports.getCustomerByFilter = async (req, res) => {
    try {
        const { refreshedToken, userData: { userId, userMobileNumber, userRole }, body: { pageNumber, pageSize, search, customerId } } = req;
        // let reqObj = { customerId }
        let customerData = await getCustomerById({ customer_id: customerId });
        if (customerData) {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchedSuccess, 200, customerData);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.noRecFound, 404, {});
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};


// exports.getCustomerById = async (req, res) => {
//     try {
//         const { oldToken, customerData: { customer_id } } = req;
//         let customerData = await getCustomerById({ customer_id: customer_id });
//         _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, customerData, oldToken);
//     } catch (err) {
//         _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
//     }
// };

//! update kyc status

exports.updateKycStatusData = async (req, res) => {
    try {
        const { userData: { userId, userRole },
            body: { customer_id, customer_ekyc_status } } = req;
        let kycStatusData = await updateKycStatus({ customer_id: customer_id, customer_ekyc_status: customer_ekyc_status, customer_ekyc_checked_by_id: userId  });
        if (kycStatusData.length) {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.assetUpdateSuccess, 200, kycStatusData);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.noRecFound, 404, {});
        }
        // _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.notAuthorize, 401, {});
    }
    catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};


exports.updateCustomerBySelf = async (req, res) => {
    try {

        const { oldToken, customerData: { customer_id }, body: { customerId,
            name, userId: customerUserId, email, mobile, aadharNumber, aadharFront, aadharBack,
            otherDocType, otherDocFront, otherDocBack, installationAmt, securityAmount,
            address, partner, reseller, plan } } = req;


     
        if (customer_id) {
            customerDocs = [];
            let customerReqObj = {
                customer_id: customerId,
                customer_name: name,
                customer_user_id: customerUserId,
                customer_email: email ? email : null,
                customer_mobile: mobile,
                customer_adhar_number: aadharNumber ? aadharNumber : null,
                customer_installation_amt: installationAmt,
                customer_security_amt: securityAmount,
                customer_address: address,
                customer_partner: partner,
                customer_reseller: reseller,
                customer_plan: plan,
                customer_ekyc_status: "Submitted"
            };
            if (aadharFront.file_name) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: "Aadhaar Front",
                    customer_doc_file_name: aadharFront.file_name,
                    customer_doc_file_url: aadharFront.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if ( aadharBack.file_name) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: "Aadhaar Back",
                    customer_doc_file_name: aadharBack.file_name,
                    customer_doc_file_url: aadharBack.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (otherDocFront.file_name) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: otherDocType,
                    customer_doc_file_name: otherDocFront.file_name,
                    customer_doc_file_url: otherDocFront.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (otherDocBack.file_name) {
                let customerDocReqObj = {
                    customer_id: "",
                    customer_doc_type: otherDocType,
                    customer_doc_file_name: otherDocBack.file_name,
                    customer_doc_file_url: otherDocBack.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            await updateCustomer(customerReqObj,
                async (insertedCustomerData) => {
                    finalCustomerDocReq = [];
                    if (customerDocs.length && insertedCustomerData) {
                        const { customer_id } = insertedCustomerData;
                        // customerId = customer_id;
                        customerDocs.map(docReq => {
                            docReq.customer_id = customer_id;
                            finalCustomerDocReq.push(docReq);
                        })
                    }
                    await insertCustomerDoc(finalCustomerDocReq, customerId);
                });
            // if (customerId && mobile) {
            // //     //! Sending Whats app Notification
            //     let customerToken = await createVerifiyEkcyJWToken({ customerId: customerId });
            //     let WaMsgReqObj = {
            //         "msgData": {
            //             "to": `91${mobile}`,
            //             "type": "template",
            //             "template_name": ekycVerificationTemplate,
            //             "components": [
            //                 {
            //                     "type": "header",
            //                     "parameters": [
            //                         {
            //                             "type": "image",
            //                             "image": {
            //                                 "link": "https://ucarecdn.com/2efa0c77-3647-4379-a20b-e974ad251946/tripleplaybannernew.png",
            //                                 "filename": "tripleplay-header-logo.png"
            //                             }
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     "type": "body",
            //                     "parameters": [
            //                         {
            //                             "text": name,
            //                             "type": "text"
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     "type": "button",//"button",
            //                     "sub_type": "url",//"url",
            //                     "index": 0,//"0", 
            //                     "parameters": [
            //                         {
            //                             "type": "text",//"text",
            //                             "text": `/update-customer-ekyc/${customerToken}`
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     }
            //     let whatsAppMsgRes = sendWhatsAppMsgV1(WaMsgReqObj);
            // };
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.customerUpdateSuccess, 200,{} , oldToken);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.notAuthorize, 409, {}, oldToken);
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
exports.updateCustomer = async (req, res) => {
    try {

        const { refreshedToken, userData: { userId, userRole }, body: { customerId,
            name, userId: customerUserId, email, mobile, aadharNumber, aadharFront, aadharBack,
            otherDocType, otherDocFront, otherDocBack, installationAmt, securityAmount,
            address, partner, reseller, plan } } = req;


     
        if (userRole == 'Admin') {
           let customerDocs = [];
            let customerReqObj = {
                customer_id: customerId,
                customer_name: name,
                customer_user_id: customerUserId,
                customer_email: email ? email : null,
                customer_mobile: mobile,
                customer_adhar_number: aadharNumber ? aadharNumber : null,
                customer_updated_by: userId,
                customer_installation_amt: installationAmt,
                customer_security_amt: securityAmount,
                customer_address: address,
                customer_partner: partner,
                customer_reseller: reseller,
                customer_plan: plan,
            };
            if (aadharFront.file_name) {
                let customerDocReqObj = {
                    customer_id: customerId,
                    customer_doc_type: "Aadhaar Front",
                    customer_doc_file_name: aadharFront.file_name,
                    customer_doc_file_url: aadharFront.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (aadharBack.file_name) {
                let customerDocReqObj = {
                    customer_id: customerId,
                    customer_doc_type: "Aadhaar Back",
                    customer_doc_file_name: aadharBack.file_name,
                    customer_doc_file_url: aadharBack.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (otherDocFront.file_name) {
                let customerDocReqObj = {
                    customer_id: customerId,
                    customer_doc_type: otherDocType,
                    customer_doc_file_name: otherDocFront.file_name,
                    customer_doc_file_url: otherDocFront.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            if (otherDocBack.file_name) {
                let customerDocReqObj = {
                    customer_id: customerId,
                    customer_doc_type: otherDocType,
                    customer_doc_file_name: otherDocBack.file_name,
                    customer_doc_file_url: otherDocBack.file_url,
                };
                customerDocs.push(customerDocReqObj);
            }
            await updateCustomer(customerReqObj,
                async (insertedCustomerData) => {
                    // finalCustomerDocReq = [];
                    // if (customerDocs.length && insertedCustomerData) {
                    //     const { customer_id } = insertedCustomerData;
                    //     customerId = customer_id;
                    //     customerDocs.map(docReq => {
                    //         docReq.customer_id = customer_id;
                    //         finalCustomerDocReq.push(docReq);
                    //     })
                    await insertCustomerDoc(customerDocs, customerId);
                    // }
                });
            // if (customerId && mobile) {
            // //     //! Sending Whats app Notification
            //     let customerToken = await createVerifiyEkcyJWToken({ customerId: customerId });
            //     let WaMsgReqObj = {
            //         "msgData": {
            //             "to": `91${mobile}`,
            //             "type": "template",
            //             "template_name": ekycVerificationTemplate,
            //             "components": [
            //                 {
            //                     "type": "header",
            //                     "parameters": [
            //                         {
            //                             "type": "image",
            //                             "image": {
            //                                 "link": "https://ucarecdn.com/2efa0c77-3647-4379-a20b-e974ad251946/tripleplaybannernew.png",
            //                                 "filename": "tripleplay-header-logo.png"
            //                             }
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     "type": "body",
            //                     "parameters": [
            //                         {
            //                             "text": name,
            //                             "type": "text"
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     "type": "button",//"button",
            //                     "sub_type": "url",//"url",
            //                     "index": 0,//"0", 
            //                     "parameters": [
            //                         {
            //                             "type": "text",//"text",
            //                             "text": `/update-customer-ekyc/${customerToken}`
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     }
            //     let whatsAppMsgRes = sendWhatsAppMsgV1(WaMsgReqObj);
            // };
            _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.customerUpdateSuccess, 200,{} , refreshedToken);
        } else {
            _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.notAuthorize, 409, {}, refreshedToken);
        }
    } catch (err) {
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
