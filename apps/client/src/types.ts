export type {
  Category,
  MenuItem,
  Order,
  OrderStatus,
  Station,
  TablePhysical,
  TableStatus,
  User,
  UserType,
} from "@prisma/client";

/*
  I used this article to create the required types from the prisma client itself.
  https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-using-variations-of-the-generated-model-type
*/

import { Prisma } from "@prisma/client";

const tableWithOrders = Prisma.validator<Prisma.OrderArgs>()({
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
});

export type TableWithOrders = Prisma.OrderGetPayload<typeof tableWithOrders>