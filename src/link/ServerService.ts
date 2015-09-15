import BaseService = require('../BaseService');

class Service extends BaseService {
  private repo;
  private tracking_service;

  public constructor(repository, tracking_service) {
    this.repo = repository;
    this.tracking_service = tracking_service;
    super();
  }

  public createLink(long_url: string) {
    return this.repo.createLink({
      long_url: long_url
    }).then(function (link) {
      this.emitChange();
      return {
        id: link.id,
        long_url: link.long_url,
        short_url: this.idToShortUrl(link.id)
      };
    }.bind(this));
  }

  public getLinkByShortUrl(short_url: string) {
    var id = this.shortUrlToId(short_url);
    return this.repo.getLinkById(id).then(function (link) {
      return {
        id: link.id,
        long_url: link.long_url,
        short_url: short_url
      };
    }).then(function (link) {
      this.tracking_service.trackLink(link);
      return link;
    }.bind(this));
  }

  private convertBase(value: string, from_base: number, to_base: number): string {
    var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);
    
    var dec_value = ('' + value).split('').reverse().reduce(function (carry: number, digit: string, index: number) {
      if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
      return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);
    
    var new_value = '';
    while (dec_value > 0) {
      new_value = to_range[dec_value % to_base] + new_value;
      dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
  }

  private idToShortUrl(value: string): string {
    return this.convertBase(value, 10, 34);
  }

  private shortUrlToId(value: string): string {
    return this.convertBase(value, 34, 10);
  }
}

export = Service;