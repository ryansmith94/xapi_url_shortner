import Repository = require('./KnexRepository');
import Service = require('./Service');

export = function(knex_config: any, collection: string): Service {
  var repo = new Repository(knex_config, collection);
  return new Service(repo);
};
