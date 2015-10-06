/// <reference path="../../definitions/references.d.ts" />
import jquery = require('jquery');
import q = require('q');

class Repository {
  private endpoint;
  private tokens: Array<any> = [];

  public constructor(endpoint) {
    this.endpoint = endpoint;
  }

  public createToken(token) {
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'POST',
      data: token
    }).then(function (token) {
      this.tokens.push(token);
      return token;
    }.bind(this));
  }

  public getTokenByValue(value: string) {
    var deferred = q.defer();
    var filtered_tokens = this.tokens.filter(function (token) {
      return token.value === value;
    });
    
    if (filtered_tokens.length > 0) {
      deferred.resolve(filtered_tokens[0]);
    } else {
      deferred.reject(new Error('No token'));
    }

    return deferred.promise;
  }
}

export = Repository;