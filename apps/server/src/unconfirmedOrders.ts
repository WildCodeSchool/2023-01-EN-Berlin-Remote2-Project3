export interface Order {
    itemId: Number[];
    statusId: Number;
    waiterId: Number;
    tableId: Number;
    // AND THE IDENTIFIER
  }

export const unconfirmedOrders: Order[] = [];