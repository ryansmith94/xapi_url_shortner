import LrsRepository from './TestLrsRepository';
import WebRepository from './TestWebRepository';
import Service from './Service';

export default function (): Service {
  var lrs_repo = new LrsRepository();
  var web_repo = new WebRepository();
  return new Service(lrs_repo, web_repo);
};