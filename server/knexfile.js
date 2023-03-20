require('dotenv').config({ path: '.env' });
// let tt = require(_pathConst.filesPath.config);
const { db: { client, database, host, migrations, password, port, user } } = require(_pathConst.filesPath.config);
module.exports = {
  dbOptions: {
    client: client,
    connection: {
      host: host,
      user: user,
      password: password,
      database: database,
      port: port,
      charset:'utf8mb4'
    },
    migrations: migrations,
    pool: {}
  }
};


