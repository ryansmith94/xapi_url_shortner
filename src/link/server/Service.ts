import BaseService from '../BaseService';
import * as q from 'q';

class Service extends BaseService {
  private tracking_service;
  private user_service;
  private group_service;

  /**
   * Sets the tracking service.
   * @param {any} tracking_service A tracking service.
   */
  public setTrackingService(tracking_service) {
    this.tracking_service = tracking_service;
  }

  /**
   * Sets the user service.
   * @param {any} user_service A user service.
   */
  public setUserService(user_service) {
    this.user_service = user_service;
  }

  /**
   * Sets the group service.
   * @param {any} group_service A token service.
   */
  public setGroupService(group_service) {
    this.group_service = group_service;
  }

  /**
   * Tracks a link.
   * @param {string} short_url The short_url to track.
   * @param {any} tracking_options The options to be used by the tracking service.
   */
  public trackLink(short_url: string, tracking_options?) {
    return this.getLinkByShortUrl(short_url).then((link) => {
      this.tracking_service.trackLink(link, tracking_options);
      return link;
    });
  }

  /**
   * Creates a new link.
   * @param {string} long_url The long_url to be used.
   * @param {number} user_id The user creating the link.
   * @param {string} custom_url The custom_url to be used (optional).
   * @return {Future}
   */
  public createLink(long_url: string, user_id: number, custom_url?: string) {
    return this.validateLink(long_url, custom_url).then(() => {
      return this.user_service.getUserById(user_id);
    }).then((user) => {
      return this.repo.createLink({
        long_url: long_url,
        short_url: custom_url,
        group_id: user.group_id,
        user_id: user.id
      });
    }).then((link) => {
      return this.getCustomLinkById(link.id).then((custom_link) => {
        link.short_url = this.idToShortUrl(custom_link.id);
        return this.repo.updateLink(link).then((link) => {
          link.editable = true;
          this.emitChange();
          return link;
        });
      }, (err) => {
        link.editable = true;
        link.short_url = link.short_url || this.idToShortUrl(link.id);
        this.emitChange();
        return link;
      });
    });
  }

  /**
   * Gets links.
   * @param {number} user_id The user creating the link.
   * @return {Future}
   */
  public getLinks(user_id: number) {
    var user;
    return this.user_service.getUserById(user_id).then((token_user) => {
      user = token_user;
      return this.repo.getLinksByGroupId(user.group_id);
    }).then((links) => {
      return links.map((link) => {
        return {
          id: link.id,
          long_url: link.long_url,
          short_url: link.short_url || this.idToShortUrl(link.id),
          editable: link.user_id == user.id || (!!user.admin),
          user_id: link.user_id,
          group_id: link.group_id
        };
      });
    });
  }

  /**
   * Deletes a link by ID if able to with the given token.
   * @param {string} id The ID of the link to delete.
   * @param {number} user_id The user creating the link.
   * @return {Future}
   */
  public deleteLinkById(id, user_id: number) {
    return q.all([
      this.user_service.getUserById(user_id),
      this.repo.getLinkById(id)
    ]).spread((user, link) => {
      if (link.user_id == user.id) {
        this.repo.deleteLinkById(link.id);
        return true;
      } else {
        throw new Error('Link cannot be deleted by that user');
      }
    });
  }

  /**
   * Deletes links by group ID.
   * @param {number} group_id The ID of the group.
   * @return {Future}
   */
  public deleteLinksByGroupId(group_id: number) {
    return this.group_service.getGroupById(group_id).then(() => {
      return this.repo.deleteLinksByGroupId(group_id);
    });
  }

  /**
   * Changes the long_url of a link.
   * @param {number} id Identifer associated with the link.
   * @param {string} long_url The new long_url
   * @param {number} user_id Identifier associated with the user updating the link.
   * @return {Promise}
   */
  public changeLongUrl(id: number, long_url: string, user_id: number) {
    return this.validateLink(long_url).then(() => {
      return this.getLinkById(id);
    }).then((link) => {
      if (user_id != link.user_id) throw new Error('Link cannot be modified by that user');
      link.long_url = long_url;
      return this.repo.updateLink(link);
    });
  }
}

export default Service;