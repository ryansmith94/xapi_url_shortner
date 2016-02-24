declare class Controller {
    private service;
    private token_service;
    constructor(app: any, service: any, token_service: any);
    private constructRoutes(app);
    createLink(req: any, res: any): void;
    visitLink(req: any, res: any): void;
    getLinks(req: any, res: any): void;
    deleteLink(req: any, res: any): void;
    changeLongUrl(req: any, res: any): void;
}
export default Controller;
