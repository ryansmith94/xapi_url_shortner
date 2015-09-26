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
    };
    Controller.prototype.createUser = function (email, password, group_id) {
        console.log(email);
        this.service.createUser(email, password, group_id).then(function (model) {
            console.log(model);
        }, function (err) {
            console.error(err.stack);
        }).then(process.exit, process.exit);
    };
    return Controller;
})();
module.exports = Controller;
//# sourceMappingURL=CommanderController.js.map