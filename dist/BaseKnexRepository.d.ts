import * as knex from 'knex';
declare class Repository {
    private config;
    private collection;
    constructor(config: any, collection: any);
    private constructTable();
    private logSuccess();
    private logError(err);
    protected constructSchema(table: any): void;
    protected connect(): knex.QueryBuilder;
}
export default Repository;
