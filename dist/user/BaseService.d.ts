import BaseService from '../BaseService';
import * as q from 'q';
declare class Service extends BaseService {
    protected repo: any;
    constructor(repository: any);
    protected validateEmail(email: string): q.Promise<{}>;
}
export default Service;
