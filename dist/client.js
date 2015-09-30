/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var App = require('./App');
// Link.
var LinkRepository = require('./link/HttpRepository');
var LinkService = require('./link/Service');
var LinkCreateController = require('./link/ReactCreateController');
var LinkListController = require('./link/ReactListController');
// Token.
var GroupRepository = require('./group/TestRepository');
var GroupService = require('./group/Service');
var UserRepository = require('./user/HttpRepository');
var UserService = require('./user/Service');
var TokenRepository = require('./token/HttpRepository');
var TokenService = require('./token/Service');
var TokenCreateController = require('./token/ReactCreateController');
var group_repository = new GroupRepository();
var group_service = new GroupService(group_repository);
var user_repository = new UserRepository();
var user_service = new UserService(user_repository, group_service);
var token_repository = new TokenRepository('api/token');
var token_service = new TokenService(token_repository, user_service);
var content_controller = function (token, onTokenChange) {
    var content;
    if (token) {
        var link_service = new LinkService(new LinkRepository('api/link', token.value), null);
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