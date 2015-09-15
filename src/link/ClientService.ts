import BaseService = require('../BaseService');

class Service extends BaseService {
  private repo: any;
  private links: Array<any> = [];

  public constructor(repository: any) {
    super();
    this.repo = repository;
  }

  public createLink(long_url: string) {
    // Stops recreation of links.
    if (this.links.filter(function (link) {
      return link.long_url === long_url;
    }).length > 0) return false;

    return this.repo.createLink({
      long_url: long_url
    }).then(function (link) {
      this.links.push(link);
      this.emitChange();
      return link;
    }.bind(this));
  }

  public fetchLinks() {
    return this.repo.getLinks().then(function (links) {
      this.links = links;
      this.emitChange();
      return links;
    }.bind(this));
  }

  public getLinks() {
    return this.links;
  }
}

export = Service;