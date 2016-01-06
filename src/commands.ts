#!/usr/bin/env node
import * as source_map_support from 'source-map-support';
import * as commander from 'commander';
import config from './config';

source_map_support.install({
  handleUncaughtExceptions: false
});

// Group.
import GroupFactory from './group/Factory';
import GroupController from './group/CommanderController';
import LinkFactory from './link/server/Factory';
var group_service = GroupFactory(config.knex, 'group');
var group_controller = new GroupController(commander, group_service);
var link_service = LinkFactory(config.knex, 'link');

// User.
import UserFactory from './user/server/Factory';
import UserController from './user/server/CommanderController';
import TokenFactory from './token/server/Factory';
var token_service = TokenFactory(config.knex, 'token');
var user_service = UserFactory(config.knex, 'user');
var user_controller = new UserController(commander, user_service);

user_service.setGroupService(group_service);
user_service.setTokenService(token_service);
group_service.setLinkService(link_service);
group_service.setUserService(user_service);
link_service.setGroupService(group_service);

commander.parse(process.argv);