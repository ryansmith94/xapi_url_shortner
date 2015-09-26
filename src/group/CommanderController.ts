class Controller {
  private service;

  public constructor(commander, service) {
    this.service = service;
    this.constructCommands(commander);
  }

  public constructCommands(commander) {
    commander
      .command('cg <group_name>')
      .description('Create a group')
      .action(this.createGroup.bind(this));
  }

  public createGroup(group_name) {
    this.service.createGroup(group_name).then(function (model) {
      console.log(model);
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }
}

export = Controller;