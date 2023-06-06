import { afterAll, expect, test, expectTypeOf } from "vitest";
import { app } from "server";
import supertest from "supertest";
import * as http from "http";
// import { ResponseGetTablesMine } from 'prisma-queries';

test("root", async () => {
  const root = await supertest(http.createServer(app)).get("/").expect(200);
})

test('menu', async () => {
  const menu = await supertest(http.createServer(app))
    .get("/api/menu")
    .expect(200);
  })

  test('tables', async () => {
  const tables = await supertest(http.createServer(app))
    .get("/api/tables")
    .expect(200);
  })

  test('login', async () => {
  const login = await supertest(http.createServer(app))
    .get("/api/login")
    .expect(401);
  })

  test('loginPOSTnoBody', async () => {
  const loginPOSTnoBody = await supertest(http.createServer(app))
    .post("/api/login")
    .expect(400);
  })

  test('tablesMine', async () => {
  const tablesMine = await supertest(http.createServer(app))
    .get("/api/tables/mine")
    .expect(401);
  })

  test('tablesById', async () => {
  const tablesById = await supertest(http.createServer(app))
    .get("/api/tables/5")
    .expect(401);
  })

  test('tablesByIdPOST', async () => {
  const tablesByIdPOST = await supertest(http.createServer(app))
    .post("/api/tables/5")
    .expect(401);
  })

  test('tablesByIdPUT', async () => {
  const tablesByIdPUT = await supertest(http.createServer(app))
    .put("/api/tables/5")
    .expect(401);
});
