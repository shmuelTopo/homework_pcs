const pool = require('./sqlPool');

async function getUsers(){
  const [rows, fields] = await pool.execute(`
      select id, username,
      case 
          when (last_seen > NOW()) then 'online'
          when (last_seen < CURDATE()) then DATE_FORMAT(last_seen, '%Y-%m-%d')
          else DATE_FORMAT(last_seen,'%H:%i')
      end
      as lastseen 
      from users;
  `);
  return(rows);
}

getUsers();