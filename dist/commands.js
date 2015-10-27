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
// User.
var UserRepository = require('./user/server/KnexRepository');
var UserService = require('./user/server/Service');
var UserController = require('./user/server/CommanderController');
var TokenRepository = require('./token/server/KnexRepository');
var TokenService = require('./token/server/Service');
var token_repository = new TokenRepository(config.knex, 'token');
var token_service = new TokenService(token_repository);
var user_repository = new UserRepository(config.knex, 'user');
var user_service = new UserService(user_repository);
var user_controller = new UserController(commander, user_service);
user_service.setGroupService(group_service);
user_service.setTokenService(token_service);
commander.parse(process.argv);
//# sourceMappingURL=commands.js.map