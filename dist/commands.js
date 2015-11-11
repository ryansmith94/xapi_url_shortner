#!/usr/bin/env node
var source_map_support = require('source-map-support');
var commander = require('commander');
var config = require('./config');
source_map_support.install({
    handleUncaughtExceptions: false
});
var GroupFactory = require('./group/Factory');
var GroupController = require('./group/CommanderController');
var LinkRepository = require('./link/server/KnexRepository');
var LinkService = require('./link/server/Service');
var group_service = GroupFactory(config.knex, 'group');
var group_controller = new GroupController(commander, group_service);
var link_repository = new LinkRepository(config.knex, 'link');
var link_service = new LinkService(link_repository);
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
group_service.setLinkService(link_service);
group_service.setUserService(user_service);
link_service.setGroupService(group_service);
commander.parse(process.argv);
//# sourceMappingURL=commands.js.map