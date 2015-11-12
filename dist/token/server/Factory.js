var Repository = require('./KnexRepository');
var Service = require('./Service');
module.exports = function (knex_config, collection) {
    var repo = new Repository(knex_config, collection);
    return new Service(repo);
};
//# sourceMappingURL=Factory.js.map