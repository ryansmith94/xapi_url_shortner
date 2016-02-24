import BaseService from '../BaseService';
import * as q from 'q';
declare class Service extends BaseService {
    protected repo: any;
    constructor(repository: any);
    validateLink(long_url: string, custom_url?: string): q.Promise<{}>;
    protected idToShortUrl(value: string): string;
    private shortUrlToId(value);
    protected getCustomLinkById(id: any): any;
    private getCustomLinkByShortUrl(short_url);
    protected getLinkByShortUrl(short_url: string): any;
    protected getLinkById(id: any): any;
}
export default Service;
