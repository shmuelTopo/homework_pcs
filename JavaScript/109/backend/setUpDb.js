//Comiunicate with Db
const usersDb = require('./usersDb');
const messageDb = require('./messagesDb');
const groupDb = require('./groupsDb');
const promptly = require('promptly');

module.exports = async (pool) => {

  if(process.argv[2] === 'reset') {
    const areYouSure = await promptly.prompt('Warning!! Are you sure? ');

    if(areYouSure.toLowerCase() !== 'y' && areYouSure.toLowerCase() !== 'yes') {
      return;
    }

    const password = await promptly.password('Type a password: ', { replace: '*' , trim: true});
     if(password !== process.env.RESET_DATABASE_PASSWORD) {
      console.log('wrong password');
      return;
    }

    console.log('deleting database');
    
    await pool.execute(`SET FOREIGN_KEY_CHECKS=0;`)

    await pool.execute(`
      DROP TABLE IF EXISTS 
        \`users\`, \`groups\`, \`groups_managers\`,
        \`users_groups\`, \`conversations\`, 
        \`group_messages\`, \`pm_messages\`;
    `)

    await pool.execute(`SET FOREIGN_KEY_CHECKS=0;`)
  }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`users\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(20) NOT NULL,
      psw_hash VARCHAR(256) NOT NULL,
      lastseen DATETIME NOT NULL,
      UNIQUE KEY (username)
    )`
  );

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`groups\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      owner_user_id INT, 
      FOREIGN KEY (owner_user_id) REFERENCES \`users\`(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
    )`
  );

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`groups_managers\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      group_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES \`users\`(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      FOREIGN KEY (group_id) REFERENCES \`groups\`(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )`
  );

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`users_groups\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      group_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES \`users\`(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      FOREIGN KEY (group_id) REFERENCES \`groups\`(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
    )`
  );

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`conversations\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id_a INT,
      user_id_b INT,
      group_id INT,
      last_message_datetime DATETIME NOT NULL,

      FOREIGN KEY (user_id_a) REFERENCES \`users\`(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
      FOREIGN KEY (user_id_b) REFERENCES \`users\`(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
      FOREIGN KEY (group_id) REFERENCES \`groups\`(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
    )`
  );

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`pm_messages\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      from_user_id INT,
      to_user_id INT,
      text TEXT NOT NULL,
      datetime DATETIME NOT NULL,
      type VARCHAR(10) NOT NULL,

      FOREIGN KEY (from_user_id) REFERENCES \`users\`(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
      FOREIGN KEY (to_user_id) REFERENCES \`users\`(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
    )`
  );

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`group_messages\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      group_id INT NOT NULL,
      user_id INT,
      text TEXT NOT NULL,
      datetime DATETIME NOT NULL,
      type VARCHAR(10) NOT NULL,

      FOREIGN KEY (group_id) REFERENCES \`groups\`(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT,
      FOREIGN KEY (user_id) REFERENCES \`users\`(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
    )`
  );

  try {
    const users = await usersDb.getUsers();
    if(!users.length) {
      const ownerUsername = process.env.OWNER_USERNAME;
      const ownerPassword = process.env.OWNER_PASSWORD;
      const user = await usersDb.login(ownerUsername, ownerPassword, 'signup');
      const group = await groupDb.createNewGroup('Public Chat', user.id);
    }
  } catch(err) {
    console.error('new group error', err.message);
  }
}