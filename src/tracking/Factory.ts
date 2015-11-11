import LrsRepository = require('./TinCanLrsRepository');
import WebRepository = require('./CheerioWebRepository');
import Service = require('./Service');

export = function (lrs_config: any): Service {
  var lrs_repo = new LrsRepository(lrs_config);
  var web_repo = new WebRepository();
  return new Service(lrs_repo, web_repo);
};
