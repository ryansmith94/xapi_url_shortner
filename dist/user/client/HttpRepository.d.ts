import BaseRepository from '../../BaseHttpRepository';
import * as q from 'q';
declare class Repository extends BaseRepository {
    private token_value;
    private users;
    constructor(endpoint: any, token_value: any);
    protected connect(opts: any): q.Promise<{}>;
    createUser(user: any): q.Promise<{}>;
}
export default Repository;
