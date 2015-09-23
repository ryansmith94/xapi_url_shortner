/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {
  private links = [];

  public createLink(link) {
    link.id = this.links.length;
    this.links.push(link);
    return q(link);
  }

  public getLinkById(id) {
    var deferred = q.defer();
    
    if (this.links[id - 1]) {
      deferred.resolve(this.links[id - 1]);
    } else {
      deferred.reject(new Error('No link'));
    }

    return deferred.promise;
  }

  public getCustomLinkByShortUrl(short_url: string) {
    var deferred = q.defer();
    var filtered_links = this.links.filter(function (link) {
      return link.short_url === short_url;
    });

    if (filtered_links.length > 0) {
      deferred.resolve(filtered_links[0]);
    } else {
      deferred.reject(new Error('No link'));
    }

    return deferred.promise;
  }

  public getLinks() {
    return q(this.links);
  }
}

export = Repository;