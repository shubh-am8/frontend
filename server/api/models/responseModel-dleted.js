// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertResponse = async (responseData) => {
  try {
    let newResponseData = "";
    // await knexSqlDb.raw('TRUNCATE TABLE response');
    await knexSqlDb.into('response')
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
const updateResponse = async (updateResponseData) => {
  try {
    const { response_id ,chat_user_id} = updateResponseData;
    const responseId = response_id;
    const userId = chat_user_id;
    let updatedResponseData = null;
    if (Object.keys(updateResponseData).length > 0) {
      delete updateResponseData["response_id"];
      delete updateResponseData["chat_user_id"];
      await knexSqlDb.from('response')
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
const getResponse = async (data) => {
  try {
    const { response_id, chat_user_id } = data;
    let responseData = null;
    let responseFinalData;
    responseData = await knexSqlDb.from('response')
      .select([
        '*'
      ])
      .where(qb => {
        if (response_id) {
          qb.where({ response_id: response_id })
        }
        if (chat_user_id) {
          qb.where({ chat_user_id: chat_user_id})
        }
        // qb.where({ is_answered: false,is_asked:false})
      })
    responseFinalData = responseData;
    // botFinalData.builder_json = JSON.parse(botFinalData.builder_json)
    return (responseFinalData);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  insertResponse,
  updateResponse,
  getResponse
}