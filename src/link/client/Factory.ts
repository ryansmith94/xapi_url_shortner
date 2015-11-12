import Repository = require('./HttpRepository');
import Service = require('./Service');

export = function(endpoint: string, token_value: string): Service {
    var repo = new Repository(endpoint, token_value);
    return new Service(repo);
};
