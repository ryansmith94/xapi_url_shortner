import * as q from 'q';
declare class Repository {
    private links;
    createLink(link: any): q.Promise<any>;
    updateLink(link: any): q.Promise<{}>;
    getLinkById(id: any): q.Promise<{}>;
    getCustomLinkByShortUrl(short_url: string): q.Promise<{}>;
    getLinks(): q.Promise<any[]>;
    getLinksByGroupId(group_id: any): q.Promise<any[]>;
    deleteLinkById(id: any): q.Promise<{}>;
    deleteLinksByGroupId(group_id: any): q.Promise<{}>;
    changeLongUrl(id: any, long_url: any): q.Promise<any>;
}
export default Repository;
