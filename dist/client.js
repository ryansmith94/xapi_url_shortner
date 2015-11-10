/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var App = require('./App');
var LinkRepository = require('./link/client/HttpRepository');
var LinkService = require('./link/client/Service');
var LinkController = require('./link/client/ReactController');
var TokenRepository = require('./token/client/HttpRepository');
var TokenService = require('./token/client/Service');
var TokenCreateController = require('./token/client/ReactCreateController');
var token_repository = new TokenRepository('api/token');
var token_service = new TokenService(token_repository);
var UserRepository = require('./user/client/HttpRepository');
var UserService = require('./user/client/Service');
var UserController = require('./user/client/ReactCreateController');
var content_controller = function (token, onTokenChange, route) {
    var content;
    if (token && route === 'invite') {
        var user_service = new UserService(new UserRepository('api/user', token.value));
        content = [UserController({
                service: user_service
            })];
    }
    else if (token) {
        var link_service = new LinkService(new LinkRepository('api/link', token.value));
        content = [LinkController({
                service: link_service
            })];
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