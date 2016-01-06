import * as express from 'express';
import * as knex from 'knex';
import * as bodyParser from 'body-parser';
import * as source_map_support from 'source-map-support';
import config from './config';

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
import TrackingFactory from './tracking/Factory';
var tracking_service = TrackingFactory(config.lrs);

// Token.
import TokenFactory from './token/server/Factory';
import TokenController from './token/server/ExpressController';
var token_service = TokenFactory(config.knex, 'token');
var token_controller = new TokenController(app, token_service);

// Group.
import GroupFactory from './group/Factory';
var group_service = GroupFactory(config.knex, 'group');

// User.
import UserFactory from './user/server/Factory';
import UserController from './user/server/ExpressController';
var user_service = UserFactory(config.knex, 'user');
var user_controller = new UserController(app, user_service);

// Link.
import LinkFactory from './link/server/Factory';
import LinkController from './link/server/ExpressController';
var link_service = LinkFactory(config.knex, 'link');
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
import * as React from 'react';

var dom = React.DOM;
app.get('/', function (req, res) {
  res.send(React.renderToStaticMarkup(dom.html({}, [
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

export default app;