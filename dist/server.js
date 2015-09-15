/// <reference path="./definitions/references.d.ts" />
var express = require('express');
var knex = require('knex');
var bodyParser = require('body-parser');
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
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
knex(knex_config).schema.createTable('link', function (table) {
    table.increments('id').primary();
    table.string('long_url');
}).then(function (table) {
    console.log(table);
}, function (err) {
    console.error(err);
});
// Tracking.
var TrackingLrsRepository = require('./tracking/TinCanLrsRepository');
var TrackingWebRepository = require('./tracking/CheerioWebRepository');
var TrackingService = require('./tracking/ServerService');
var tracking_lrs_repository = new TrackingLrsRepository(lrs_config);
var tracking_web_repository = new TrackingWebRepository();
var tracking_service = new TrackingService(tracking_lrs_repository, tracking_web_repository);
// Link.
var LinkRepository = require('./link/KnexRepository');
var LinkService = require('./link/ServerService');
var LinkController = require('./link/ExpressController');
var link_repository = new LinkRepository(knex_config, 'link');
var link_service = new LinkService(link_repository, tracking_service);
var link_controller = new LinkController(link_service);
app.post('/api/link', link_controller.createLink.bind(link_controller));
app.get('/:short_url(\\w+)', link_controller.visitLink.bind(link_controller));
var port = 3000;
var server = app.listen(port);
console.log('App running at http://localhost:' + port);
module.exports = app;
