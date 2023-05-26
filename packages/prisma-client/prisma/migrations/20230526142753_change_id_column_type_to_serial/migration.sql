/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `menuitems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `item_id` on the `menuitems` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `order_id` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `orderstatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `orderstatus_id` on the `orderstatus` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `stations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `station_id` on the `stations` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `tables` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `table_id` on the `tables` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `tablestatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `tablestatus_id` on the `tablestatus` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `usertypes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `usertype_id` on the `usertypes` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
ALTER COLUMN "category_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id");

-- AlterTable
ALTER TABLE "menuitems" DROP CONSTRAINT "menuitems_pkey",
ALTER COLUMN "item_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "menuitems_pkey" PRIMARY KEY ("item_id");

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
ALTER COLUMN "order_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id");

-- AlterTable
ALTER TABLE "orderstatus" DROP CONSTRAINT "orderstatus_pkey",
ALTER COLUMN "orderstatus_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "orderstatus_pkey" PRIMARY KEY ("orderstatus_id");

-- AlterTable
ALTER TABLE "stations" DROP CONSTRAINT "stations_pkey",
ALTER COLUMN "station_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "stations_pkey" PRIMARY KEY ("station_id");

-- AlterTable
ALTER TABLE "tables" DROP CONSTRAINT "tables_pkey",
ALTER COLUMN "table_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "tables_pkey" PRIMARY KEY ("table_id");

-- AlterTable
ALTER TABLE "tablestatus" DROP CONSTRAINT "tablestatus_pkey",
ALTER COLUMN "tablestatus_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "tablestatus_pkey" PRIMARY KEY ("tablestatus_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "user_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "usertypes" DROP CONSTRAINT "usertypes_pkey",
ALTER COLUMN "usertype_id" SET DATA TYPE SMALLSERIAL,
ADD CONSTRAINT "usertypes_pkey" PRIMARY KEY ("usertype_id");
