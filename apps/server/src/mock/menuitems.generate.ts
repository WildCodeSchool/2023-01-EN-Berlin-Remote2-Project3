import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      menuItems: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
      childCategories: {
        select: {
          id: true,
          name: true,
          menuItems: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          childCategories: {}, //supposed to be an empty array
        },
      },
    },
    where: {
      parentId: {
        equals: null,
      },
    },
  });
};

fetchCategories().then((res) => {
  // This produces the mock data for the menu items
  console.log(res);
});
