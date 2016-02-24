import BaseService from '../BaseService';
import url_regex from './UrlRegex';
import * as q from 'q';

class Service extends BaseService {
  protected repo;

  /**
   * Constructs a new Service.
   * @param {any} repository A repository.
   */
  public constructor(repository: any) {
    super();
    this.repo = repository;
  }

  /**
   * Validates the given long_url and custom_url.
   * @param {string} long_url The long_url to validate.
   * @param {string} custom_url The custom_url to validate (optional).
   * @return {Future}
   */
  public validateLink(long_url: string, custom_url?: string) {
    var deferred = q.defer();

    // Validates the long_url pattern.
    if (!url_regex.test(long_url)) {
      deferred.reject(new Error('Invalid Long URL'));
    }

    // Validates the custom_url pattern.
    if (!/^[\da-z]+$/.test(custom_url)) {
      deferred.reject(new Error('Invalid Custom URL `'+custom_url+'`. It may only contain digits and lowercase letters.'));
    }

    // Checks that the custom_url doesn't exist already.
    if (custom_url != undefined) {
      this.getLinkByShortUrl(custom_url).then(function(link) {
        deferred.reject(new Error('Custom URL already exists.'));
      }, function(err) {
        deferred.resolve(true);
      });
    } else {
      deferred.resolve(true);
    }

    return deferred.promise;
  }

  /**
   * Converts an id to a short_url.
   * @param  {string} value The id to be converted.
   * @return {string} short_url
   */
  protected idToShortUrl(value: string): string {
    return parseInt(value, 10).toString(36);
  }

  /**
   * Converts a short_url to an id.
   * @param  {string} value The short_url to be converted.
   * @return {string} id
   */
  private shortUrlToId(value: string): string {
    return parseInt(value, 36).toString(10);
  }

  /**
   * Gets a customised link by its id.
   * @param {number} id The id to find.
   * @return {Future}
   */
  protected getCustomLinkById(id) {
    var short_url = this.idToShortUrl(id);
    return this.getCustomLinkByShortUrl(short_url);
  }

  /**
   * Gets a customised link by its short_url.
   * @param {string} short_url The short_url to find.
   * @return {Future}
   */
  private getCustomLinkByShortUrl(short_url: string) {
    return this.repo.getCustomLinkByShortUrl(short_url);
  }

  /**
   * Gets a link by its short_url.
   * @param {string} short_url The short_url to find.
   * @return {Future}
   */
  protected getLinkByShortUrl(short_url: string) {
    return this.getCustomLinkByShortUrl(short_url).then(function (link) {
      return link;
    }.bind(this), function (err) {
      // Converts the short_url to an id and searches by the id.
      var id = this.shortUrlToId(short_url);
      return this.getLinkById(id);
    }.bind(this)).then(function (link) {
      // Returns the custom_url as the short_url or the converted id as the short_url.
      link.short_url = link.short_url || this.idToShortUrl(link.id);
      return link;
    }.bind(this));
  }

  /**
   * Gets a link by its id.
   * @param {number} id The id to find.
   * @return {Future}
   */
  protected getLinkById(id) {
    return this.repo.getLinkById(id);
  }
}

export default Service;