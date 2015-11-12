import Repository = require('./TestRepository');
import Service = require('./Service');

export = function(): Service {
  var repo = new Repository();
  return new Service(repo);
};
