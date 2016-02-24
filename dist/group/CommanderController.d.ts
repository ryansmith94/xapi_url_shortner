declare class Controller {
    private service;
    constructor(commander: any, service: any);
    private constructCommands(commander);
    createGroup(group_name: any, command: any): void;
    getGroups(): void;
    deleteGroupById(id: any): void;
}
export default Controller;
