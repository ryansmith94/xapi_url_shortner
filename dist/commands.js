#!/usr/bin/env node
var source_map_support = require('source-map-support');
var commander = require('commander');
var config = require('./config');
source_map_support.install({
    handleUncaughtExceptions: false
});
// Group.
var GroupRepository = require('./group/KnexRepository');
var GroupService = require('./group/Service');
var GroupController = require('./group/CommanderController');
var group_repository = new GroupRepository(config.knex, 'group');
var group_service = new GroupService(group_repository);
var group_controller = new GroupController(commander, group_service);
commander.parse(process.argv);
//# sourceMappingURL=commands.js.map