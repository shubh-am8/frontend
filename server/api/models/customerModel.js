const { getCustomerDocByCustomerId } = require(_pathConst.modelsPath.customerDocModel);

const insertCustomer = async (customerData, handelCustomerData) => {
  try {
    await knexSqlDb.into('customer')
      .insert(customerData)
      .then(async function (customerId) {
        let insertedCustomerData = await getCustomer({ customer_id: customerId });
        handelCustomerData(insertedCustomerData);
      });
  } catch (error) {
    throw (error);
  }
}

const updateCustomer = async (req,handelPromise) => {
  try {
    const { customer_id, otp } = req;
    let updatedCustomerData = null;
    if (req["customer_id"])
      // deleting customer_id from obj if exists 
      delete req["customer_id"];
    if (Object.keys(req).length > 0) {
      await knexSqlDb.from('customer')
        .where({ customer_id: customer_id })
        .update(req)
        .then(async function (isUpdated) {
          updatedCustomerData = await getCustomerById({ customer_id: customer_id })
        });
    }
    return handelPromise(updatedCustomerData ? updatedCustomerData : false);
  } catch (error) {
    throw (error);
  }
}

const deleteUser = async (deleteUserData) => {
  try {
    let updatedUserData = null;
    if (Object.keys(deleteUserData).length > 0) {
      const { user_id } = deleteUserData
      await knexSqlDb.from('customer')
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

const getCustomer = async (data) => {
  try {
    const { customer_id } = data;
    let userData = null;
    let userFinalData
    userData = await knexSqlDb.from('customer')
      .select([
        'customer.*'
      ])
      .orderBy('customer_id', 'desc')
      .where(qb => {
        if (customer_id) {
          qb.where({ customer_id: customer_id })
        }
        qb.where({ is_deleted: false })
      })
    userFinalData = userData[0];
    return (userFinalData);
  } catch (error) {
    throw (error);
  }
};
const getCustomerById = async (data) => {
  try {
    const { customer_id } = data;
    finalCustomerData = {};
    await knexSqlDb.from('customer')
      .select([
        'customer.*',
        'user.user_name as checked_by_user_name'
      ])
      .leftJoin('user', 'user.user_id', '=', 'customer.customer_ekyc_checked_by_id')

      .where(qb => {
        if (customer_id) {
          qb.where({ "customer.customer_id": customer_id })
        }
        qb.where({ "customer.is_deleted": false })
      }).then(async (customerData) => {
        if (customerData.length) {
          customerData = customerData[0];
          customerData.docs=[];
          let customerDoc = await getCustomerDocByCustomerId({ customer_id: customerData.customer_id });
          customerData.docs = customerDoc;
          finalCustomerData = customerData;
        }
      })
      return (finalCustomerData);
  } catch (error) {
    throw (error);
  }
};
const getAllCustomer = async (data) => {
  try {
    const { pageNumber, pageSize, search } = data;
    const pagination = new Object();
    const limitPerPage = pageSize ? pageSize : 10;
    const page = Math.max(pageNumber ? pageNumber : 1);
    const offset = (page - 1) * limitPerPage;
    return Promise.all([
      await knexSqlDb('customer')
        .select([
          "customer.*",
          'user.user_name as checked_by_user_name'
        ])
        .leftJoin('user', 'user.user_id', '=', 'customer.customer_ekyc_checked_by_id')

        // .select(knexSqlDb.raw('count(*) as total'))
        .where(qb => {
          qb.where({ "customer.is_deleted": false })
          if (search) {
            qb.where('customer_adhar_number', 'like', `%${search}%`)
            qb.orWhere('customer_mobile', 'like', `%${search}%`)
            qb.orWhere('customer_name', 'like', `%${search}%`);
          }
        })
        .orderBy('customer_id', 'desc')
        .limit(limitPerPage)
        .offset(offset)
    ]).then(async ([customers]) => {
      let total = 0
      if (customers.length) {
        total = await knexSqlDb
          .from('customer')
          .count('customer_id as count')
          .where(qb => {
            qb.where({ "customer.is_deleted": false })
            if (search) {
              qb.where('customer_adhar_number', 'like', `%${search}%`)
              qb.orWhere('customer_mobile', 'like', `%${search}%`)
              qb.orWhere('customer_name', 'like', `%${search}%`);
            }
          })
      }
      if (customers.length) {
       let promise = await Promise.all(customers.map(async (c) => {
          c.docs = [];
         await getCustomerDocByCustomerId({ customer_id: c.customer_id })
          .then(docsData=>{
            c.docs = docsData;
          });
        }));
      }
      const count = total[0].count;
      pagination.total = parseInt(count, 10);
      pagination.page_size = limitPerPage;
      pagination.offset = offset;
      pagination.to = offset + customers.length;
      pagination.last_page = Math.ceil(count / limitPerPage);
      pagination.page_number = page;
      pagination.from = offset;
      pagination.data = customers;
      return pagination;
    });
  } catch (error) {
    throw (error);
  }
};
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

// const getAllUsers = async (data) => {
//   try {
//     const { pageNumber, pageSize, search } = data;
//     const pagination = new Object();
//     const limitPerPage = pageSize || 10;
//     const page = Math.max(pageNumber ? pageNumber : 1 || 1, 1);
//     const offset = (page - 1) * limitPerPage;
//     return Promise.all([
//       await knexSqlDb('user')
//         .select([
//           "*",
//         ])
//         .select(knexSqlDb.raw('count(*) as total'))
//         .where(qb => {
//           qb.where({ is_deleted: false })
//           if (search) {
//             qb.where('user_name', 'like', `%${search}%`)
//               .orWhere('user_mobile', 'like', `%${search}%`);
//           }
//         })
//         .orderBy('user_id', 'desc')
//         .limit(limitPerPage)
//         .offset(offset)
//     ]).then(async ([users]) => {
//       let total = 0
//       if (users.length) {
//         total = users[0].total;
//       }
//       const count = total;
//       pagination.total = parseInt(count, 10);
//       pagination.page_size = limitPerPage;
//       pagination.offset = offset;
//       pagination.to = offset + users.length;
//       pagination.last_page = Math.ceil(count / limitPerPage);
//       pagination.page_number = page;
//       pagination.from = offset;
//       pagination.data = users;
//       return pagination;
//     });
//   } catch (error) {
//     throw (error);
//   }
// };





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

//! update kyc status
const updateKycStatus = async (updatedKycStatusData) => {
  try {
    let updatedKycStatusDataRes = null;
    if (Object.keys(updatedKycStatusData).length > 0) {
      const {customer_id } = updatedKycStatusData;
      delete updatedKycStatusData["customer_id"];
      await knexSqlDb.from('customer')
        .where({ customer_id: customer_id })
        .update(updatedKycStatusData)
        .then(async function (isUpdated) {
          if (isUpdated)
            updatedKycStatusDataRes = isUpdated;
        });
    }
    return updatedKycStatusDataRes;
  } catch (error) {
    throw (error);
  }
};

module.exports = {
  insertCustomer,
  getCustomer,
  isUserExists,
  getAllCustomer,
  deleteUser,
  getCustomerById,
  updateKycStatus,
  updateCustomer
}