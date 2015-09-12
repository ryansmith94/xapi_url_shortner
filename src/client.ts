/// <reference path="./definitions/references.d.ts" />
import react = require('react');

// Link.
import LinkRepository = require('./link/HttpRepository');
import LinkService = require('./link/ClientService');
import LinkController = require('./link/ReactController');
var link_repository = new LinkRepository('api/link');
var link_service = new LinkService(link_repository);
var link_controller = LinkController({service: link_service});

react.render(link_controller, document.getElementById('app'))