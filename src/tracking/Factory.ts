import LrsRepository from './TinCanLrsRepository';
import WebRepository from './CheerioWebRepository';
import Service from './Service';

export default function (lrs_config: any): Service {
  var lrs_repo = new LrsRepository(lrs_config);
  var web_repo = new WebRepository();
  return new Service(lrs_repo, web_repo);
};
