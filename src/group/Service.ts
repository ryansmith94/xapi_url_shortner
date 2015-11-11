import BaseService = require('../BaseService');
import q = require('q');

class Service extends BaseService {
  private repo;
  private user_service;
  private link_service;

  public constructor(repository) {
    this.repo = repository;
    super();
  }

  public setUserService(user_service) {
    this.user_service = user_service;
  }

  public setLinkService(link_service) {
    this.link_service = link_service;
  }

  public createGroup(name: string) {
    return this.repo.createGroup({
      name: name
    });
  }

  public getGroupById(id) {
    return this.repo.getGroupById(id);
  }

  public getGroups() {
    return this.repo.getGroups();
  }

  public deleteGroupById(id) {
    return q.all([
      this.user_service.deleteUsersByGroupId(id),
      this.link_service.deleteLinksByGroupId(id),
      this.repo.deleteGroupById(id)
    ]).then(function() {
      return true;
    });
  }
}

export = Service;