/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var App = require('./App');
var LinkFactory = require('./link/client/Factory');
var LinkController = require('./link/client/ReactController');
var TokenFactory = require('./token/client/Factory');
var TokenCreateController = require('./token/client/ReactCreateController');
var token_service = TokenFactory('api/token');
var UserFactory = require('./user/client/Factory');
var UserController = require('./user/client/ReactCreateController');
var content_controller = function (token, onTokenChange, route) {
    var content;
    if (token && route === 'invite') {
        var user_service = UserFactory('api/user', token.value);
        content = [UserController({
                service: user_service
            })];
    }
    else if (token) {
        var link_service = LinkFactory('api/link', token.value);
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