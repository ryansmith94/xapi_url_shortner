/// <reference path="./definitions/references.d.ts" />
var express = require('express');
var bodyParser = require('body-parser');
var source_map_support = require('source-map-support');
var config = require('./config');
source_map_support.install({
    handleUncaughtExceptions: false
});
var app = express();
app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use('/example', express.static(__dirname + '/../example'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Tracking.
var TrackingLrsRepository = require('./tracking/TinCanLrsRepository');
var TrackingWebRepository = require('./tracking/CheerioWebRepository');
var TrackingService = require('./tracking/Service');
var tracking_lrs_repository = new TrackingLrsRepository(config.lrs);
var tracking_web_repository = new TrackingWebRepository();
var tracking_service = new TrackingService(tracking_lrs_repository, tracking_web_repository);
// Token.
var TokenRepository = require('./token/server/KnexRepository');
var TokenService = require('./token/server/Service');
var TokenController = require('./token/server/ExpressController');
var token_repository = new TokenRepository(config.knex, 'token');
var token_service = new TokenService(token_repository);
var token_controller = new TokenController(app, token_service);
// User.
var GroupRepository = require('./group/KnexRepository');
var GroupService = require('./group/Service');
var UserRepository = require('./user/server/KnexRepository');
var UserService = require('./user/server/Service');
var UserController = require('./user/server/ExpressController');
var group_repository = new GroupRepository(config.knex, 'group');
var group_service = new GroupService(group_repository);
var user_repository = new UserRepository(config.knex, 'user');
var user_service = new UserService(user_repository, group_service, token_service);
var user_controller = new UserController(app, user_service);
token_service.setUserService(user_service);
// Link.
var LinkRepository = require('./link/server/KnexRepository');
var LinkService = require('./link/server/Service');
var LinkController = require('./link/server/ExpressController');
var link_repository = new LinkRepository(config.knex, 'link');
var link_service = new LinkService(link_repository, tracking_service, token_service);
var link_controller = new LinkController(app, link_service);
// UI.
var react = require('react');
var dom = react.DOM;
app.get('/', function (req, res) {
    res.send(react.renderToStaticMarkup(dom.html({}, [
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
var port = 3000;
var server = app.listen(port);
console.log('App running at http://localhost:' + port);
module.exports = app;
//# sourceMappingURL=server.js.map