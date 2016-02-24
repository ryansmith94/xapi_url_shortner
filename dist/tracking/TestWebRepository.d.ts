import * as q from 'q';
declare class Repository {
    getTitle(url: any): q.Promise<any>;
}
export default Repository;
