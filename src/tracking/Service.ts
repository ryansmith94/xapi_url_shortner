/// <reference path="../definitions/references.d.ts" />
import BaseService = require('../BaseService');

interface TrackingOptions {
  actor?: any,
  context?: any
}
interface Statement {
  actor: any,
  verb: any,
  object: any,
  context?: any
}
class Service extends BaseService {
  private lrs_repo;
  private web_repo;

  public constructor(lrs_repository, web_repository) {
    this.lrs_repo = lrs_repository;
    this.web_repo = web_repository;
    super();
  }

  public trackLink(link, tracking_options: TrackingOptions) {
    tracking_options = tracking_options || {};
    return this.web_repo.getTitle(link.long_url).then(function (page_title) {
      var statement: Statement = {
        actor: tracking_options.actor || {
          account: {
            name: 'Unknown',
            homePage: 'https://github.com/ryansmith94/xapi_url_shortner/users'
          }
        },
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/launched',
          display: {
            'en-GB': 'launched'
          }
        },
        object: {
          id: link.long_url,
          definition: {
            type: 'http://activitystrea.ms/schema/1.0/page',
            name: {
              'en-GB': page_title
            },
            moreInfo: 'http://localhost:3000/'+link.short_url
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

      return this.lrs_repo.createStatement(statement);
    }.bind(this));
  }
}

export = Service;