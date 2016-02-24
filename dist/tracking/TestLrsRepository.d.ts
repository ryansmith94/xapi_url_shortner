import * as q from 'q';
declare class Repository {
    createStatement(statement: any): q.Promise<any>;
}
export default Repository;
