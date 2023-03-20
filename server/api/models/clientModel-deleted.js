const getClientByApiKey = async (data) => {
  try {
    const { client_api_key } = data;
    let clientData = await knexSqlDb.from('client')
      .select([
        '*',
        knexSqlDb.raw(`bin_to_uuid(client_id) as client_id`),
        knexSqlDb.raw(`bin_to_uuid(created_by) as created_by`),
      ])
      .where(qb => {
        qb.where({ client_api_key: client_api_key })
      });
    return (clientData.length ? clientData[0] : false);
  } catch (error) {
    throw (error);
  }
};
const getClients = async (data) => {
  try {
    const { client_id } = data;
    let clientData = await knexSqlDb.from('client')
      .select([
        'client.*',
        knexSqlDb.raw(`bin_to_uuid(template.template_id) as template_id`),
        "template.template_name"
      ])
      .leftJoin('template', 'template.client_id', '=', 'client.client_id')
      .where(qb => {
        // qb.where({ is_deleted: false })
        if (client_id) {
          qb.where({ "client.client_id": client_id })
        }
        // qb.where({ status: 'Active' })
      });

      
    return (clientData.length ? clientData[0] : false);
  } catch (error) {
    throw (error);
  }
};
module.exports = {
  getClientByApiKey,
  getClients
}