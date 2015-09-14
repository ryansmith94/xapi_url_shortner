/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {

  public createLink(link) {
    return q({
      id: '1',
      long_url: link.long_url
    });
  }

  public getLinkById(id) {
    return q({
      id: id,
      long_url: 'http://www.example.com/test'
    })
  }
}

export = Repository;