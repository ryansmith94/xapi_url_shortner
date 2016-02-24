import * as q from 'q';
declare class Repository {
    private groups;
    createGroup(group: any): q.Promise<any>;
    getGroupById(id: any): q.Promise<{}>;
    getGroups(): q.Promise<any[]>;
    deleteGroupById(id: any): q.Promise<{}>;
}
export default Repository;
