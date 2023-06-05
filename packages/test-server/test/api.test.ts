import { afterAll, expect, test } from 'vitest'
import { app } from 'server';
import supertest from 'supertest';


test('with a running server', async () => {
    await app.ready()
  
    const response = await supertest(app.server)
      .get('/')
      .expect(200)
  

    expect(response.body).toStrictEqual(app)
  })