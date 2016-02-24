import * as q from 'q';
declare class Repository {
    private config;
    constructor(config: any);
    private connect();
    createStatement(statement: any): q.Promise<{}>;
}
export default Repository;
