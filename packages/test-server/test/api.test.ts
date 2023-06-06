import { afterAll, expect, test } from 'vitest'
import { app } from 'server';
import supertest from 'supertest';


test('with a running server', async () => {
    // TODO 1: figure out how to make the application ready for supertest
    //         without actually listening on any ports. (this step could be
    //         a "noop" - meaning that you do not have to do anything here)
    //         In the case of a FastifyJS application this equates to runn-
    //         ing "app.ready()" as shown below
    // await app.ready()
  
    // TODO2: figure out how to access the http.Server instanch (Node.js)
    //        from the ExpressJS application instance "app". In the case of
    //        a fastify application this is "app.server"
    //const response = await supertest(app.server)
    //  .get('/')
    //  .expect(200)
  
  })