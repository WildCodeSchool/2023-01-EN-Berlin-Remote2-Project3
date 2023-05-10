-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(30) NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "menuitems" (
    "item_id" SERIAL NOT NULL,
    "item_name" VARCHAR(50) NOT NULL,
    "price" DECIMAL(7,2),
    "category_id" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,

    CONSTRAINT "menuitems_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "orderitems" (
    "orderitems_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_time" TIMESTAMP(3) NOT NULL,
    "served_time" TIMESTAMP(3),

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("orderitems_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "orderstatus_id" INTEGER NOT NULL,
    "waiter_id" INTEGER NOT NULL,
    "table_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "orderstatus" (
    "orderstatus_id" SERIAL NOT NULL,
    "orderstatus_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "orderstatus_pkey" PRIMARY KEY ("orderstatus_id")
);

-- CreateTable
CREATE TABLE "stations" (
    "station_id" SERIAL NOT NULL,
    "station_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("station_id")
);

-- CreateTable
CREATE TABLE "tables" (
    "table_id" SERIAL NOT NULL,
    "table_name" VARCHAR(30) NOT NULL,
    "tablestatus_id" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("table_id")
);

-- CreateTable
CREATE TABLE "tablestatus" (
    "tablestatus_id" SERIAL NOT NULL,
    "tablestatus_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "tablestatus_pkey" PRIMARY KEY ("tablestatus_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "usertype_id" INTEGER NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "userpassword" VARCHAR(255) NOT NULL,
    "useremail" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "usertypes" (
    "usertype_id" SERIAL NOT NULL,
    "usertype_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "usertypes_pkey" PRIMARY KEY ("usertype_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name" ON "categories"("category_name");

-- CreateIndex
CREATE INDEX "parent_id" ON "categories"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_name" ON "menuitems"("item_name");

-- CreateIndex
CREATE INDEX "category_id" ON "menuitems"("category_id");

-- CreateIndex
CREATE INDEX "station_id" ON "menuitems"("station_id");

-- CreateIndex
CREATE INDEX "item_id" ON "orderitems"("item_id");

-- CreateIndex
CREATE INDEX "order_id" ON "orderitems"("order_id");

-- CreateIndex
CREATE INDEX "orderstatus_id" ON "orders"("orderstatus_id");

-- CreateIndex
CREATE INDEX "table_id" ON "orders"("table_id");

-- CreateIndex
CREATE INDEX "waiter_id" ON "orders"("waiter_id");

-- CreateIndex
CREATE UNIQUE INDEX "orderstatus_name" ON "orderstatus"("orderstatus_name");

-- CreateIndex
CREATE UNIQUE INDEX "station_name" ON "stations"("station_name");

-- CreateIndex
CREATE UNIQUE INDEX "table_name" ON "tables"("table_name");

-- CreateIndex
CREATE INDEX "tablestatus_id" ON "tables"("tablestatus_id");

-- CreateIndex
CREATE UNIQUE INDEX "tablestatus_name" ON "tablestatus"("tablestatus_name");

-- CreateIndex
CREATE INDEX "usertype_id" ON "users"("usertype_id");

-- CreateIndex
CREATE UNIQUE INDEX "UC_User" ON "users"("username", "useremail");

-- CreateIndex
CREATE UNIQUE INDEX "usertype_name" ON "usertypes"("usertype_name");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_ibfk_1" FOREIGN KEY ("parent_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menuitems" ADD CONSTRAINT "menuitems_ibfk_1" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menuitems" ADD CONSTRAINT "menuitems_ibfk_2" FOREIGN KEY ("station_id") REFERENCES "stations"("station_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_ibfk_1" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_ibfk_2" FOREIGN KEY ("item_id") REFERENCES "menuitems"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ibfk_1" FOREIGN KEY ("orderstatus_id") REFERENCES "orderstatus"("orderstatus_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ibfk_2" FOREIGN KEY ("waiter_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ibfk_3" FOREIGN KEY ("table_id") REFERENCES "tables"("table_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_ibfk_1" FOREIGN KEY ("tablestatus_id") REFERENCES "tablestatus"("tablestatus_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ibfk_1" FOREIGN KEY ("usertype_id") REFERENCES "usertypes"("usertype_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
