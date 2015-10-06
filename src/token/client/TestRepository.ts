/// <reference path="../../definitions/references.d.ts" />
import q = require('q');

class Repository {
  private tokens: Array<any> = [];

  public createToken(token_request) {
    var token = {
      id: this.tokens.length + 1,
      value: ''+(this.tokens.length + 1),
      user_id: token_request.email+token_request.password
    };
    this.tokens.push(token);
    return q(token);
  }
}

export = Repository;