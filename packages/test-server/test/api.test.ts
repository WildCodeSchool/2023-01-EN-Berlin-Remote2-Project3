import { test } from "vitest";
import { server } from "./testserver";
// import { ResponseGetTablesMine } from 'prisma-queries';

test("root", async () => {
  const root = await server.get("/").expect(200);
});

test("menu GET endpoint", async () => {
  const menu = await server.get("/api/menu").expect(200);
});

test("tables GET endpoint", async () => {
  const tables = await server.get("/api/tables").expect(200);
});

test("login GET endpoint", async () => {
  const login = await server.get("/api/login").expect(401);
});

test("login POST endpoint", async () => {
  const loginPOSTnoBody = await server.post("/api/login").expect(400);
});

test("tablesMine GET endpoint", async () => {
  const tablesMine = await server.get("/api/tables/mine").expect(401);
});

test("tablesById GET endpoint", async () => {
  const tablesById = await server.get("/api/tables/5").expect(401);
});

test("tablesById POST endpoint", async () => {
  const tablesByIdPOST = await server.post("/api/tables/5").expect(401);
});

test("tablesById PUT endpoint", async () => {
  const tablesByIdPUT = await server.put("/api/tables/5").expect(401);
});
