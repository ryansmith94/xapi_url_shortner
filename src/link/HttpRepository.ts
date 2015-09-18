/// <reference path="../definitions/references.d.ts" />
import jquery = require('jquery');
import q = require('q');

class Repository {
  private endpoint;
  private links: Array<any>;

  public constructor(endpoint) {
    this.endpoint = endpoint;
  }

  public createLink(link) {
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'POST',
      data: link
    }).then(function (link) {
      this.links.push(link);
      return link;
    }.bind(this));
  }

  public getLinks(): any {
    if (this.links) return q(this.links);
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'GET'
    }).then(function (links) {
      this.links = links;
      return links
    }.bind(this));
  }
}

export = Repository;