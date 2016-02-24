import * as q from 'q';
declare class Repository {
    private tokens;
    createToken(token: any): q.Promise<any>;
    getTokenByValue(token_value: string): q.Promise<{}>;
}
export default Repository;
