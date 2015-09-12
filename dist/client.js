/// <reference path="./definitions/references.d.ts" />
var react = require('react');
// Link.
var LinkRepository = require('./link/HttpRepository');
var LinkService = require('./link/ClientService');
var LinkController = require('./link/ReactController');
var link_repository = new LinkRepository('api/link');
var link_service = new LinkService(link_repository);
var link_controller = LinkController({ service: link_service });
react.render(link_controller, document.getElementById('app'));
