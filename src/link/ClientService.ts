import BaseService = require('../BaseService');

class Service extends BaseService {
  private repo: any;
  private last_created: any;

  public constructor(repository: any) {
    this.repo = repository;
    super();
  }

  public createLink(long_url: string) {
    if (this.last_created && long_url === this.last_created.long_url) {
      return false;
    }

    return this.repo.createLink({
      long_url: long_url
    }).then(function (link) {
      this.last_created = link;
      this.emitChange();
      return link;
    }.bind(this));
  }

  public getLastCreatedLink() {
    return this.last_created;
  }
}

export = Service;