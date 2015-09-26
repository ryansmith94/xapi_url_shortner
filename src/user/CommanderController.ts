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
  }

  public createUser(email, password, group_id) {
    console.log(email);
    this.service.createUser(email, password, group_id).then(function (model) {
      console.log(model);
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }
}

export = Controller;