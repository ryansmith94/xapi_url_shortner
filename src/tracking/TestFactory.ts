import LrsRepository = require('./TestLrsRepository');
import WebRepository = require('./TestWebRepository');
import Service = require('./Service');

export = function (): Service {
  var lrs_repo = new LrsRepository();
  var web_repo = new WebRepository();
  return new Service(lrs_repo, web_repo);
};