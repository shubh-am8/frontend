const commonHelper = require(_pathConst.filesPath.commonHelper);
const moment = require('moment');

const insertCustomerDoc = async (customerData,customerId) => {
  try {
    console.log("customerData  ==> ", customerData)
    console.log("customerId  ==> ", customerId)
    if(customerId){
      await knexSqlDb.into('customer_doc').delete().where("customer_id", customerId);
      if (!customerData.length) return;
      await knexSqlDb.into('customer_doc')
        .insert(customerData)
        .then(async function (customerDocId) {
          console.log("nsert customer doc res ==> ", customerDocId)
          // let insertedCustomerData = await getCustomer({ customer_id: customerId });
          // handelCustomerData(insertedCustomerData);
        });
    }
  } catch (error) {
    throw (error);
  }
};

const getCustomerDocByCustomerId = async (data) => {
  try {
    const { customer_id } = data;
    let customerDocData = await knexSqlDb.from('customer_doc')
      .select([
        '*'
      ])
      .where(qb => {
        if (customer_id) {
          qb.where({ "customer_id": customer_id })
        }
      })
    return (customerDocData);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  insertCustomerDoc,
  getCustomerDocByCustomerId,
  // getCustomer,
  // isUserExists,
  // getAllUsers,
  // deleteUser,
}