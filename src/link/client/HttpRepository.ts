/// <reference path="../../definitions/references.d.ts" />
import BaseRepository = require('../../BaseHttpRepository');
import q = require('q');

class Repository extends BaseRepository {
  private token_value;
  private links: Array<any>;

  public constructor(endpoint, token_value) {
    this.token_value = token_value;
    super(endpoint);
  }

  protected connect(opts) {
    opts.beforeSend = function (xhr) {
      xhr.setRequestHeader ('Authorization', 'Bearer '+this.token_value);
    }.bind(this);
    return super.connect(opts);
  }

  public createLink(link) {
    return this.connect({
      method: 'POST',
      data: link
    }).then(function (link) {
      this.links.push(link);
      return link;
    }.bind(this));
  }

  public updateLink(updated_link) {
    var deferred = q.defer();
    var filtered_indexes = this.links.map(function (link, index) {
      return link.id === updated_link.id ? index : null;
    }).filter(function (index) {
      return index !== null;
    });
    
    if (filtered_indexes.length > 0) {
      this.links[filtered_indexes[0]] = updated_link;
      deferred.resolve(updated_link);
    } else {
      deferred.reject(new Error('No link'));
    }

    return deferred.promise;
  }

  public getLinks(): any {
    if (this.links) return q(this.links);
    return this.connect({
      method: 'GET'
    }).then(function (links) {
      this.links = links;
      return links
    }.bind(this));
  }

  public getLinkById(id) {
    return this.filterModels(this.links, function (link) {
      return link.id === id;
    });
  }

  public getCustomLinkByShortUrl(short_url: string) {
    return this.filterModels(this.links, function (link) {
      return link.short_url === short_url;
    });
  }
}

export = Repository;