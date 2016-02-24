"use strict";
var React = require('react');
var App_1 = require('./App');
var Factory_1 = require('./link/client/Factory');
var ReactController_1 = require('./link/client/ReactController');
var Factory_2 = require('./token/client/Factory');
var ReactCreateController_1 = require('./token/client/ReactCreateController');
var token_service = Factory_2.default('api/token');
var Factory_3 = require('./user/client/Factory');
var ReactCreateController_2 = require('./user/client/ReactCreateController');
var content_controller = function (token, onTokenChange, route) {
    var content;
    if (token && route === 'invite') {
        var user_service = Factory_3.default('api/user', token.value);
        content = [ReactCreateController_2.default({
                service: user_service
            })];
    }
    else if (token) {
        var link_service = Factory_1.default('api/link', token.value);
        content = [ReactController_1.default({
                service: link_service
            })];
    }
    else {
        content = [ReactCreateController_1.default({
                service: token_service,
                onTokenChange: onTokenChange
            })];
    }
    return content;
};
React.render(App_1.default({
    content_controller: content_controller
}), document.getElementById('app'));

//# sourceMappingURL=client.js.map
