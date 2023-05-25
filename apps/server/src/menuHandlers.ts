import { prisma } from ".";

export const getMenuItemsSortedByCategory = async (req, res) => {
    const prismaQuery = {
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
            childCategories: {},
          },
        },
      },
      where: {
        parentId: {
          equals: null,
        },
      },
    };
    prisma.category
      .findMany(prismaQuery)
      .then((found) => {
        res.status(200).json(found);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from the database");
      });
  };