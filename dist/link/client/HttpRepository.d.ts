import BaseRepository from '../../BaseHttpRepository';
import * as q from 'q';
declare class Repository extends BaseRepository {
    private token_value;
    private links;
    constructor(endpoint: any, token_value: any);
    protected connect(opts: any): q.Promise<{}>;
    createLink(link: any): q.Promise<{}>;
    updateLink(updated_link: any): q.Promise<{}>;
    getLinks(): any;
    getLinkById(id: any): q.Promise<{}>;
    getCustomLinkByShortUrl(short_url: string): q.Promise<{}>;
    deleteLinkById(id: any): q.Promise<{}>;
    changeLongUrl(id: any, long_url: any): q.Promise<void>;
}
export default Repository;
