var Controller = (function () {
    function Controller(commander, service) {
        this.service = service;
        this.constructCommands(commander);
    }
    Controller.prototype.constructCommands = function (commander) {
        commander
            .command('cu <user_email> <password> <group_id>')
            .description('Create a user')
            .action(this.createUser.bind(this));
        commander
            .command('du <user_id>')
            .description('Delete a user')
            .action(this.deleteUser.bind(this));
        commander
            .command('lu <group_id>')
            .description('List the users in a group')
            .action(this.getUsersByGroupId.bind(this));
    };
    Controller.prototype.createUser = function (email, password, group_id) {
        this.service.createUser(email, password, group_id).then(function (model) {
            console.log(model);
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    Controller.prototype.deleteUser = function (id) {
        this.service.deleteUserById(id).then(function (result) {
            console.log('Deleted');
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    Controller.prototype.getUsersByGroupId = function (group_id) {
        this.service.getUsersByGroupId(group_id).then(function (models) {
            console.log(models);
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    return Controller;
})();
module.exports = Controller;
//# sourceMappingURL=CommanderController.js.map