import BaseService from '../BaseService';
import * as q from 'q';
declare class Service extends BaseService {
    private group_service;
    setGroupService(group_service: any): void;
    private validateGroupId(group_id);
    private validateCreateUser(email, password, group_id);
    private validateUser(email, group_id);
    createUser(email: string, password: string, group_id: any): q.Promise<{}>;
    createUserWithUser(email: string, password: string, user_id: number): any;
    deleteUserById(id: any): any;
    getUserByEmailAndPassword(email: string, password: string): any;
    getUserById(id: any): any;
    getUsersByGroupId(group_id: any): any;
    deleteUsersByGroupId(group_id: any): any;
    private getUserByEmail(email);
    createAdmin(id: any): any;
}
export default Service;
