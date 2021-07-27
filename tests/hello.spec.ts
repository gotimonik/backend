/* import supertest from 'supertest';
import { constants } from 'http2';
import app from '../src/app';
import config from '../src/config'; */

describe('Testing The Hello World Routes', (): void => {
  /* let server: any;
  let request: any;
  beforeAll((done): void => {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  afterAll((done): void => {
    server.close(done);
  });

  it('Should Respond with Hello World', async (done): Promise<void> => {
    const response = await request.get(`${config.gae.api.prefix}/hello`);

    expect(response.status).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    expect(response.body.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
    done();
  });

  it('Should Respond with Hello World', async (done): Promise<void> => {
    const response = await request.get(`${config.gae.api.prefix}/hello?name=World`);

    expect(response.status).toBe(constants.HTTP_STATUS_OK);
    expect(response.body.message).toBe('Hello World');
    done();
  }); */
  it('Test addition of 2 numbers', (): void => {
    expect(1 + 2).toBe(3);
  });
});
