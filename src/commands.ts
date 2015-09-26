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
import UserRepository = require('./user/KnexRepository');
import UserService = require('./user/Service');
import UserController = require('./user/CommanderController');
var user_repository = new UserRepository(config.knex, 'user');
var user_service = new UserService(user_repository, group_service);
var user_controller = new UserController(commander, user_service);

commander.parse(process.argv);