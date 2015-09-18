/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {

  public createStatement(statement) {
    return q(statement);
  }
}

export = Repository;