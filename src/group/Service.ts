import BaseService from '../BaseService';
import * as q from 'q';

class Service extends BaseService {
  private repo;
  private user_service;
  private link_service;

  /**
   * Constructs a new Group Service.
   * @param {any} repository The group repository.
   */
  public constructor(repository: any) {
    super();
    this.repo = repository;
  }

  /**
   * Sets the user service.
   * @param {any} user_service The user service to be used.
   */
  public setUserService(user_service: any) {
    this.user_service = user_service;
  }

  /**
   * Sets the link service.
   * @param {any} link_service Sets the link service to be used.
   */
  public setLinkService(link_service: any) {
    this.link_service = link_service;
  }

  /**
   * Creates a group with the given attribute values.
   * @param {string} name The name of the group.
   * @param {string} verb_id The verb identifier to use for tracking.
   * @param {string} verb_lang The verb language to use for tracking.
   * @param {string} verb_display The verb display to use for tracking.
   * @return {Promise}
   */
  public createGroup(name: string, verb_id?: string, verb_lang?: string, verb_display?: string) {
    return this.repo.createGroup({
      name: name,
      verb_id: verb_id || 'http://adlnet.gov/expapi/verbs/launched',
      verb_lang: verb_lang || 'en',
      verb_display: verb_display || 'launched'
    });
  }

  /**
   * Gets a group by its identifier.
   * @param {string} id The identifier associated with the group.
   * @return {Promise}
   */
  public getGroupById(id: string) {
    return this.repo.getGroupById(id);
  }

  /**
   * Gets groups.
   * @return {Promise}
   */
  public getGroups() {
    return this.repo.getGroups();
  }

  /**
   * Deletes a group by its identifier.
   * @param {string} id The identifier associated with the group.
   * @return {Promise}
   */
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