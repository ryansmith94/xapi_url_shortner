/// <reference path="../definitions/references.d.ts" />
import request = require('request');
import cheerio = require('cheerio');
import q = require('q');

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

export = Repository;