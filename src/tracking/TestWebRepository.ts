/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {

  public getTitle(url) {
    return q(url);
  }
}

export = Repository;