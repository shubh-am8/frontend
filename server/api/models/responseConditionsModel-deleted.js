// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertResponseConditions = async (responseConditionsData) => {
  try {
    let newResponseConditionsId="";
    // await knexSqlDb.raw('TRUNCATE TABLE chat_flow');
    await knexSqlDb.into('response_condition')
      .insert(responseConditionsData)
      .then(async function (responseConditionsId) {
        if (responseConditionsId) {
          newResponseConditionsId = responseConditionsId[0];
        }
      });
      return (newResponseConditionsId);
  } catch (error) {
    throw (error);
  }
};
const getResponseConditions = async (data) => {
  try {
    const { response_id, chat_flow_id, is_if_tree, is_else_tree } = data;
    let responseData = null;
    let responseFinalData;
    responseData = await knexSqlDb.from('response_condition')
      .select([
        '*'
      ])
      .where(qb => {
        if(response_id){
          qb.where({ response_id: response_id})
        }
        if(chat_flow_id){
          qb.where({ chat_flow_id: chat_flow_id})
        }
        if(is_if_tree){
          qb.where({ is_if_tree: is_if_tree})
        }
        if(is_else_tree){
          qb.where({ is_else_tree: is_else_tree})
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
  insertResponseConditions,
  getResponseConditions
}