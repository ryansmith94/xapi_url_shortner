class Controller {
  private service;

  public constructor(commander, service) {
    this.service = service;
    this.constructCommands(commander);
  }

  public constructCommands(commander) {
    commander
      .command('cu <user_email> <password> <group_id>')
      .description('Create a user')
      .action(this.createUser.bind(this));

    commander
      .command('du <user_id>')
      .description('Delete a user')
      .action(this.deleteUser.bind(this));
  }

  public createUser(email, password, group_id) {
    this.service.createUser(email, password, group_id).then(function (model) {
      console.log(model);
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }

  public deleteUser(id) {
    this.service.deleteUserById(id).then(function (result) {
      console.log('Deleted');
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }
}

export = Controller;