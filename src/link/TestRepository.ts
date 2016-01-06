import * as q from 'q';

class Repository {
  private links: Array<any> = [];

  public createLink(link) {
    link.id = this.links.length + 1;
    this.links.push(link);
    return q(link);
  }

  public updateLink(link) {
    var deferred = q.defer();
    
    if (this.links[link.id - 1]) {
      this.links[link.id - 1] = link;
      deferred.resolve(link);
    } else {
      deferred.reject(new Error('No link'));
    }

    return deferred.promise;
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

  public getLinksByGroupId(group_id) {
    var filtered_links = this.links.filter(function (link) {
      return link.group_id === group_id;
    });

    return q(filtered_links);
  }

  public deleteLinkById(id) {
    var deferred = q.defer();
    var filtered_links = this.links.filter(function (link, index) {
      link.index = index;
      return link.id === id;
    });

    if (filtered_links.length > 0) {
      this.links = this.links.slice(0, filtered_links[0].index).concat(
        this.links.slice(filtered_links[0].index + 1)
      );
      deferred.resolve(true);
    } else {
      deferred.reject(new Error('No link'));
    }

    return deferred.promise;
  }

  public deleteLinksByGroupId(group_id) {
    var deferred = q.defer();
    this.links = this.links.filter(function(link) {
      return link.group_id !== group_id;
    });
    deferred.resolve(true);
    return deferred.promise;
  }
}

export default Repository;