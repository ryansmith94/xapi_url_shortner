import Repository from './HttpRepository';
import Service from './Service';

export default function(endpoint: string): Service {
    var repo = new Repository(endpoint);
    return new Service(repo);
};
