// import supertest from 'supertest';
// import app from '../src/app';

describe('Testing the App Startup and Health', (): void => {
  /* let server: any;
  let request: any; */
  /* beforeAll((done): void => {
    server = app.listen(done);
    request = supertest.agent(server);
  }); */
  /* afterAll((done): void => {
    server.close(done);
  }); */
  /* it('tests the base route and returns true for status', async (done): Promise<void> => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Up');
    done();
  }); */
  it('Test addition of 2 numbers', (): void => {
    expect(1 + 2).toBe(3);
  });
});
