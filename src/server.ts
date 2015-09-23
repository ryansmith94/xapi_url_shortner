/// <reference path="./definitions/references.d.ts" />
import express = require('express');
import knex = require('knex');
import bodyParser = require('body-parser');
import source_map_support = require('source-map-support');

source_map_support.install({
  handleUncaughtExceptions: false
});

var app = express();
var knex_config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'shortener'
  }
};
var lrs_config = {
  endpoint: 'http://demo.learninglocker.net/data/xAPI',
  username: 'd416e6220812740d3922eb09813ebb4163e8eb3e',
  password: 'bc7e0a2edd5d1969b6d774e679d4eb4e7a35be13'
};

app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname+'/../node_modules'));
app.use('/example', express.static(__dirname+'/../example'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Tracking.
import TrackingLrsRepository = require('./tracking/TinCanLrsRepository');
import TrackingWebRepository = require('./tracking/CheerioWebRepository');
import TrackingService = require('./tracking/Service');
var tracking_lrs_repository = new TrackingLrsRepository(lrs_config);
var tracking_web_repository = new TrackingWebRepository();
var tracking_service = new TrackingService(tracking_lrs_repository, tracking_web_repository);

// Link.
import LinkRepository = require('./link/KnexRepository');
import LinkService = require('./link/Service');
import LinkController = require('./link/ExpressController');
var link_repository = new LinkRepository(knex_config, 'link');
var link_service = new LinkService(link_repository, tracking_service);
var link_controller = new LinkController(link_service);
app.post('/api/link', link_controller.createLink.bind(link_controller));
app.get('/api/link', link_controller.getLinks.bind(link_controller));
app.get('/:short_url(\\w+)', link_controller.visitLink.bind(link_controller));


// UI.
import react = require('react');
import App = require('./App');
import LinkCreateController = require('./link/ReactCreateController');
import LinkListController = require('./link/ReactListController');
var link_create_controller = LinkCreateController({service: link_service});
var link_list_controller = LinkListController({service: link_service});

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
        link_create_controller: link_create_controller,
        link_list_controller: link_list_controller
      })]),
      dom.script({src:'client.bundle.js'})
    ])
  ])));
});

var port = 3000;
var server = app.listen(port);
console.log('App running at http://localhost:'+port);

export = app;