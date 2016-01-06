import * as React from 'react';
import App from './App';

// Link.
import LinkFactory from './link/client/Factory';
import LinkController from './link/client/ReactController';

// Token.
import TokenFactory from './token/client/Factory';
import TokenCreateController from './token/client/ReactCreateController';
var token_service = TokenFactory('api/token');

// User.
import UserFactory from './user/client/Factory';
import UserController from './user/client/ReactCreateController';

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

React.render(App({
  content_controller: content_controller
}), document.getElementById('app'));