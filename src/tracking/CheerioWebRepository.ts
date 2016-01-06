import * as request from 'request';
import * as cheerio from 'cheerio';
import * as q from 'q';

class Repository {

  public constructor() {}

  public getTitle(url) {
    var deferred = q.defer();
    request({uri: url}, function (err, res, body) {
      if (err) deferred.reject(err);
      var page = cheerio.load(body);
      var page_title = page('title').text();
      deferred.resolve(page_title);
    });
    return deferred.promise;
  }
}

export default Repository;