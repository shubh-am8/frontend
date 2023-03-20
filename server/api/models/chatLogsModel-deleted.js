// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');
const { getOnlineChatUser } = require(_pathConst.modelsPath.chatUserModel);
const insertChatLog = async (chatLogData) => {
  try {
    console.log("chatLogData to Insert ", chatLogData)
    const { client_id } = chatLogData;
    let newResponseData = "";
    if (client_id) {
      chatLogData.client_id = knexSqlDb.raw(`uuid_to_bin('${client_id}')`);
    }
    if (chatLogData.agent_id) {
      chatLogData.agent_id = knexSqlDb.raw(`uuid_to_bin('${chatLogData.agent_id}')`);
    }
    // await knexSqlDb.raw('TRUNCATE TABLE response');
    await knexSqlDb.into('chat_logs')
      .insert(chatLogData)
      .then(async function (chatLogId) {
        if (chatLogId) {
          // newResponseData = await getResponse({ response_id: responseId[0] });
          console.error("CHAT EVENT FIRED");
          let chatUsers = await getOnlineChatUser({ client_id: client_id ? knexSqlDb.raw(`uuid_to_bin('${client_id}')`) : chatLogData[0].client_id })
          _socket.emit("updateChat", chatUsers);
          // _socket.emit("getUser", { isNewMsg: true });
        }
      });
    return (true);
  } catch (error) {
    console.error("ERR DURING INSERTING CHAT LOGS ", error)
    throw (error);
  }
};
const updateChatLog = async (chatLogData, waMsgId) => {
  try {
    await knexSqlDb.update(chatLogData)
      .from('chat_logs')
      .where(qb => {
        qb.where({ wa_message_id: waMsgId })
      });
    return true;
  } catch (error) {
    throw (error);
  }
};
const getUserChatLog = async (data) => {
  try {
    const { client_id, chat_user_mobile } = data;
    let responseData = await knexSqlDb.from('chat_logs')
      .select([
        'chat_logs.*'
      ])
      .orderBy('chat_log_id', 'desc')
      .leftJoin('chat_user', 'chat_user.chat_user_id', '=', "chat_logs.chat_user_id",)
      .where(qb => {
        if (client_id) {
          qb.where({ "chat_logs.client_id": client_id, 'chat_user.client_id': client_id })
        }
        if (chat_user_mobile) {
          qb.where({ chat_user_mobile: chat_user_mobile})
        }
      })
    return (responseData.length ? responseData[0] : responseData);
  } catch (error) {
    throw (error);
  }
};
const getUserChatLogWithPagination = async (data) => {
  try {
    const { pageNumber, pageSize, chatUserId } = data;
    const pagination = new Object();
    const limitPerPage = pageSize || Number.MAX_SAFE_INTEGER;
    const page = Math.max(pageNumber || 1, 1);
    const offset = (page - 1) * limitPerPage;
    return Promise.all([
      await knexSqlDb('chat_logs as cl')
        .select([
          "cl.*",
          knexSqlDb.raw('bin_to_uuid(cl.bot_template_id) as bot_template_id'),
          knexSqlDb.raw('bin_to_uuid(cl.client_id) as client_id'),
        ])
        .select(knexSqlDb.raw('count(*) OVER() as total'))
        .where(qb => {
          if (chatUserId) {
            qb.where({ "chat_user_id": chatUserId })
          }
        })
        .orderBy('cl.chat_log_id', 'desc')
        .limit(limitPerPage)
        .offset(offset)
    ]).then(async ([chatUsers]) => {
      let total = 0
      if (chatUsers.length) {
        total = chatUsers[0].total;
      }
      const count = total;
      pagination.total = parseInt(count, 10);
      pagination.pageSize = limitPerPage;
      pagination.offset = offset;
      pagination.to = offset + chatUsers.length;
      pagination.lastPage = Math.ceil(count / limitPerPage);
      pagination.pageNumber = page;
      pagination.from = offset;
      pagination.chatUserId = chatUserId;
      pagination.data = chatUsers;
      return pagination;
    });
  } catch (error) {
    throw (error);
  }
};


const getUserChatLogByUserId = async (data) => {
  try {
    const { chat_user_id, client_id, limit } = data;
    let responseData = await knexSqlDb.from('chat_logs')
      .select([
        'chat_logs.*'
      ])
      .orderBy('chat_log_id', 'desc')
      .limit(limit)
      .where(qb => {
        if (chat_user_id) {
          qb.where({ "chat_user_id": chat_user_id })
        }
        if (client_id) {
          qb.where({ 'client_id': knexSqlDb.raw(`uuid_to_bin('${client_id}')`) })
        }
      })
    console.log(`CHAT USER ID >> ${chat_user_id} << Clinet Id  >> ${client_id} <<  And Limit >> ${limit} << `, responseData)
    return (responseData.length ? responseData[0] : responseData);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  insertChatLog,
  getUserChatLog,
  updateChatLog,
  getUserChatLogByUserId,
  getUserChatLogWithPagination
  // getResponse
}