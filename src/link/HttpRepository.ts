/// <reference path="../definitions/references.d.ts" />
import jquery = require('jquery');

class Repository {
  private endpoint;

  public constructor(endpoint) {
    this.endpoint = endpoint;
  }

  public createLink(link) {
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'POST',
      data: link
    });
  }

  public getLinks() {
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'GET'
    });
  }
}

export = Repository;