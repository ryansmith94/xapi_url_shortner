/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {
  private tokens: Array<any> = [];

  public createToken(token) {
    token.id = this.tokens.length + 1;
    this.tokens.push(token);
    return q(token);
  }

  public getTokenByValue(token_value: string) {
    var deferred = q.defer();
    var filtered_tokens = this.tokens.filter(function (token) {
      return token.value === token_value;
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