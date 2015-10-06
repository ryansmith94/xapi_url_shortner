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
        commander
            .command('lg')
            .description('List all groups')
            .action(this.getGroups.bind(this));
    };
    Controller.prototype.createGroup = function (group_name) {
        this.service.createGroup(group_name).then(function (model) {
            console.log(model);
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    Controller.prototype.getGroups = function () {
        this.service.getGroups().then(function (models) {
            console.log(models.map(function (model) {
                return model.id + ' - ' + model.name;
            }).join('\n'));
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    return Controller;
})();
module.exports = Controller;
//# sourceMappingURL=CommanderController.js.map