import HTTPSuccessResponse from '../../shared/http/http-200-success';

export default class HelloResponse implements HTTPSuccessResponse {
  private message: string;

  public constructor(message: string) {
    this.message = message;
  }
}
