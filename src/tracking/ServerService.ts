/// <reference path="../definitions/references.d.ts" />
import BaseService = require('../BaseService');

class Service extends BaseService {
  private lrs_repo;
  private web_repo;

  public constructor(lrs_repository, web_repository) {
    this.lrs_repo = lrs_repository;
    this.web_repo = web_repository;
    super();
  }

  public trackLink(link) {
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
            'moreInfo': 'http://localhost:3000/'+link.short_url
          }
        }
      });
    }.bind(this));
  }
}

export = Service;