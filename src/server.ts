/// <reference path="./definitions/references.d.ts" />
import express = require('express');
import knex = require('knex');
import bodyParser = require('body-parser');
import source_map_support = require('source-map-support');
import config = require('./config');

source_map_support.install({
  handleUncaughtExceptions: false
});

var app = express();

app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname+'/../node_modules'));
app.use('/example', express.static(__dirname+'/../example'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Tracking.
import TrackingFactory = require('./tracking/Factory');
var tracking_service = TrackingFactory(config.lrs);

// Token.
import TokenRepository = require('./token/server/KnexRepository');
import TokenService = require('./token/server/Service');
import TokenController = require('./token/server/ExpressController');
var token_repository = new TokenRepository(config.knex, 'token');
var token_service = new TokenService(token_repository);
var token_controller = new TokenController(app, token_service);

// Group.
import GroupFactory = require('./group/Factory');
var group_service = GroupFactory(config.knex, 'group');

// User.
import UserRepository = require('./user/server/KnexRepository');
import UserService = require('./user/server/Service');
import UserController = require('./user/server/ExpressController');
var user_repository = new UserRepository(config.knex, 'user');
var user_service = new UserService(user_repository);
var user_controller = new UserController(app, user_service);

// Link.
import LinkRepository = require('./link/server/KnexRepository');
import LinkService = require('./link/server/Service');
import LinkController = require('./link/server/ExpressController');
var link_repository = new LinkRepository(config.knex, 'link');
var link_service = new LinkService(link_repository);
var link_controller = new LinkController(app, link_service);

// Injects services into services.
user_service.setGroupService(group_service);
user_service.setTokenService(token_service);
token_service.setUserService(user_service);
link_service.setTrackingService(tracking_service);
link_service.setTokenService(token_service);
link_service.setGroupService(group_service);
group_service.setUserService(user_service);
group_service.setLinkService(link_service);
tracking_service.setGroupService(group_service);

// UI.
import react = require('react');

var dom = react.DOM;
app.get('/', function (req, res) {
  res.send(react.renderToStaticMarkup(dom.html({}, [
    dom.head({}, [
      dom.title({}, ['xAPI URL Shortener']),
      dom.link({rel:'stylesheet', type:'text/css', href:'../node_modules/bootstrap/dist/css/bootstrap.min.css'}),
      dom.link({rel:'stylesheet', type:'text/css', href:'./main.css'})
    ]),
    dom.body({}, [
      dom.div({id:'app'}, []),
      dom.script({src:'client.bundle.js'}),
      dom.script({src:'/node_modules/jquery/dist/jquery.min.js'}),
      dom.script({src:'/node_modules/bootstrap/dist/js/bootstrap.min.js'}),
    ])
  ])));
});

var server = app.listen(config.port);
console.log('App running at http://localhost:' + config.port);

export = app;