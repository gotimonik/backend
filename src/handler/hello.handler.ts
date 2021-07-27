import HttpRequestContext from '../shared/http/http-request-context';
import HelloRequestBody from '../model/hello/hello-request-body';
import HelloResponse from '../model/hello/hello-response-body';

export function sayHelloFromQuery(cxt: HttpRequestContext): HelloResponse {
  const name = cxt.getRequestParam('name');
  return new HelloResponse(`Hello ${name}`);
}

export function sayHelloFromURL(cxt: HttpRequestContext): HelloResponse {
  const name = cxt.getUrlParam('name');
  return new HelloResponse(`Hello ${name}`);
}

export function sayHelloFromRequestBody(cxt: HttpRequestContext): HelloResponse {
  const helloRequestBody: HelloRequestBody = cxt.getRequestBody() as HelloRequestBody;
  return new HelloResponse(`Hello ${helloRequestBody.name}`);
}
