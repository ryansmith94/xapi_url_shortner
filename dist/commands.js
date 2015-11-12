#!/usr/bin/env node
var source_map_support = require('source-map-support');
var commander = require('commander');
var config = require('./config');
source_map_support.install({
    handleUncaughtExceptions: false
});
var GroupFactory = require('./group/Factory');
var GroupController = require('./group/CommanderController');
var LinkFactory = require('./link/server/Factory');
var group_service = GroupFactory(config.knex, 'group');
var group_controller = new GroupController(commander, group_service);
var link_service = LinkFactory(config.knex, 'link');
var UserFactory = require('./user/server/Factory');
var UserController = require('./user/server/CommanderController');
var TokenFactory = require('./token/server/Factory');
var token_service = TokenFactory(config.knex, 'token');
var user_service = UserFactory(config.knex, 'user');
var user_controller = new UserController(commander, user_service);
user_service.setGroupService(group_service);
user_service.setTokenService(token_service);
group_service.setLinkService(link_service);
group_service.setUserService(user_service);
link_service.setGroupService(group_service);
commander.parse(process.argv);
//# sourceMappingURL=commands.js.map