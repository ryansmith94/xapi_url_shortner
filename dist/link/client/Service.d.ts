import BaseService from '../BaseService';
declare class Service extends BaseService {
    constructor(repository: any);
    createLink(long_url: string, custom_url?: string): Q.Promise<{}>;
    getLinks(): any;
    deleteLinkById(id: any): any;
    changeLongUrl(id: number, long_url: string): Q.Promise<any>;
}
export default Service;
