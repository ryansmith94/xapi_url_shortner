"use strict";
var express = require('express');
var knex = require('knex');
var bodyParser = require('body-parser');
var source_map_support = require('source-map-support');
var config_1 = require('./config');
source_map_support.install({
    handleUncaughtExceptions: false
});
var app = express();
var knexConnection = knex(config_1.default.knex);
app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use('/example', express.static(__dirname + '/../example'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var Factory_1 = require('./tracking/Factory');
var tracking_service = Factory_1.default(config_1.default.lrs);
var Factory_2 = require('./token/server/Factory');
var ExpressController_1 = require('./token/server/ExpressController');
var token_service = Factory_2.default(knexConnection, 'token');
var token_controller = new ExpressController_1.default(app, token_service);
var Factory_3 = require('./group/Factory');
var group_service = Factory_3.default(knexConnection, 'group');
var Factory_4 = require('./user/server/Factory');
var ExpressController_2 = require('./user/server/ExpressController');
var user_service = Factory_4.default(knexConnection, 'user');
var user_controller = new ExpressController_2.default(app, user_service, token_service);
var Factory_5 = require('./link/server/Factory');
var ExpressController_3 = require('./link/server/ExpressController');
var link_service = Factory_5.default(knexConnection, 'link');
var link_controller = new ExpressController_3.default(app, link_service, token_service);
user_service.setGroupService(group_service);
token_service.setUserService(user_service);
link_service.setTrackingService(tracking_service);
link_service.setUserService(user_service);
link_service.setGroupService(group_service);
group_service.setUserService(user_service);
group_service.setLinkService(link_service);
tracking_service.setGroupService(group_service);
var React = require('react');
var dom = React.DOM;
app.get('/', function (req, res) {
    res.send(React.renderToStaticMarkup(dom.html({}, [
        dom.head({}, [
            dom.title({}, ['xAPI URL Shortener']),
            dom.link({ rel: 'stylesheet', type: 'text/css', href: '../node_modules/bootstrap/dist/css/bootstrap.min.css' }),
            dom.link({ rel: 'stylesheet', type: 'text/css', href: './main.css' })
        ]),
        dom.body({}, [
            dom.div({ id: 'app' }, []),
            dom.script({ src: 'client.bundle.js' }),
            dom.script({ src: '/node_modules/jquery/dist/jquery.min.js' }),
            dom.script({ src: '/node_modules/bootstrap/dist/js/bootstrap.min.js' }),
        ])
    ])));
});
var server = app.listen(config_1.default.port);
console.log('App running at http://localhost:' + config_1.default.port);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;

//# sourceMappingURL=server.js.map
