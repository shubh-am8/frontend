// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
const moment = require('moment');

const insertChatUser = async (userData) => {
  try {
    const { chat_user_name } = userData;
    // await knexSqlDb.raw('TRUNCATE TABLE chat_user');
    // await knexSqlDb.raw('TRUNCATE TABLE response');
    userData.client_id = knexSqlDb.raw(`uuid_to_bin('${userData.client_id}')`)
    let insertedUserData = "";
    await knexSqlDb.into('chat_user')
      .insert(userData)
      .then(async function (chat_user_id) {
        insertedUserData = await getChatUser({ chat_user_name: chat_user_name });
      });
    return (insertedUserData);
  } catch (error) {
    throw (error);
  }
};
const addUpdateChatUser = async (chatUserData) => {
  try {
    const { chat_user_mobile, client_id } = chatUserData;
    let chatUserId = 0;
    chatUserData.client_id = knexSqlDb.raw(`uuid_to_bin('${client_id}')`);
    chatUserData.is_online = 1;
    await knexSqlDb.from('chat_user')
      .select([
        '*'
      ])
      .orderBy('chat_user_id', 'desc')
      .where(qb => {
        if (chat_user_mobile) {
          qb.where({ chat_user_mobile: chat_user_mobile, client_id: knexSqlDb.raw(`uuid_to_bin('${client_id}')`) })
        }
      }).then(async (chatUser) => {
        if (!chatUser.length) {
          await knexSqlDb.into('chat_user')
            .insert(chatUserData)
            .then(newChatUserId => {
              return chatUserId = newChatUserId[0]
            })
        } else {
          await knexSqlDb.update({ is_online: 1 })
            .from('chat_user')
            .where(qb => {
              qb.where({ chat_user_mobile: chat_user_mobile, client_id: knexSqlDb.raw(`uuid_to_bin('${client_id}')`) })
            })
          return chatUserId = chatUser[0].chat_user_id;
        }
      });
    return (chatUserId);
  } catch (error) {
    throw (error);
  }
};
const updateChatUser = async (chatUserData) => {
  try {
    const { chat_user_id, chat_user_name, chat_session_id } = chatUserData;
    let updatedUserData = null;
    // if (user_fname) {
    //   userData.user_fname = commonHelper.capFirstLetterrOfStr(user_fname);
    // } else {
    //   delete userData["user_fname"];
    // }
    // if (user_lname) {
    //   userData.user_lname = commonHelper.capFirstLetterrOfStr(user_lname);
    // } else {
    //   delete userData["user_lname"];
    // }
    // if (userData["user_id"])
    //   // deleting user_id from obj if exists 
    //   delete userData["user_id"];
    if (Object.keys(chatUserData).length > 0) {
      delete chatUserData["chat_user_id"];
      delete chatUserData["chat_session_id"];
      await knexSqlDb.from('chat_user')
        // .where({ user_id: knexSqlDb.raw(`uuid_to_bin('${user_id}')`) })
        .where(qb => {
          if (chat_user_id) {
            qb.where({ chat_user_id: chat_user_id })
          }
          if (chat_session_id) {
            qb.where({ chat_session_id: chat_session_id })
          }
        })
        .update(chatUserData)
        .then(async function (isUpdated) {
          updatedUserData = await getChatUser({ chat_user_id: chat_user_id })
        });
    }
    return (updatedUserData);
  } catch (error) {
    throw (error);
  }
}
const getChatUser = async (data) => {
  try {
    const { chat_user_name, chat_user_id, template_id, chat_user_mobile, client_id } = data;
    let userData = null;
    let userFinalData
    userData = await knexSqlDb.from('chat_user')
      .select([
        '*',
        knexSqlDb.raw(`bin_to_uuid(chat_user.client_id) as client_id`),
      ])
      .orderBy('chat_user_id', 'desc')
      .leftJoin('client', 'client.client_id', '=', 'chat_user.client_id')
      .where(qb => {
        if (chat_user_id) {
          qb.where({ chat_user_id: chat_user_id })
        }
        if (chat_user_name) {
          qb.where({ chat_user_name: chat_user_name })
        }
        if (template_id) {
          qb.where('template_id', knexSqlDb.raw(`uuid_to_bin('${template_id}')`))
        }
        if (chat_user_mobile) {
          qb.where('chat_user_mobile', chat_user_mobile)
        }
        if (client_id) {
          qb.where('chat_user.client_id', knexSqlDb.raw(`uuid_to_bin('${client_id}')`))
        }
      })
    return (userData);
  } catch (error) {
    throw (error);
  }
}




