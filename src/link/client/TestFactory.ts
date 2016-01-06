import Repository from '../TestRepository';
import Service from './Service';

export default function(): Service {
    var repo = new Repository();
    return new Service(repo);
};
