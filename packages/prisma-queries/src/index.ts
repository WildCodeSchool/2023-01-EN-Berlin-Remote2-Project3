export const queryMyTablesWithOrders = (id: number) => ({
  where: {
    orders: {
      some: {
        waiterId: id,
      },
    },
  },
  select: {
    id: true,
    name: true,
    statusId: true,
    tableStatus: {
      select: {
        name: true,
      },
    },
    orders: {
      select: {
        id: true,
        menuItem: {
          select: {
            name: true,
            price: true,
          },
        },
        orderTime: true,
        statusId: true,
        status: {
          select: {
            name: true,
          },
        },
        waiterId: true,
        waiter: {
          select: {
            name: true,
          },
        },
      },
    },
  },
});
