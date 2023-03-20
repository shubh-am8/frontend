// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertResponseChoices = async (responseData) => {
  try {
    let newResponseData = "";
    // await knexSqlDb.raw('TRUNCATE TABLE response');
    await knexSqlDb.into('response_choice')
      .insert(responseData)
      .then(async function (responseId) {
        if (responseId) {
          // newResponseData = await getResponse({ response_id: responseId[0] });
        }
      });
    return (true);
  } catch (error) {
    throw (error);
  }
};
const updateResponseChoices = async (updateResponseData) => {
  try {
    const { response_id ,chat_user_id} = updateResponseData;
    const responseId = response_id;
    const userId = chat_user_id;
    let updatedResponseData = null;
    if (Object.keys(updateResponseData).length > 0) {
      delete updateResponseData["response_id"];
      delete updateResponseData["chat_user_id"];
      await knexSqlDb.from('response_choice')
        .where({ response_id: responseId })
        .update(updateResponseData)
        .then(async function (isUpdated) {
          if(isUpdated)
          updatedResponseData = await getResponse({ chat_user_id: userId })
        });
    }
    return updatedResponseData;
  } catch (error) {
    throw (error);
  }
};
const getResponseChoices = async (data) => {
  try {
    const { chat_flow_id } = data;
    let responseData = null;
    let responseFinalData;
    responseData = await knexSqlDb.from('response_choice')
      .select([
        '*'
      ])
      .where(qb => {
        if (chat_flow_id) {
          qb.where({ chat_flow_id: chat_flow_id })
        }
      })
    responseFinalData = responseData;
    // botFinalData.builder_json = JSON.parse(botFinalData.builder_json)
    return (responseFinalData);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  insertResponseChoices,
  updateResponseChoices,
  getResponseChoices
}