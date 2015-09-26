var Controller = (function () {
    function Controller(commander, service) {
        this.service = service;
        this.constructCommands(commander);
    }
    Controller.prototype.constructCommands = function (commander) {
        commander
            .command('cg <group_name>')
            .description('Create a group')
            .action(this.createGroup.bind(this));
    };
    Controller.prototype.createGroup = function (group_name) {
        this.service.createGroup(group_name).then(function (model) {
            console.log(model);
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    return Controller;
})();
module.exports = Controller;
//# sourceMappingURL=CommanderController.js.map