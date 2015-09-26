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

commander.parse(process.argv);