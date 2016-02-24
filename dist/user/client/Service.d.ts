import BaseService from '../BaseService';
import * as q from 'q';
declare class Service extends BaseService {
    createUser(email: string, password: string): q.Promise<{}>;
}
export default Service;
