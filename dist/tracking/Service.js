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
    Service.prototype.trackLink = function (link, tracking_options) {
        tracking_options = tracking_options || {};
        return this.web_repo.getTitle(link.long_url).then(function (page_title) {
            var statement = {
                'actor': tracking_options.actor || {
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
            };
            var context = tracking_options.context;
            if (context && context.constructor === Object && !Array.isArray(context) && Object.keys(context).length > 0) {
                statement.context = context;
            }
            return this.lrs_repo.createStatement(statement);
        }.bind(this));
    };
    return Service;
})(BaseService);
module.exports = Service;
