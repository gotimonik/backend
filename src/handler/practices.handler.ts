import getPracticesFromCsv from '../service/practices/practices.service';
import HttpRequestContext from '../shared/http/http-request-context';

export default function getPracticesHandler(cxt: HttpRequestContext) {
  return getPracticesFromCsv(cxt.getRequestParams());
}
