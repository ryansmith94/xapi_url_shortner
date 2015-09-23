/// <reference path="../definitions/references.d.ts" />
var request = require('request');
var cheerio = require('cheerio');
var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.getTitle = function (url) {
        var deferred = q.defer();
        request({ uri: url }, function (err, res, body) {
            if (err)
                deferred.reject(err);
            var page = cheerio.load(body);
            var page_title = page('title').text();
            deferred.resolve(page_title);
        });
        return deferred.promise;
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=CheerioWebRepository.js.map