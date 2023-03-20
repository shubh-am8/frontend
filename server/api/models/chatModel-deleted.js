// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
const moment = require('moment');

const insertChat = async (chatData) => {
  try {
    const { chatArr,userId } = chatData;
    if(chatArr && userId){
       await knex('chat')
  .del().where('chat_user_id', userId)
    await knexSqlDb.into('chat')
      .insert(chatArr)
      return (true);
    }
 return(false);
      // .then(async function (user_id) {
      //   insertedChatData = await getUser({ user_email: user_email });
      // });
  } catch (error) {
    throw (error);
  }
}
module.exports = {
  insertChat
}