/*
  Warnings:

  - You are about to drop the `orderitems` table. If the table is not empty, all the data it contains will be lost.

*/

-- RENAME Table
ALTER TABLE "orderitems" RENAME TO "orders";

-- DropPrimaryKey
ALTER TABLE "orders" DROP CONSTRAINT "orderitems_pkey";

-- RENAME Column
ALTER TABLE "orders" RENAME COLUMN "orderitems_id" TO "order_id";

-- AddPrimaryKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id");
