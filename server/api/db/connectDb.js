const { dbOptions } = require(_pathConst.filesPath.knexFile);
var dbContext = {
  knex: null,
  getContext: function () {
    console.log(dbOptions)
    knex = require('knex')(dbOptions);
    console.log('Db connection initiated!')
    return knex;
  },
  destroyContext: function () {
    knex.destroy();
    console.log("Db connection distroyed!");
  }
};

module.exports = dbContext;