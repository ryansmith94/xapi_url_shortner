/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {

  public createLink(link) {
    return q({
      id: '1',
      long_url: link.long_url
    });
  }
}

export = Repository;