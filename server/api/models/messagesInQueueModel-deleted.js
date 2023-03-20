
const insertMessegesInQueue = async (userData) => {
  try {
    await knexSqlDb.into('messages_in_queue')
      .insert(userData)
    return (true);
  } catch (error) {
    throw (error);
  }
}
const updateMessegesInQueue = async (data) => {
  try {
    const { messageInQueueIds } = data;
    if (Object.keys(data).length > 0) {
      delete data["messageInQueueIds"];
      await knexSqlDb.from('messages_in_queue')
        .whereIn("message_in_queue_id", messageInQueueIds)
        .update(data);
    }
    return true;
  } catch (error) {
    throw (error);
  }
};
const getMessegesInQueue = async (data) => {
  try {
    const { status } = data;
    let messages = null;
    await knexSqlDb.from('messages_in_queue')
      .select([
        '*'
      ])
      .orderBy('message_in_queue_id', 'desc')
      .where(qb => {
        if (status) {
          qb.where({ status: status })
        }
      })
      .limit(12)
      .then(async (msgs) => {
        // let messageInQueueIds = [];
        messages = msgs;
        // await msgs.map(async (m) => {
        //   messageInQueueIds.push(m.message_in_queue_id)
        // })
        // await updateMessegesInQueue({ messageInQueueIds: messageInQueueIds, status: 'Sent' })
      })
    return (messages);
  } catch (error) {
    throw (error);
  }
}

module.exports = {
  insertMessegesInQueue,
  updateMessegesInQueue,
  getMessegesInQueue,
}