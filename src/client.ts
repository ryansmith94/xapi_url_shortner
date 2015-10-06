/// <reference path="./definitions/references.d.ts" />
import react = require('react');
import App = require('./App');

// Link.
import LinkRepository = require('./link/client/HttpRepository');
import LinkService = require('./link/client/Service');
import LinkController = require('./link/client/ReactController');

// Token.
import TokenRepository = require('./token/client/HttpRepository');
import TokenService = require('./token/client/Service');
import TokenCreateController = require('./token/client/ReactCreateController');
var token_repository = new TokenRepository('api/token');
var token_service = new TokenService(token_repository);

var content_controller = function (token, onTokenChange) {
  var content;

  if (token) {
    var link_service = new LinkService(new LinkRepository('api/link', token.value));
    var long_url = '';
    var handleLongUrlChange = function (long_url) {
      long_url: long_url;
    };
    content = [
      LinkController({
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