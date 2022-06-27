const { user } = require('./sqlInfo.secret');
const pool = require('./sqlPool');
const getDatetime = require('./datetime');
const messagesTypes = ['speech', 'login'];
const userDb = require('./usersDb');

module.exports.getUsersForGroup = async (groupId) => {
  const [ rows ] = await pool.execute(`
    SELECT ug.user_id as userid, u.username
    FROM users_groups ug
    LEFT JOIN groups g
    ON ug.group_id = g.id
    LEFT JOIN users u
    ON u.id = ug.user_id
    WHERE g.id = ?`,
    [groupId])
  
  return rows;
};

module.exports.newGroupMessage = async (userId, groupId, text, type = 'speech') => {
  if (!userId || !text) {
    throw new Error('Userid and message text are required');
  }

  if(!messagesTypes.includes(type)){
    throw new Error('Message type is incorrect')
  }
  const time = getDatetime();

  const [ results ] = await pool.execute(
    'INSERT INTO group_messages (group_id, user_id, text, time, type) VALUES (?, ?, ?, ?, ?)',
    [groupId, userId, text, time, type])

  await pool.execute(
    `UPDATE conversations SET last_message_datetime = ?
    WHERE group_id = ?`,
    [time, groupId])

  const username = await userDb.getUsername(userId);

  return {
    id: results.insertId,
    text,
    time: new Date(time).toString(),
    type,
    userId,
    username,
    groupId
  };

};

module.exports.getGroupsIdforUser = async (userId) => {
  const [rows, fields ] = await pool.execute(`
    select group_id from conversations
    WHERE user_id_a = ? and group_id is not null
  `,[userId]);
  return rows.map(r => r.group_id);
}

module.exports.getGroupMessages = async (groupId) => {
  const [ rows ] = await pool.query(`
    SELECT m.id, m.text, m.time, m.type, m.user_id as userId, u.username
    FROM group_messages m
    LEFT JOIN users u
    ON m.user_id = u.id
    WHERE group_id = ?
    ORDER BY m.time DESC, m.id DESC`, [groupId]);
  return rows;
}

module.exports.addUserToGroup = async (userId, groupId, next) => {
  if(!userId || !groupId) {
    throw new Error('please provide userid and groupid')
  }

  await pool.execute(`
    INSERT INTO users_groups(user_id, group_id) VALUES (?, ?)`
    ,[userId, groupId])
}