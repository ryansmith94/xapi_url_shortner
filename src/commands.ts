#!/usr/bin/env node
/// <reference path="./definitions/references.d.ts" />
import source_map_support = require('source-map-support');
import commander = require('commander');
import config = require('./config');

source_map_support.install({
  handleUncaughtExceptions: false
});

// Group.
import GroupFactory = require('./group/Factory');
import GroupController = require('./group/CommanderController');
import LinkRepository = require('./link/server/KnexRepository');
import LinkService = require('./link/server/Service');
var group_service = GroupFactory(config.knex, 'group');
var group_controller = new GroupController(commander, group_service);
var link_repository = new LinkRepository(config.knex, 'link');
var link_service = new LinkService(link_repository);

// User.
import UserRepository = require('./user/server/KnexRepository');
import UserService = require('./user/server/Service');
import UserController = require('./user/server/CommanderController');
import TokenRepository = require('./token/server/KnexRepository');
import TokenService = require('./token/server/Service');
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