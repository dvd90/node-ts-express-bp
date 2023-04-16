import APP from '../app';
import request from 'supertest';

let app;

beforeAll(async () => {
  app = await APP();
});

beforeEach(() => {
  jest.useFakeTimers();
});

describe('StatusController', () => {
  describe('Status route works', () => {
    it('should return status 200', async () => {
      const res = await request(app).get('/status');

      expect(res.statusCode).toEqual(200);
    });
  });
});
