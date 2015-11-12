/// <reference path="./definitions/references.d.ts" />
import react = require('react');
import App = require('./App');

// Link.
import LinkFactory = require('./link/client/Factory');
import LinkController = require('./link/client/ReactController');

// Token.
import TokenFactory = require('./token/client/Factory');
import TokenCreateController = require('./token/client/ReactCreateController');
var token_service = TokenFactory('api/token');

// User.
import UserFactory = require('./user/client/Factory');
import UserController = require('./user/client/ReactCreateController');

var content_controller = function (token, onTokenChange, route) {
  var content;

  if (token && route === 'invite') {
    var user_service = UserFactory('api/user', token.value);
    content = [UserController({
      service: user_service
    })];
  } else if (token) {
    var link_service = LinkFactory('api/link', token.value);
    content = [LinkController({
      service: link_service
    })];
  } else {
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