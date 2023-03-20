// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertChatFlow = async (chatFlowData) => {
  try {
    let newChatFlowId="";
    // await knexSqlDb.raw('TRUNCATE TABLE chat_flow');
    await knexSqlDb.into('chat_flow')
      .insert(chatFlowData)
      .then(async function (chatFlowId) {

        if (chatFlowId) {
          newChatFlowId = chatFlowId[0];
        }
      });
      return (newChatFlowId);
  } catch (error) {
    throw (error);
  }
};
const getChatFlow = async (data) => {
  try {
    const { template_id ,chat_flow_id,next_reply_node_id,is_initial } = data;
    let responseData = null;
    // let responseFinalData;
    responseData = await knexSqlDb.from('chat_flow')
      .select([
        '*'
      ])
      .where(qb => {
        if(template_id){
          // Old Code start
          // qb.where({ template_id: template_id})
          // Old Code End

          // update by datta start
          qb.where('template_id',knexSqlDb.raw(`uuid_to_bin('${template_id}')`))
          // update by datta End
        }
        if(chat_flow_id){
          qb.where({ chat_flow_id: chat_flow_id})
        }
        if(next_reply_node_id){
          qb.where({ node_id: next_reply_node_id})
        }
        if(is_initial){
          qb.where({ is_initial: is_initial})
        }
      })
      // .leftJoin('response_condition', 'response_condition.chat_flow_id', '=', 'chat_flow.chat_flow_id')
      // responseFinalData = responseData[0];
    // botFinalData.builder_json = JSON.parse(botFinalData.builder_json)
    return (responseData);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  insertChatFlow,
  getChatFlow
}