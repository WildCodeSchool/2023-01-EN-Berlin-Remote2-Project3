import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

const fetchTables = async () => {
  return await prisma.tablePhysical.findMany();
};

fetchTables().then((res) => {
  // This produces the mock data for the menu items
  console.log(JSON.stringify(res));
});
