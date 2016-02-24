import * as q from 'q';
declare class Repository {
    private tokens;
    createToken(token_request: any): q.Promise<{
        id: number;
        value: string;
        user_id: any;
    }>;
}
export default Repository;
