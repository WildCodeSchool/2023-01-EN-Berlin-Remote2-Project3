/*
  I used this article to create the required types from the prisma client itself.
  https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-using-variations-of-the-generated-model-type

  Note that since @surmavagit decided not only to use Prisma.**.findMany in some cases, but
  also to apply additional mapping functions, the process of extracting the types had become
  slightly more involved. Namely:

  (1) Extract the query parameter object from server project (this is passed to "findMany")
  (2) Use the article above to compute the type to be returned from the query
  (3) If a mapping function is used to map the results, extract the mapping function
  (4) To compute the type returned by the endpoint, use TS utility function ReturnType
*/

import { Prisma } from "@prisma/client";

/*
 * ------------------------------------------
 * Type extraction of the endpoint: (EXAMPLE)
 *
 * GET /api/tables/mine
 * ------------------------------------------
 */

// (1) Extract and export the query parameter object (as a function in this case, since
//     it depends on user-supplied waiter ID)
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

// (2) Compute the type to be returned by the Prisma query (using findMany on the
//     TablePhysical model in this case)
const tablesWithOrders = Prisma.validator<Prisma.TablePhysicalFindManyArgs>()(
  queryMyTablesWithOrders(0)
);
type TableWithOrdersQuery = Prisma.TablePhysicalGetPayload<
  typeof tablesWithOrders
>;

// (3) Extract and export the mapper function and type it using the above
export const mapMyTablesWithOrders = (results: TableWithOrdersQuery[]) =>
  results.map((table) => ({
    id: table.id,
    name: table.name,
    statusId: table.statusId,
    status: table.tableStatus.name,
    orders: table.orders.map((order) => ({
      id: order.id,
      name: order.menuItem.name,
      price: order.menuItem.price,
      orderTime: order.orderTime,
      statusId: order.statusId,
      status: order.status.name,
      waiterId: order.waiterId,
      waiter: order.waiter.name,
    })),
  }));

// This is the final type to be returned from the endpoint, which is exported
export type TableWithOrders = ReturnType<typeof mapMyTablesWithOrders>;

export const queryGetTablesById = (id: number) => ({
  where: {
    tableId: id,
  },
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

const tableWithOrders = Prisma.validator<Prisma.OrderFindManyArgs>()(
  queryGetTablesById(0)
);
type ResponseGetTablesById = Prisma.OrderGetPayload<
  typeof tablesWithOrders
>;
