/// <reference path="../definitions/references.d.ts" />
import Tincan = require('tincanjs');
import q = require('q');

class Repository {
  private config;

  public constructor(config) {
    this.config = config;
  }

  private connect() {
    return new Tincan({recordStores: [this.config]});
  }

  public createStatement(statement) {
    var deferred = q.defer();
    this.connect().sendStatement(statement, function (responses) {
      if (!responses) deferred.reject(new Error('No LRSs configured.'));
      
      var err_res = responses.filter(function (response) {
        return response.err;
      })[0];
      if (err_res && err_res.err) deferred.reject(err_res.err);

      deferred.resolve(statement);
    });
    return deferred.promise;
  }
}

export = Repository;