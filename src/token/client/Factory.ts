import Repository = require('./HttpRepository');
import Service = require('./Service');

export = function(endpoint: string): Service {
    var repo = new Repository(endpoint);
    return new Service(repo);
};
