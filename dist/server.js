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
// Link.
var LinkRepository = require('./link/KnexRepository');
var LinkService = require('./link/Service');
var LinkController = require('./link/ExpressController');
var link_repository = new LinkRepository(config.knex, 'link');
var link_service = new LinkService(link_repository, tracking_service);
var link_controller = new LinkController(app, link_service);
// UI.
var react = require('react');
var App = require('./App');
var LinkCreateController = require('./link/ReactCreateController');
var LinkListController = require('./link/ReactListController');
var link_create_controller = LinkCreateController({ service: link_service });
var link_list_controller = LinkListController({ service: link_service });
var dom = react.DOM;
app.get('/', function (req, res) {
    res.send(react.renderToStaticMarkup(dom.html({}, [
        dom.head({}, [
            dom.title({}, ['xAPI URL Shortener']),
            dom.link({ rel: 'stylesheet', type: 'text/css', href: '../node_modules/bootstrap/dist/css/bootstrap.min.css' }),
            dom.link({ rel: 'stylesheet', type: 'text/css', href: './main.css' })
        ]),
        dom.body({}, [
            dom.div({ id: 'app' }, [App({
                    link_create_controller: link_create_controller,
                    link_list_controller: link_list_controller
                })]),
            dom.script({ src: 'client.bundle.js' })
        ])
    ])));
});
var port = 3000;
var server = app.listen(port);
console.log('App running at http://localhost:' + port);
module.exports = app;
//# sourceMappingURL=server.js.map