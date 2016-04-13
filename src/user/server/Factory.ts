import Repository from './KnexRepository';
import Service from './Service';

export default function(knexConnection, knexCollection): Service {
  var repo = new Repository(knexConnection, knexCollection);
  return new Service(repo);
};
