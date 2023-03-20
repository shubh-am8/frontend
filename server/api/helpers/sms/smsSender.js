console.log("In SMS SENDER")
const axios = require('axios');
// console.log("axios  ==>", axios)
const { app: { whatsAppApiData: { authToken } } } = require(_pathConst.filesPath.config);
// const { getOrderDataBySpecificOrderId } = require(_pathConst.modelsPath.ordersModel);
const { getClientsRepresentative, getUserByType } = require(_pathConst.modelsPath.usersModel);
// const { createDynamicUrl } = require(_pathConst.filesPath.firebaseApi);

// exports.sendSMSOtp = async (data) => {
//   try {
//     const { otp, mobileNumber } = data;
//     let msg = `Hi, Your OTP is ${otp} ${" "} -MoolWMS`;
//     let url = `https://api.textlocal.in/send?username=kartik@indicold.in&hash=8a73024a2b9de329ac839af663c52df3d87d8005ede2892375e1152bd23e3696&message=${msg}&sender=MOOLWM&numbers=${mobileNumber}&test=.$test;`
//     let smsSenderRes = axios({ method: 'get', url });
//     return smsSenderRes;
//   } catch (err) {
//     return err
//   }
// };
exports.sendWhatsAppMsgV1 = async (messageBody) => {
  try {
    axios.defaults.headers.common = [];
    // axios.defaults.headers.common['CHATBOT-TEAM-API-KEY'] = "g47g6NqHOBXEDcqQxmEy0VdeAK_2";
    await axios.post("https://tripleplay.chatbot.team/v1/messages/api/sendMessages", messageBody,
    {
      headers:{
        "CHATBOT-TEAM-API-KEY": "g47g6NqHOBXEDcqQxmEy0VdeAK_2"
      }
    })
      .then(async (res) => {
        console.log("WWHATS MSG SENT RES ", res)
      })
      .catch(async (err) => {
        console.error("Whats app Msg status update from helper failed with err ", err)
        return false;
      });
    return true;
  } catch (err) {
    console.error("Whats app req Err-->", err)
    return err
  }
};