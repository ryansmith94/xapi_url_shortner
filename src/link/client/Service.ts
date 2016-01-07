import BaseService from '../BaseService';

class Service extends BaseService {

  /**
   * Constructs a new Service.
   * @param {any} repository A repository.
   */
  public constructor(repository: any) {
    super(repository);
  }

  /**
   * Creates a new link.
   * @param {string} long_url The long_url to be used.
   * @param {string} custom_url The custom_url to be used (optional).
   * @return {Future}
   */
  public createLink(long_url: string, custom_url?: string) {
    if (long_url.indexOf('://') === -1) {
      long_url = 'http://'+long_url;
    }

    return this.validateLink(long_url, custom_url).then(function () {
      return this.repo.createLink({
        long_url: long_url,
        short_url: custom_url
      });
    }.bind(this)).then(function (link) {
      this.emitChange();
      return link;
    }.bind(this));
  }

  /**
   * Gets links.
   * @return {Future}
   */
  public getLinks() {
    return this.repo.getLinks();
  }

  /**
   * Gets links.
   * @param {string} id The id of the link to delete.
   * @return {Future}
   */
  public deleteLinkById(id) {
    return this.repo.deleteLinkById(id).then(function () {
      this.emitChange();
      return true;
    }.bind(this));
  }

  /**
   * Changes the long_url of a link.
   * @param {number} id Identifer associated with the link.
   * @param {string} long_url The new long_url.
   * @return {Promise}
   */
  public changeLongUrl(id: number, long_url: string) {
    return this.validateLink(long_url).then(() => {
      return this.repo.changeLongUrl(id, long_url);
    }).then((result) => {
      this.emitChange();
      return result;
    });
  }
}

export default Service;