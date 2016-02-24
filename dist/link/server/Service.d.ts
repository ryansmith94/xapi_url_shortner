import BaseService from '../BaseService';
import * as q from 'q';
declare class Service extends BaseService {
    private tracking_service;
    private user_service;
    private group_service;
    setTrackingService(tracking_service: any): void;
    setUserService(user_service: any): void;
    setGroupService(group_service: any): void;
    trackLink(short_url: string, tracking_options?: any): any;
    createLink(long_url: string, user_id: number, custom_url?: string): q.Promise<any>;
    getLinks(user_id: number): any;
    deleteLinkById(id: any, user_id: number): q.Promise<boolean>;
    deleteLinksByGroupId(group_id: number): any;
    changeLongUrl(id: number, long_url: string, user_id: number): q.Promise<any>;
}
export default Service;
