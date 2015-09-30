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
import TrackingLrsRepository = require('./tracking/TinCanLrsRepository');
import TrackingWebRepository = require('./tracking/CheerioWebRepository');
import TrackingService = require('./tracking/Service');
var tracking_lrs_repository = new TrackingLrsRepository(config.lrs);
var tracking_web_repository = new TrackingWebRepository();
var tracking_service = new TrackingService(tracking_lrs_repository, tracking_web_repository);

// Link.
import LinkRepository = require('./link/KnexRepository');
import LinkService = require('./link/Service');
import LinkController = require('./link/ExpressController');
var link_repository = new LinkRepository(config.knex, 'link');
var link_service = new LinkService(link_repository, tracking_service);
var link_controller = new LinkController(app, link_service);

// Token.
import GroupRepository = require('./group/KnexRepository');
import GroupService = require('./group/Service');
import UserRepository = require('./user/KnexRepository');
import UserService = require('./user/Service');
import TokenRepository = require('./token/KnexRepository');
import TokenService = require('./token/Service');
import TokenController = require('./token/ExpressController');
var group_repository = new GroupRepository(config.knex, 'group');
var group_service = new GroupService(group_repository);
var user_repository = new UserRepository(config.knex, 'user');
var user_service = new UserService(user_repository, group_service);
var token_repository = new TokenRepository(config.knex, 'token');
var token_service = new TokenService(token_repository, user_service);
var token_controller = new TokenController(app, token_service);

// UI.
import react = require('react');
import App = require('./App');
import TokenCreateController = require('./token/ReactCreateController');

var content_controller = function (token, onTokenChange) {
  return [TokenCreateController({
    service: token_service,
    onTokenChange: onTokenChange
  })];
};

var dom = react.DOM;
app.get('/', function (req, res) {
  res.send(react.renderToStaticMarkup(dom.html({}, [
    dom.head({}, [
      dom.title({}, ['xAPI URL Shortener']),
      dom.link({rel:'stylesheet', type:'text/css', href:'../node_modules/bootstrap/dist/css/bootstrap.min.css'}),
      dom.link({rel:'stylesheet', type:'text/css', href:'./main.css'})
    ]),
    dom.body({}, [
      dom.div({id:'app'}, [App({
        content_controller: content_controller
      })]),
      dom.script({src:'client.bundle.js'})
    ])
  ])));
});

var port = 3000;
var server = app.listen(port);
console.log('App running at http://localhost:'+port);

export = app;