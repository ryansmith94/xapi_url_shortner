import * as q from 'q';
declare class Repository {
    protected endpoint: any;
    constructor(endpoint: any);
    protected connect(opts: any): q.Promise<{}>;
    protected filterModels(models: any, filterFn: any): q.Promise<{}>;
    protected deleteModel(models: any, filterFn: any): q.Promise<any>;
}
export default Repository;
