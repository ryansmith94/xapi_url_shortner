class Controller {
  private service;

  public constructor(commander, service) {
    this.service = service;
    this.constructCommands(commander);
  }

  private constructCommands(commander) {
    commander
      .command('cg <group_name>')
      .option('-i --verb_id <verb_id>', 'Verb ID')
      .option('-l --verb_lang <verb_lang>', 'Verb Language')
      .option('-d --verb_display <verb_display>', 'Verb Display')
      .description('Create a group')
      .action(this.createGroup.bind(this));

    commander
      .command('lg')
      .description('List all groups')
      .action(this.getGroups.bind(this));

    commander
      .command('dg <id>')
      .description('Delete a group by id')
      .action(this.deleteGroupById.bind(this));
  }

  public createGroup(group_name, command) {
    this.service.createGroup(
      group_name,
      command.verb_id,
      command.verb_lang,
      command.verb_display
    ).then(function(model) {
      console.log(model);
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }

  public getGroups() {
    this.service.getGroups().then(function (models) {
      console.log(models.map(function(model) { return JSON.stringify(model); }).join('\n'));
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }

  public deleteGroupById(id) {
    this.service.deleteGroupById(id).then(function () {
      console.log('Deleted');
    }, function (err) {
      console.error(err.stack);
    }).then(process.exit, process.exit);
  }
}

export = Controller;