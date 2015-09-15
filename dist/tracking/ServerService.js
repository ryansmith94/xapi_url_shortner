var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitions/references.d.ts" />
var BaseService = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(lrs_repository, web_repository) {
        this.lrs_repo = lrs_repository;
        this.web_repo = web_repository;
        _super.call(this);
    }
    Service.prototype.trackLink = function (link) {
        return this.web_repo.getTitle(link.long_url).then(function (page_title) {
            return this.lrs_repo.createStatement({
                'actor': {
                    'account': {
                        'name': 'Unknown',
                        'homePage': 'https://github.com/ryansmith94/xapi_url_shortner/users'
                    }
                },
                'verb': {
                    'id': 'http://adlnet.gov/expapi/verbs/launched',
                    'display': {
                        'en-GB': 'launched'
                    }
                },
                'object': {
                    'id': link.long_url,
                    'definition': {
                        'type': 'http://activitystrea.ms/schema/1.0/page',
                        'name': {
                            'en-GB': page_title
                        },
                        'moreInfo': 'http://localhost:3000/' + link.short_url
                    }
                }
            });
        }.bind(this));
    };
    return Service;
})(BaseService);
module.exports = Service;
