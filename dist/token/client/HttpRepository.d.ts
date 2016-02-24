import BaseRepository from '../../BaseHttpRepository';
import * as q from 'q';
declare class Repository extends BaseRepository {
    private tokens;
    constructor(endpoint: any);
    createToken(token: any): q.Promise<{}>;
    getTokenByValue(value: string): q.Promise<{}>;
}
export default Repository;
