declare class Controller {
    private service;
    constructor(app: any, service: any);
    private constructRoutes(app);
    createToken(req: any, res: any): void;
}
export default Controller;
