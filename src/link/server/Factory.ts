import Repository from './KnexRepository';
import Service from './Service';

export default function(knex_config: any, collection: string): Service {
  var repo = new Repository(knex_config, collection);
  return new Service(repo);
};
