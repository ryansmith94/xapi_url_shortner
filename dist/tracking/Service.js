var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitions/references.d.ts" />
var BaseService = require('../BaseService');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(lrs_repository, web_repository) {
        this.lrs_repo = lrs_repository;
        this.web_repo = web_repository;
        _super.call(this);
    }
    Service.prototype.setGroupService = function (group_service) {
        this.group_service = group_service;
    };
    Service.prototype.trackLink = function (link, tracking_options) {
        tracking_options = tracking_options || {};
        return q.all([
            this.group_service.getGroupById(link.group_id),
            this.web_repo.getTitle(link.long_url)
        ]).spread(function (group, page_title) {
            var statement = {
                actor: tracking_options.actor || {
                    account: {
                        name: 'Unknown',
                        homePage: 'https://github.com/ryansmith94/xapi_url_shortner/users'
                    }
                },
                verb: {
                    id: group.verb_id,
                    display: {}
                },
                object: {
                    id: link.long_url,
                    definition: {
                        type: 'http://activitystrea.ms/schema/1.0/page',
                        name: {
                            'en-GB': page_title
                        },
                        moreInfo: 'http://localhost:3000/' + link.short_url
                    }
                },
                context: {}
            };
            var context = tracking_options.context;
            if (context && context.constructor === Object && !Array.isArray(context) && Object.keys(context).length > 0) {
                statement.context = context;
            }
            statement.context.instructor = {
                account: {
                    name: String(link.user_id),
                    homePage: 'https://github.com/ryansmith94/xapi_url_shortner/users'
                }
            };
            statement.verb.display[group.verb_lang] = group.verb_display;
            return this.lrs_repo.createStatement(statement);
        }.bind(this));
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map