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
import LinkFactory = require('./link/server/Factory');
var group_service = GroupFactory(config.knex, 'group');
var group_controller = new GroupController(commander, group_service);
var link_service = LinkFactory(config.knex, 'link');

// User.
import UserFactory = require('./user/server/Factory');
import UserController = require('./user/server/CommanderController');
import TokenFactory = require('./token/server/Factory');
var token_service = TokenFactory(config.knex, 'token');
var user_service = UserFactory(config.knex, 'user');
var user_controller = new UserController(commander, user_service);

user_service.setGroupService(group_service);
user_service.setTokenService(token_service);
group_service.setLinkService(link_service);
group_service.setUserService(user_service);
link_service.setGroupService(group_service);

commander.parse(process.argv);