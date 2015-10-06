import BaseService = require('../BaseService');

class Service extends BaseService {
  private tracking_service;

  public constructor(repository, tracking_service) {
    this.tracking_service = tracking_service;
    super(repository);
  }

  public trackLink(short_url: string, tracking_options) {
    return this.getLinkByShortUrl(short_url).then(function (link) {
      this.tracking_service.trackLink(link, tracking_options);
      return link;
    }.bind(this));
  }
}

export = Service;