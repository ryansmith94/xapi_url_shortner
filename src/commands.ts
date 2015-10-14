#!/usr/bin/env node
/// <reference path="./definitions/references.d.ts" />
import source_map_support = require('source-map-support');
import commander = require('commander');
import config = require('./config');

source_map_support.install({
  handleUncaughtExceptions: false
});

// Group.
import GroupRepository = require('./group/KnexRepository');
import GroupService = require('./group/Service');
import GroupController = require('./group/CommanderController');
var group_repository = new GroupRepository(config.knex, 'group');
var group_service = new GroupService(group_repository);
var group_controller = new GroupController(commander, group_service);

// User.
import UserRepository = require('./user/server/KnexRepository');
import UserService = require('./user/server/Service');
import UserController = require('./user/server/CommanderController');
import TokenRepository = require('./token/server/KnexRepository');
import TokenService = require('./token/server/Service');
var token_repository = new TokenRepository(config.knex, 'token');
var token_service = new TokenService(token_repository);
var user_repository = new UserRepository(config.knex, 'user');
var user_service = new UserService(user_repository, group_service, token_service);
var user_controller = new UserController(commander, user_service);

commander.parse(process.argv);