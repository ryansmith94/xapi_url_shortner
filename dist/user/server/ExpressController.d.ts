declare class Controller {
    private service;
    private token_service;
    constructor(app: any, service: any, token_service: any);
    private constructRoutes(app);
    createUser(req: any, res: any): void;
}
export default Controller;
