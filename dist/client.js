/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var App = require('./App');
// Link.
var LinkRepository = require('./link/client/HttpRepository');
var LinkService = require('./link/client/Service');
var LinkCreateController = require('./link/client/ReactCreateController');
var LinkListController = require('./link/client/ReactListController');
// Token.
var TokenRepository = require('./token/client/HttpRepository');
var TokenService = require('./token/client/Service');
var TokenCreateController = require('./token/client/ReactCreateController');
var token_repository = new TokenRepository('api/token');
var token_service = new TokenService(token_repository);
var content_controller = function (token, onTokenChange) {
    var content;
    if (token) {
        var link_service = new LinkService(new LinkRepository('api/link', token.value));
        content = [
            LinkCreateController({
                service: link_service
            }),
            LinkListController({
                service: link_service
            })
        ];
    }
    else {
        content = [TokenCreateController({
                service: token_service,
                onTokenChange: onTokenChange
            })];
    }
    return content;
};
react.render(App({
    content_controller: content_controller
}), document.getElementById('app'));
//# sourceMappingURL=client.js.map