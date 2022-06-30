const bcrypt = require('bcrypt');
const pool = require('./sqlPool');
const getDatetime = require('./datetime');

module.exports.getUsers = async () => {
  const [rows, fields] = await pool.execute(`
      select id, username,
      case 
          when (lastseen > NOW()) then 'Online'
          else lastseen
      end
      from \`users\`
      as lastseen;
  `);
  return rows;
}

module.exports.getConversations = async (userId) => {
  const [rows, fields ] = await pool.execute(`
    select c.id, c.user_id_a as userIdA, u.username as usernameA, 
      c.user_id_b as userIdB, ub.username as usernameB, 
      c.group_id as groupId, g.name as groupName, 
      c.last_message_datetime as lastMessageDatetime
    from \`conversations\` c
    left join \`users\` u
    on c.user_id_a = u.id
    left join \`users\` ub
    on c.user_id_b = ub.id
    left join \`groups\` g
    on c.group_id = g.id
    WHERE c.user_id_a = ? OR c.user_id_b = ?
    ORDER BY c.last_message_datetime DESC
  `,[userId, userId]);

  return rows;
}

module.exports.login = async (username, password, method) => {
  if (!username || !password || !method) {
    throw new Error('Please provide all fields');
  }

  let user;
  if(method === 'login') {
    user = await checkUser(username, password);
  } else if(method === 'signup') {
    user = await addUser(username, password);
  }
  return user;
};

module.exports.isUser = async (username) => {
    const [ rows ] = await pool.execute(`SELECT id from \`users\` WHERE username = ?`, [username]);
    return rows.length === 1;
}

module.exports.getUsername = async (userId) => {
  const [ rows ] = await pool.execute(`SELECT username from \`users\` WHERE id = ?`, [userId]);
  return rows.length === 1 ? rows[0].username : undefined;
}

module.exports.updateLastSeen = async function(id, next) {
  const datetime = getDatetime();
  try {
    await pool.execute(`UPDATE \`users\` SET lastseen=? WHERE id = ?`, [datetime, id])
    return datetime;
  } catch(error) {
    return { error: error };
  }
}

module.exports.setOnline = async function(id, next) {
  await pool.execute(`UPDATE \`users\` SET lastseen= '9999-12-31 23:59:59' WHERE id = ?`, [id]);
}

async function addUser(username, password) {
  const datetime = '9999-12-31 23:59:59';
  try {
    let newUser;
    const hash = await bcrypt.hash(password, 10);
    const [ resutls ] = await pool.query(`INSERT INTO \`users\` (username, psw_hash, lastseen) VALUES (?, ?, ?)`,[username, hash, datetime]);
    ('after');
    return  {
      id: resutls.insertId,
      username,
      lastseen: datetime
    }
  } catch(error) {
    error.message = error.code === 'ER_DUP_ENTRY' ? 'Username already exists' : error.message;
    (error.message);
    throw error;
  }
}

async function checkUser(username, password) {
  const [ rows ] = await pool.execute(`SELECT * from \`users\` WHERE username = ?`, [username]);
    
  if(!rows.length){
    const err = new Error('Invalid username or password');
    err.statusCode = 401;
    throw err;
  }

  const user = Object.assign({}, rows[0]);
  delete user.psw_hash;

  const match = await bcrypt.compare(password, rows[0].psw_hash);
    
  if(!match) {
    const err = new Error('Invalid username or password');
    err.statusCode = 401;
    throw err;
  }

  return user;
}

