const pool = require('./sqlPool');
const getDatetime = require('./datetime');
const messagesTypes = ['speech', 'login'];
const userDb = require('./usersDb');
const { get } = require('jquery');

module.exports.getUsersForGroup = async (groupId) => {
  const [ rows ] = await pool.execute(`
    SELECT ug.user_id as userid, u.username
    FROM \`users_groups\` ug
    LEFT JOIN \`groups\` g
    ON ug.group_id = g.id
    LEFT JOIN \`users\` u
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
  const datetime = getDatetime();

  const [ results ] = await pool.execute(
    `INSERT INTO \`group_messages\` (group_id, user_id, text, datetime, type) VALUES (?, ?, ?, ?, ?)`,
    [groupId, userId, text, datetime, type])

  await pool.execute(
    `UPDATE \`conversations\` SET last_message_datetime = ?
    WHERE group_id = ?`,
    [datetime, groupId])

  const username = await userDb.getUsername(userId);

  return {
    id: results.insertId,
    text,
    datetime: new Date(datetime).toString(),
    type,
    userId,
    username,
    groupId
  };

};

module.exports.getGroupsIdforUser = async (userId) => {
  const [rows, fields ] = await pool.execute(`
    select group_id from \`conversations\`
    WHERE user_id_a = ? and group_id is not null
  `,[userId]);
  return rows.map(r => r.group_id);
}

module.exports.getGroupMessages = async (groupId) => {
  const [ rows ] = await pool.query(`
    SELECT gm.id, gm.text, gm.datetime, gm.type, gm.user_id as userId, u.username
    FROM \`group_messages\` gm
    LEFT JOIN \`users\` u
    ON gm.user_id = u.id
    WHERE group_id = ?
    ORDER BY gm.datetime DESC, gm.id DESC`, [groupId]);
  return rows;
}

module.exports.addUserToGroup = async (userId, groupId) => {
  if(!userId || !groupId) {
    throw new Error('please provide userid and groupid')
  }

  await pool.execute(`
    INSERT INTO \`users_groups\`(user_id, group_id) VALUES (?, ?)`
    ,[userId, groupId])

  const datetime = getDatetime();

  await pool.execute(`
    INSERT INTO \`conversations\`(user_id_a, group_id, last_message_datetime) VALUES(?, ?, ?)
  `, [userId, groupId, datetime]);

}

module.exports.createNewGroup = async (groupName, ownerUserId)=> {
  const ownerUsername = await userDb.getUsername(ownerUserId);
  if(!ownerUsername) {
    throw new Error('owner id doesn\'t exists');
  }
  
  const [resutls ] = await pool.execute(`
    INSERT INTO \`groups\`(name, owner_user_id) VALUES (?, ?)`
    ,[groupName, ownerUserId])

  await this.addUserToGroup(ownerUserId, resutls.insertId);
  await this.newGroupMessage(ownerUserId, resutls.insertId, `group was created by ${ownerUsername}`, 'login')
  
  return {
    name: groupName,
    ownerUserId,
    id: resutls.insertId
  }

}