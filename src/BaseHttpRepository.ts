/// <reference path="./definitions/references.d.ts" />
import jquery = require('jquery');
import q = require('q');

class Repository {
  private endpoint;

  public constructor(endpoint) {
    this.endpoint = endpoint;
  }

  protected connect(opts) {
    var deferred = q.defer();
    opts.url = this.endpoint;
    opts.dataType = 'json';

    jquery.ajax(opts).done(function (data) {
      deferred.resolve(data);
    }).fail(function (err) {
      deferred.reject(err.responseText);
    });

    return deferred.promise;
  }

  protected filterModels(models, filterFn) {
    var deferred = q.defer();
    var filtered_models = models.filter(filterFn);

    if (filtered_models.length > 0) {
      deferred.resolve(filtered_models[0]);
    } else {
      deferred.reject(new Error('No model'));
    }

    return deferred.promise;
  }
}

export = Repository;