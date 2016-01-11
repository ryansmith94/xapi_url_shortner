import * as Tincan from 'tincanjs';
import * as q from 'q';

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

    this.connect().sendStatement(statement, (responses) => {
      if (!responses) deferred.reject(new Error('No LRSs configured.'));
      
      var err_res = responses.filter((response) => {
        return response.err;
      })[0];
      if (err_res && err_res.err) deferred.reject(err_res.err);

      deferred.resolve(statement);
    });
    return deferred.promise;
  }
}

export default Repository;