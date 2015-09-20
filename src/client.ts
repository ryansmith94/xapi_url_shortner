/// <reference path="./definitions/references.d.ts" />
import react = require('react');
import App = require('./App');

// Link.
import LinkRepository = require('./link/HttpRepository');
import LinkService = require('./link/Service');
import LinkCreateController = require('./link/ReactCreateController');
import LinkListController = require('./link/ReactListController');
var link_repository = new LinkRepository('api/link');
var link_service = new LinkService(link_repository, null);
var link_create_controller = LinkCreateController({service: link_service});
var link_list_controller = LinkListController({service: link_service});

react.render(App({
  link_create_controller: link_create_controller,
  link_list_controller: link_list_controller
}), document.getElementById('app'))