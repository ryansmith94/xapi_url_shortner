import Repository from './HttpRepository';
import Service from './Service';

export default function(endpoint: string, token_value: string): Service {
    var repo = new Repository(endpoint, token_value);
    return new Service(repo);
};
