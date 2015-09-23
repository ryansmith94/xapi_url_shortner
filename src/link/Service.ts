import BaseService = require('../BaseService');
import url_regex = require('./UrlRegex');
import q = require('q');

class Service extends BaseService {
  private repo;
  private tracking_service;

  public constructor(repository, tracking_service) {
    this.repo = repository;
    this.tracking_service = tracking_service;
    super();
  }

  private validateLink(long_url: string, custom_url?: string) {
    var deferred = q.defer();

    if (!url_regex.test(long_url)) {
      deferred.reject(new Error('Invalid Long URL'));
    }

    if (!/[\da-z]/.test(custom_url)) {
      deferred.reject(new Error('Invalid Custom URL'));
    }

    this.getLinkByShortUrl(custom_url).then(function (link) {
      deferred.reject(new Error('Link already exists.'));
    }, function (err) {
      deferred.resolve(true);
    });

    return deferred.promise;
  }

  public createLink(long_url: string, custom_url?: string) {
    var self = this;
    return self.validateLink(long_url, custom_url).then(function () {
      return self.repo.createLink({
        long_url: long_url,
        short_url: custom_url
      }).then(function (link) {
        return self.getCustomLinkById(link.id).then(function (custom_link) {
          link.short_url = self.idToShortUrl(custom_link.id);
          return self.repo.updateLink(link).then(function (link) {
            self.emitChange();
            return link;
          });
        }, function (err) {
          link.short_url = link.short_url || self.idToShortUrl(link.id);
          self.emitChange();
          return link;
        });
      });
    });
  }

  public trackLink(short_url: string, tracking_options) {
    return this.getLinkByShortUrl(short_url).then(function (link) {
      this.tracking_service.trackLink(link, tracking_options);
      return link;
    }.bind(this));
  }

  public getLinks() {
    return this.repo.getLinks().then(function (links) {
      return links.map(function (link) {
        return {
          id: link.id,
          long_url: link.long_url,
          short_url: this.idToShortUrl(link.id)
        };
      }.bind(this));
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

  private getCustomLinkById(id) {
    var short_url = this.idToShortUrl(id);
    return this.getCustomLinkByShortUrl(short_url);
  }

  private getCustomLinkByShortUrl(short_url: string) {
    return this.repo.getCustomLinkByShortUrl(short_url);
  }

  private getLinkByShortUrl(short_url: string) {
    return this.getCustomLinkByShortUrl(short_url).then(function (link) {
      return link;
    }.bind(this), function (err) {
      var id = this.shortUrlToId(short_url);
      return this.getLinkById(id);
    }.bind(this)).then(function (link) {
      link.short_url = link.short_url || this.idToShortUrl(link.id);
      return link;
    }.bind(this));
  }

  private getLinkById(id) {
    return this.repo.getLinkById(id);
  }
}

export = Service;