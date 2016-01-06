import BaseService from '../BaseService';
import * as q from 'q';

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

  public createGroup(name: string, verb_id?: string, verb_lang?: string, verb_display?: string) {
    return this.repo.createGroup({
      name: name,
      verb_id: verb_id || 'http://adlnet.gov/expapi/verbs/launched',
      verb_lang: verb_lang || 'en',
      verb_display: verb_display || 'launched'
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

export default Service;