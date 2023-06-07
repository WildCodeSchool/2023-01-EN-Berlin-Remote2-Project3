import { test, beforeAll } from "vitest";
import { server } from "./testserver";
// import { ResponseGetTablesMine } from 'prisma-queries';

// const email = process.env.EMAIL;
// const password = process.env.PASSWORD;

let token = "";

beforeAll(async () => {
  await server
    .post("/api/login")
    .send({ email:'david@gmail.com', password:'david123' })
    .expect(200)
    .expect(async function hasTokenAndUserKeys(res) {
      if (!("token" in res.body && "user" in res.body)) throw new Error("missing token or user key");
      token = res.body.token;
    });
});

// open endpoints

test("root GET access", async () => {
  const root = await server.get("/").auth(token, { type: "bearer" }).expect(200);
});

test("menu GET ednpoint", async () => {
  const menu = await server.get("/api/menu").auth(token, { type: "bearer" }).expect(200);
});

test("tables GET endpoint", async () => {
  const tables = await server.get("/api/tables").auth(token, { type: "bearer" }).expect(200);
});

// protected endpoints

test("login GET endpoint", async () => {
  const login = await server.get("/api/login").auth(token, { type: "bearer" }).expect(200);
});

test("tablesMine GET endpoint", async () => {
  const tablesMine = await server.get("/api/tables/mine").auth(token, { type: "bearer" }).expect(200);
});

test("tablesById GET endpoint", async () => {
  const tablesById = await server.get("/api/tables/5").auth(token, { type: "bearer" }).expect(200);
});

test("tablesById POST endpoint", async () => {
  const tablesByIdPOST = await server.post("/api/tables/5").auth(token, { type: "bearer" }).expect(400);
});

test("tablesById PUT endpoint", async () => {
  const tablesByIdPUT = await server.put("/api/tables/5").auth(token, { type: "bearer" }).expect(400);
});

// placing an order

test("tablesById POST endpoint", async () => {
  const testOrder = [1, 2, 3];
  const tablesByIdPOST = await server
    .post("/api/tables/5")
    .auth(token, { type: "bearer" })
    .send({ orders: testOrder })
    .expect(202)
    .expect(function hasUniqeCodeKey(res) {
      if (!("uniqueCode" in res.body)) throw new Error("missing uniqueCode");
    })
    .then(async function confirmOrder(res) {
      const uniqueCode = res.body.uniqueCode;
      await server
        .put("/api/tables/5")
        .auth(token, { type: "bearer" })
        .send({ uniqueCode })
        .expect(201)
        .expect(async function answer(res) {
          console.log(res.text);
          const arrayOfUpdates = res.text.match(/\d+/);
          if (arrayOfUpdates === null || arrayOfUpdates.length > 1) {
            throw new Error("unexpected response message from the server");
          } else {
            const numberOfUpdates = +arrayOfUpdates[0];
            if (numberOfUpdates !== testOrder.length) throw new Error("wrong number of updates in the database");
          }
        });
    });
});