const getOnlineChatUserWithPaginationAndSearch = async (data) => {
  try {
    const { page_number, page_size, client_id, client_subdomain, search } = data;
    const pagination = new Object();
    const limitPerPage = page_size || Number.MAX_SAFE_INTEGER;
    const page = Math.max(page_number || 1, 1);
    const offset = (page - 1) * limitPerPage;
    return Promise.all([
      await knexSqlDb('chat_user as cu')
        .select([
          "cu.chat_user_id",
          knexSqlDb.raw('bin_to_uuid(cu.client_id) as client_id'),
          "cu.chat_session_id",
          "cu.chat_type",
          "cu.chat_user_name",
          "cu.chat_user_email",
          "cu.chat_user_mobile",
          "cu.chat_user_ip",
          "cu.chat_user_country_code",
          "cu.chat_user_country_name",
          "cu.chat_user_city",
          "cu.chat_user_postal",
          "cu.chat_user_latitude",
          "cu.chat_user_longitude",
          "cu.chat_user_state",
          "cu.chat_user_info_json",
          "cu.channel_id",
          "cu.chat_room",
          "cu.is_online",
          "cu.is_agent_takeover_chat",
          "cu.created_at",
          "cu.updated_at",
          knexSqlDb.raw('bin_to_uuid(cu.template_id) as template_id'),
          knexSqlDb.raw('bin_to_uuid(cu.updated_by) as updated_by'),
          knexSqlDb.raw('bin_to_uuid(cu.created_by) as created_by'),
        ])
        .leftJoin('client as c', 'c.client_id', '=', 'cu.client_id')
        .select(knexSqlDb.raw('count(*) OVER() as total'))
        .where(qb => {
          if (client_id) {
            qb.where({ "cu.client_id": knexSqlDb.raw(`uuid_to_bin('${client_id}')`) })
          }
          if (client_subdomain) {
            qb.where({ "c.client_subdomain": client_subdomain })
          }
          if (search) {
            qb.where('chat_user_name', 'like', `%${search}%`)
              .orWhere('chat_user_mobile', 'like', `%${search}%`);
          }
        })
        .orderBy('cu.updated_at', 'asc')
        .limit(limitPerPage)
        .offset(offset)
    ]).then(async ([chatUsers]) => {
      let total = 0
      if (chatUsers.length) {
        total = chatUsers[0].total;
      }
      const count = total;
      pagination.total = parseInt(count, 10);
      pagination.page_size = limitPerPage;
      pagination.offset = offset;
      pagination.to = offset + chatUsers.length;
      pagination.last_page = Math.ceil(count / limitPerPage);
      pagination.page_number = page;
      pagination.from = offset;
      pagination.data = chatUsers;
      return pagination;
    });
  } catch (error) {
    throw (error);
  }
};

const getOnlineChatUser = async (data) => {
  try {
    const { agent_id, client_id, client_subdomain } = data;
    let userData = null;
    let userFinalData
    userData = await knexSqlDb.from('chat_user')
      .select([
        'chat_user.*',
        'chat_logs.*'
      ])
      .leftJoin('chat_logs', 'chat_logs.chat_user_id', '=', 'chat_user.chat_user_id')
      .leftJoin('client', 'client.client_id', '=', 'chat_user.client_id')
      .options({ nestTables: true })
      .orderBy('chat_logs.chat_log_id', 'asc')
      .where(qb => {
        // qb.where({ is_online: true })
        if (client_id) {
          qb.where({ "chat_user.client_id": client_id })
        }
        if (client_subdomain) {
          qb.where({ "client.client_subdomain": client_subdomain })
        }
        // if (template_id) {
        //   qb.where({ template_id: template_id })
        // }
      })
    // userData = await knexSqlDb.raw(`SELECT cu.* FROM chatbot_uat.chat_user cu 
    //   inner join template t on t.template_id = cu.template_id
    //   inner join users agent on agent.client_id = t.customer_id
    //   where agent.user_id = ${agent_id} order by chat_user_id desc`)

    return (userData);
  } catch (error) {
    throw (error);
  }
}
module.exports = {
  insertChatUser,
  updateChatUser,
  getChatUser,
  getOnlineChatUser,
  addUpdateChatUser,
  getOnlineChatUserWithPaginationAndSearch
}
