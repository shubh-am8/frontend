// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertMessages = async (responseData) => {
  try {
    let newMessageId="";
    await knexSqlDb.raw('TRUNCATE TABLE message');
    await knexSqlDb.into('message')
      .insert(responseData)
      .then(async function (messageId) {
        if (messageId) {
          newMessageId = messageId[0];
        }
      });
      return (newMessageId);
  } catch (error) {
    throw (error);
  }
};
const getChatReply = async (userMsg) => {
  try {
    // const { chat_builder_id } = data;
    let botData = null;
    let botFinalData
    botData = await knexSqlDb.from('message')
      .select([
        '*'
      ])
      .where(qb => {
          qb.where({ user_reply: userMsg})
      })
    botFinalData = botData[0];
    if(botFinalData){
      return (botFinalData);
    } else{
      botData = await knexSqlDb.from('message')
      .select([
        '*'
      ])
      .where(qb => {
          qb.where({ is_initial: true})
      })
    botFinalData = botData[0];
    return (botFinalData);
    }
    // botFinalData.builder_json = JSON.parse(botFinalData.builder_json)
  } catch (error) {
    throw (error);
  }
}
module.exports = {
  insertMessages,
  getChatReply
}