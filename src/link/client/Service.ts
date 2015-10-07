import BaseService = require('../BaseService');

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
    var self = this;
    return self.validateLink(long_url, custom_url).then(function () {
      return self.repo.createLink({
        long_url: long_url,
        short_url: custom_url
      });
    }).then(function (link) {
      self.emitChange();
      return link;
    });
  }

  /**
   * Gets links.
   * @return {Future}
   */
  public getLinks() {
    return this.repo.getLinks().then(function (links) {
      return links.map(function (link) {
        return {
          id: link.id,
          long_url: link.long_url,
          short_url: link.short_url || this.idToShortUrl(link.id)
        };
      }.bind(this));
    }.bind(this));
  }
}

export = Service;