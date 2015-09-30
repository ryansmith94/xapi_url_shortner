/// <reference path="./definitions/references.d.ts" />
import react = require('react');
import App = require('./App');

// Link.
import LinkRepository = require('./link/HttpRepository');
import LinkService = require('./link/Service');
import LinkCreateController = require('./link/ReactCreateController');
import LinkListController = require('./link/ReactListController');

// Token.
import GroupRepository = require('./group/TestRepository');
import GroupService = require('./group/Service');
import UserRepository = require('./user/HttpRepository');
import UserService = require('./user/Service');
import TokenRepository = require('./token/HttpRepository');
import TokenService = require('./token/Service');
import TokenCreateController = require('./token/ReactCreateController');
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