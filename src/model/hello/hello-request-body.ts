import HTTPRequestBody from '../../shared/http/http-request-body';

export default interface HelloRequestBody extends HTTPRequestBody {
  name: string;
}
