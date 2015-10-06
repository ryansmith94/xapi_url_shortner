/// <reference path="../../definitions/references.d.ts" />
import jquery = require('jquery');
import q = require('q');

class Repository {
  private endpoint;
  private token_value;
  private links: Array<any>;

  public constructor(endpoint, token_value) {
    this.endpoint = endpoint;
    this.token_value = token_value;
  }

  public createLink(link) {
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'POST',
      data: link,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Bearer '+this.token_value);
      }.bind(this)
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
    return jquery.ajax({
      url: this.endpoint,
      dataType: 'json',
      method: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Bearer '+this.token_value);
      }.bind(this)
    }).then(function (links) {
      this.links = links;
      return links
    }.bind(this));
  }

  public getLinkById(id) {
    var deferred = q.defer();
    var filtered_links = this.links.filter(function (link) {
      return link.id === id;
    });
    
    if (filtered_links.length > 0) {
      deferred.resolve(filtered_links[0]);
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
}

export = Repository;