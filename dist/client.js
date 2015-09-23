/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var App = require('./App');
// Link.
var LinkRepository = require('./link/HttpRepository');
var LinkService = require('./link/Service');
var LinkCreateController = require('./link/ReactCreateController');
var LinkListController = require('./link/ReactListController');
var link_repository = new LinkRepository('api/link');
var link_service = new LinkService(link_repository, null);
var link_create_controller = LinkCreateController({ service: link_service });
var link_list_controller = LinkListController({ service: link_service });
react.render(App({
    link_create_controller: link_create_controller,
    link_list_controller: link_list_controller
}), document.getElementById('app'));
//# sourceMappingURL=client.js.map