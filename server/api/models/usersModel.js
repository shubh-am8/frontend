const commonHelper = require(_pathConst.filesPath.commonHelper);
const moment = require('moment');

const insertUser = async (userData) => {
  try {
    // const { user_email } = userData;
    // userData.user_id = knexSqlDb.raw(`uuid_to_bin(uuid())`);
    let insertedUserData = "";
    await knexSqlDb.into('user')
      .insert(userData)
      // .then(async function (user_id) {
      //   insertedUserData = await getUsersByRole(role, created_by);
      // });
    return (insertedUserData);
  } catch (error) {
    throw (error);
  }
}
const updateUser = async (updatedUserData) => {
  try {
    let updatedUserDataRes = null;
    if (Object.keys(updatedUserData).length > 0) {
      const { user_id, role, created_by } = updatedUserData;
      delete updatedUserData["user_id"];
      await knexSqlDb.from('user')
        .where({ user_id: user_id })
        .update(updatedUserData)
        .then(async function (isUpdated) {
          if (isUpdated)
            updatedUserDataRes = isUpdated;
        });
    }
    return updatedUserDataRes;
  } catch (error) {
    throw (error);
  }
};
const deleteUser = async (deleteUserData) => {
  try {
    let updatedUserData = null;
    if (Object.keys(deleteUserData).length > 0) {
      const { user_id } = deleteUserData
      await knexSqlDb.from('user')
        .where('user_id', user_id)
        .update({ is_deleted: true })
        .then(async function (isDeleted) {
          if (isDeleted)
            updatedUserData = await getUsersByRole("agent", "");
        });
    }
    return updatedUserData;
  } catch (error) {
    throw (error);
  }
};
// const updateUser = async (userData) => {
//   try {
//     const { user_id, user_fname, user_lname } = userData;
//     let updatedUserData = null;
//     if (user_fname) {
//       userData.user_fname = commonHelper.capFirstLetterrOfStr(user_fname);
//     } else {
//       delete userData["user_fname"];
//     }
//     if (user_lname) {
//       userData.user_lname = commonHelper.capFirstLetterrOfStr(user_lname);
//     } else {
//       delete userData["user_lname"];
//     }
//     if (userData["user_id"])
//       // deleting user_id from obj if exists 
//       delete userData["user_id"];
//     if (Object.keys(userData).length > 0) {
//       await knexSqlDb.from('users')
//         .where({ user_id: knexSqlDb.raw(`uuid_to_bin('${user_id}')`) })
//         .update(userData)
//         .then(async function (isUpdated) {
//           updatedUserData = await getUser({ user_id: user_id })
//         });
//     }
//     return (updatedUserData);
//   } catch (error) {
//     throw (error);
//   }
// }
const getUser = async (data) => {
  try {
    const { user_id, user_email, user_role, user_mobile } = data;
    let userData = null;
    let userFinalData
    userData = await knexSqlDb.from('user')
      .select([
        '*'
      ])
      .orderBy('user_id', 'desc')
      .where(qb => {
        if (user_id) {
          qb.where({ user_id: user_id })
        }
        if (user_email) {
          qb.where({ user_email: user_email })
        }
        if (user_role) {
          qb.where({ user_role: user_role })
        }
        if (user_mobile) {
          qb.where({ user_mobile: user_mobile })
        }
        qb.where({ is_deleted: false })
      })
    userFinalData = userData[0];
    return (userFinalData);
  } catch (error) {
    throw (error);
  }
}
// const getAllUsers = async () => {
//   try {
//     let userFinalData = null;
//     userFinalData = await knexSqlDb.from('user')
//       .select([
//         '*'
//       ])
//       .orderBy('user_id', 'desc')
//       .where(qb => {
//         qb.where({ is_deleted: false })
//       })
//     return (userFinalData);
//   } catch (error) {
//     throw (error);
//   }
// };

const getAllUsers = async (data) => {
  try {
    const { pageNumber, pageSize, search } = data;
    // const pagination = new Object();
    // const limitPerPage = pageSize || 10;
    // const page = Math.max(pageNumber || 1, 1);
    // const offset = (page - 1) * limitPerPage;




    const pagination = new Object();
     const limitPerPage = pageSize || 50;// Number.MAX_SAFE_INTEGER;
    const page = Math.max(pageNumber || 1, 1);
    const offset = (page - 1) * limitPerPage;
    return Promise.all([
      await knexSqlDb
        .from('user')
        .select(['*'])
        .where(qb => {
          qb.where({ is_deleted: false })
          if (search) {
            qb.where('user_name', 'like', `%${search}%`)
            qb.orWhere('user_mobile', 'like', `%${search}%`);
          }
        })
        .limit(limitPerPage)
        .offset(offset)
        .orderBy('user_id', 'desc')
    ]).then(async ([users]) => {
      let total = 0
      if (users.length) {
         total =  await knexSqlDb
         .from('user')
         .count('user_id as count')
         .where(qb => {
           qb.where({ is_deleted: false })
           if (search) {
             qb.where('user_name', 'like', `%${search}%`)
             qb.orWhere('user_mobile', 'like', `%${search}%`);
           }
         })
       }
       const count = total[0].count;
       pagination.total = parseInt(count, 10);
       pagination.page_size = limitPerPage;
       pagination.offset = offset;
       pagination.to = offset + users.length;
       pagination.last_page = Math.ceil(count / limitPerPage);
       pagination.page_number = page;
       pagination.from = offset;
       pagination.data = users;
       return pagination;
     });
  } catch (error) {
    throw (error);
  }
};





const isUserExists = async (userMobile) => {
  try {
    let data = await knexSqlDb.from('user')
      .select('user_id')
      .where({ user_mobile: userMobile })
    if (data.length) {
      return data[0];
    } else {
      return (false);
    }
  } catch (error) {
    throw (error);
  }
}

module.exports = {
  insertUser,
  updateUser,
  getUser,
  isUserExists,
  getAllUsers,
  deleteUser,
}