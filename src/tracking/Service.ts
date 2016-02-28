import BaseService from '../BaseService';
import * as q from 'q';

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
  private group_service;

  /**
   * Constructs a new tracking service.
   * @param {any} lrs_repository LRS repository to use.
   * @param {any} web_repository Web repository to use.
   */
  public constructor(lrs_repository: any, web_repository: any) {
    super();
    this.lrs_repo = lrs_repository;
    this.web_repo = web_repository;
  }

  /**
   * Sets the group service.
   * @param {any} group_service
   */
  public setGroupService(group_service: any) {
    this.group_service = group_service;
  }

  /**
   * Tracks a link.
   * @param {any} link The link to be tracked.
   * @param {TrackingOptions} tracking_options
   */
  public trackLink(link: any, tracking_options: TrackingOptions) {
    tracking_options = tracking_options || {};

    return q.all([
      this.group_service.getGroupById(link.group_id),
      this.web_repo.getTitle(link.long_url)
    ]).spread(function (group, page_title) {
      var statement: Statement = {
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
      statement.verb.display[group.verb_lang] = group.verb_display;

      return this.lrs_repo.createStatement(statement);
    }.bind(this));
  }
}

export default Service;