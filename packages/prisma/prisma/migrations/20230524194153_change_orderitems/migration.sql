/*
  Warnings:

  - You are about to drop the column `quantity` on the `orderitems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderitems" DROP COLUMN "quantity",
ADD COLUMN     "status_id" INTEGER,
ADD COLUMN     "waiter_id" INTEGER,
ADD COLUMN     "table_id" INTEGER;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_ibfk_3" FOREIGN KEY ("status_id") REFERENCES "orderstatus"("orderstatus_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_ibfk_4" FOREIGN KEY ("waiter_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_ibfk_5" FOREIGN KEY ("table_id") REFERENCES "tables"("table_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

--FillNewColumnsWithData
UPDATE orderitems AS oi
SET (status_id, waiter_id, table_id) = (SELECT orderstatus_id, waiter_id, table_id FROM orders AS o WHERE o.order_id = oi.order_id);
