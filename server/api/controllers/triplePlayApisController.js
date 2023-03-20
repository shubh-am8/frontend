const axios = require("axios");
const requestObj = {
    requestDate: "2002-05-30T09:00:00",
    extTransactionId: "-99999",
    systemId: "tpoperations",
    password: "Jass@19931993@"
};
exports.getPartnerList = async (req, res) => {
    try {
        const { refreshedToken } = req;
        let reqObj = {
            Request: requestObj
        }
        // console.log("getPartner request .......", reqObj);
        axios.defaults.headers.common = [];
        await axios.post("https://admin.tripleplay.in/api/ekycservice.asmx/PartnerList", reqObj)
            .then(getPartnerListRes => {
                // console.log("res....api....", getPartnerListRes.data.d.PartnerList);
                let finalData = getPartnerListRes.data.d.PartnerList;
                _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, finalData, refreshedToken);
            })
            .catch(err => {
                console.log("getPartnerList line 22 ==>  ", err)
                _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.commonErrMsg, 400, {}, refreshedToken);
            });
    } catch (err) {
        console.log("getPartnerList ==>  " ,err)
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
exports.getResellerList = async (req, res) => {
    try {
        const { refreshedToken, body: { partnerName } } = req;
        let reqObj = {
            Request: requestObj,
            PartnerName: partnerName
        }
        // console.log("getReseller request .......", reqObj);
        axios.defaults.headers.common = [];
        await axios.post("https://admin.tripleplay.in/api/ekycservice.asmx/ResellerList", reqObj)
            .then(getResellerListRes => {
                // console.log("res....api....", getResellerListRes.data.d.ResellerList);
                let finalData = getResellerListRes.data.d.ResellerList
                _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, finalData, refreshedToken);
            })
            .catch(err => {
                console.log("getResellerList line 44==>  " ,err)

                _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.commonErrMsg, 400, {}, refreshedToken);
            });
    } catch (err) {
        console.log("getResellerList ==>  line 49" ,err)
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};
exports.getPlanList = async (req, res) => {
    try {
        const { refreshedToken, body: { partnerName, resellerName } } = req;
        let reqObj = {
            Request: requestObj,
            PartnerName: partnerName,
            ResellerName: resellerName
        }
        // console.log("getPlan request .......", reqObj);
        axios.defaults.headers.common = [];
        await axios.post("https://admin.tripleplay.in/api/ekycservice.asmx/PlanList", reqObj)
            .then(getPlanListRes => {
                // console.log("res....api....", getPlanListRes.data.d.PlanList);
                let finalData = getPlanListRes.data.d.PlanList;
                _resHelper.apiResponse(res, true, _msgConst.custmSuccessMsgs.listFetchSuccess, 200, finalData, refreshedToken);
            })
            .catch(err => {
                console.log("getPlanList line 67 ==>  " ,err)
                _resHelper.apiResponse(res, true, _msgConst.custmErrMsgs.commonErrMsg, 400, {}, refreshedToken);
            });
    } catch (err) {
        console.log("getPlanList line 71 ==>  " ,err)
        _resHelper.apiResponse(res, false, _msgConst.custmErrMsgs.commonErrMsg, 500, {}, "");
    }
};