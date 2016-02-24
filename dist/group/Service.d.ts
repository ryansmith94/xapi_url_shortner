import BaseService from '../BaseService';
import * as q from 'q';
declare class Service extends BaseService {
    private repo;
    private user_service;
    private link_service;
    constructor(repository: any);
    setUserService(user_service: any): void;
    setLinkService(link_service: any): void;
    createGroup(name: string, verb_id?: string, verb_lang?: string, verb_display?: string): any;
    getGroupById(id: any): any;
    getGroups(): any;
    deleteGroupById(id: any): q.Promise<boolean>;
}
export default Service;
