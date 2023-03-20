// const userDeviceModel = require(_pathConst.modelsPath.userDevicesModel);
// const coursesModel = require(_pathConst.modelsPath.coursesModel);
const commonHelper = require(_pathConst.filesPath.commonHelper);
// const moment = require('moment');

const insertChannel = async (channelData) => {
  try {
    const { created_by } = channelData;
    let freshChannelData = "";
    channelData.created_by = knexSqlDb.raw(`uuid_to_bin('${created_by}')`)
    await knexSqlDb.into('channels')
      .insert(channelData)
      .then(async function (channelId) {
        if (channelId) {
          freshChannelData = await getChannel({ created_by: created_by })
        }
      });
    return (freshChannelData);
  } catch (error) {
    throw (error);
  }
};
const updateChannel = async (updatedChannelData) => {
  try {
    let updatedChannelDataRes = null;
    if (Object.keys(updatedChannelData).length > 0) {
      const { tester_number, created_by } = updatedChannelData;
      delete updatedChannelData["created_by"];
      delete updatedChannelData["tester_number"];
      await knexSqlDb.from('channels')
        .where({ tester_number: tester_number })
        .update(updatedChannelData)
        .then(async function (isUpdated) {
          if (isUpdated)
            updatedChannelDataRes = await getChannel({ created_by: created_by });
        });
    }
    return updatedChannelDataRes;
  } catch (error) {
    throw (error);
  }
};
const getChannel = async (data) => {
  const { created_by, tester_number } = data;
  try {
    let responseData = null;
    responseData = await knexSqlDb.from('channels')
      .select([
        'channels.*',
        "template.template_name",
        "template.client_id",
        knexSqlDb.raw(`bin_to_uuid(template.template_id) as template_id`),
        knexSqlDb.raw(`bin_to_uuid(channels.created_by) as created_by`)

      ])
      .leftJoin('template', 'template.template_id', '=', 'channels.template_id')
      .where(qb => {
        if (created_by) {
          qb.where("channels.created_by", knexSqlDb.raw(`uuid_to_bin('${created_by}')`))

        }
        if (tester_number) {
          qb.where("channels.tester_number", tester_number)
        }
      })
    return (responseData);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  insertChannel,
  getChannel,
  updateChannel
}