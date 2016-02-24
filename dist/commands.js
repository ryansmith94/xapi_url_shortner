#!/usr/bin/env node
"use strict";
var source_map_support = require('source-map-support');
var commander = require('commander');
var config_1 = require('./config');
source_map_support.install({
    handleUncaughtExceptions: false
});
var Factory_1 = require('./group/Factory');
var CommanderController_1 = require('./group/CommanderController');
var Factory_2 = require('./link/server/Factory');
var group_service = Factory_1.default(config_1.default.knex, 'group');
var group_controller = new CommanderController_1.default(commander, group_service);
var link_service = Factory_2.default(config_1.default.knex, 'link');
var Factory_3 = require('./user/server/Factory');
var CommanderController_2 = require('./user/server/CommanderController');
var user_service = Factory_3.default(config_1.default.knex, 'user');
var user_controller = new CommanderController_2.default(commander, user_service);
user_service.setGroupService(group_service);
group_service.setLinkService(link_service);
group_service.setUserService(user_service);
link_service.setGroupService(group_service);
commander.parse(process.argv);

//# sourceMappingURL=commands.js.map
