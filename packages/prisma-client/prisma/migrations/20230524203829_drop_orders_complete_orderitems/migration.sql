/*
  Warnings:

  - You are about to drop the column `order_id` on the `orderitems` table. All the data in the column will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `status_id` on table `orderitems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `waiter_id` on table `orderitems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `table_id` on table `orderitems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orderitems" DROP CONSTRAINT "orderitems_ibfk_1";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_ibfk_1";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_ibfk_2";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_ibfk_3";

-- DropIndex
DROP INDEX "order_id";

-- AlterTable
ALTER TABLE "orderitems" DROP COLUMN "order_id",
ALTER COLUMN "status_id" SET NOT NULL,
ALTER COLUMN "waiter_id" SET NOT NULL,
ALTER COLUMN "table_id" SET NOT NULL;

-- DropTable
DROP TABLE "orders";
