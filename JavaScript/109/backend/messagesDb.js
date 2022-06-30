const pool = require('./sqlPool');
const getDatetime = require('./datetime');
const messagesTypes = ['speech'];
const userDb = require('./usersDb');

module.exports.newPrivateMessage = async (fromUserId, toUserId, text, type = 'speech') => {
  (fromUserId, toUserId, text, type);
  if (!fromUserId || !toUserId || !text) {
    throw new Error('Userid and message text are required');
  }

  if(!messagesTypes.includes(type)){
    throw new Error('Message type is incorrect')
  }
  
  const datetime = getDatetime();

  const [ results ] = await pool.execute(
    `INSERT INTO \`pm_messages\` (from_user_id, to_user_id, text, datetime, type) VALUES (?, ?, ?, ?, ?)`,
    [fromUserId, toUserId, text, datetime, type])

  await pool.execute(
    `UPDATE \`conversations\` SET last_message_datetime = ?
      WHERE user_id_a = ? AND user_id_b = ? 
      OR user_id_b = ? AND user_id_a = ?;
    `, [datetime, fromUserId, toUserId, toUserId, fromUserId])

    const fromUsername = await userDb.getUsername(fromUserId);

  return {
    fromUserId,
    fromUsername,
    id: results.insertId,
    text,
    datetime: datetime,
    toUserId,
    type: "speech"
  }

};

module.exports.firstPrivateMessage = async (fromUserId, toUserId, firstMessage, type = 'speech') => {
  const message = await this.newPrivateMessage(fromUserId, toUserId, firstMessage, type);
  const [ results ] = await pool.execute(
    `INSERT INTO \`conversations\` user_id_a, user_id_b, last_message_datetime) VALUES (?, ?, ?)`,
    [fromUserId, toUserId, message.datetime])

  return message;
}

module.exports.getPmMessages = async (userId, userIdB) => {
  const [ rows ] = await pool.query(`
    SELECT pm.id, pm.from_user_id as fromUserId, u.username as fromUsername,
	    pm.to_user_id as toUserId, ub.username as toUsername,
      pm.text, pm.type, pm.datetime
    FROM \`pm_messages\` pm
    LEFT JOIN \`users\` u
    ON u.id = pm.from_user_id
    LEFT JOIN \`users\` ub
    ON ub.id = pm.to_user_id
    WHERE pm.from_user_id = ? AND pm.to_user_id = ? 
    OR pm.from_user_id = ? AND pm.to_user_id = ?
    ORDER BY pm.datetime DESC, pm.id DESC;`
    
    ,[userId, userIdB, userIdB, userId]);
  return rows;
}