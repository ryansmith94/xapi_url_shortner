declare class Controller {
    private service;
    constructor(commander: any, service: any);
    constructCommands(commander: any): void;
    createUser(email: any, password: any, group_id: any): void;
    deleteUser(id: any): void;
    getUsersByGroupId(group_id: any): void;
    createAdmin(id: any): void;
}
export default Controller;
