import BaseRepository from '../../BaseKnexRepository';
declare class Repository extends BaseRepository {
    constructor(config: any, collection: any);
    protected constructSchema(table: any): void;
    createToken(token: any): Promise<{
        id: any;
        value: any;
        user_id: any;
        expiry: any;
    }>;
    getTokenByValue(value: string): Promise<any>;
}
export default Repository;
