import { afterAll, expect, test, expectTypeOf } from "vitest";
import { server } from "../testserver";
// import { ResponseGetTablesMine } from 'prisma-queries';
// import dotenv from "dotenv";

// const email = process.env.email ?? "";
// const password = process.env.password ?? "";


test("root", async () => {
  const root = await server.get("/").expect(200);
})

test('menu', async () => {
  const menu = await server
    .get("/api/menu")
    .expect(200);
  })

  test('tables', async () => {
  const tables = await server
    .get("/api/tables")
    .expect(200);
  })

  test('loginPOST', async () => {
  const loginPOSTnoBody = await server
    .post("/api/login").send({email: 'david@gmail.com', password: 'david123'})
    .expect(200);
  })



  test('login', async () => {
  const login = await server
    .get("/api/login")
    .expect(401);
  })


  test('tablesMine', async () => {
  const tablesMine = await server
    .get("/api/tables/mine")
    .expect(401);
  })

  test('tablesById', async () => {
  const tablesById = await server
    .get("/api/tables/5")
    .expect(401);
  })

  test('tablesByIdPOST', async () => {
  const tablesByIdPOST = await server
    .post("/api/tables/5")
    .expect(401);
  })

  test('tablesByIdPUT', async () => {
  const tablesByIdPUT = await server
    .put("/api/tables/5")
    .expect(401);
});
