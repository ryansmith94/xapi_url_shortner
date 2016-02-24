import * as q from 'q';
declare class Repository {
    constructor();
    getTitle(url: any): q.Promise<{}>;
}
export default Repository;
