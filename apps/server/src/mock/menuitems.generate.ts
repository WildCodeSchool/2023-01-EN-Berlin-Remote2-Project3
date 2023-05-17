import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchCategories = async () => {
  return await prisma.category.findMany({
    include: {
      menuitems: {},
    },
  });
};

fetchCategories().then((res) => {
  // This produces the mock data for the menu items
  console.log(res);
});