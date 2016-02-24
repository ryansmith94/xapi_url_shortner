import * as q from 'q';
declare class Repository {
    private users;
    createUser(user: any): q.Promise<any>;
    getUserByEmail(email: string): q.Promise<{}>;
    getUserById(id: any): q.Promise<{}>;
    deleteUserById(id: any): q.Promise<{}>;
    getUsersByGroupId(group_id: any): q.Promise<{}>;
    deleteUsersByGroupId(group_id: any): q.Promise<{}>;
    updateUserById(id: any, user: any): q.Promise<{}>;
}
export default Repository;
