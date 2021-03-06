import * as jquery from 'jquery';
import * as q from 'q';

class Repository {
  protected endpoint;

  public constructor(endpoint) {
    this.endpoint = endpoint;
  }

  protected connect(opts) {
    var deferred = q.defer();
    opts.url = opts.url || this.endpoint;
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

  protected deleteModel(models, filterFn) {
    return this.filterModels(models, function (model, index) {
      model.index = index;
      return filterFn(model, index);
    }).then(function (model: any) {
      return models.slice(0, model.index).concat(
        models.slice(model.index + 1)
      );
    });
  }
}

export default Repository;