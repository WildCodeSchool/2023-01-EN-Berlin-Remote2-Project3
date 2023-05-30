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


-- INSERT INTO STATEMANS 
INSERT INTO "tablestatus" ("tablestatus_name") VALUES ('available'),('cleanRequired'),('connected'),('occupied'),('out of service'),('requested'),('reserved');
INSERT INTO "tables" ("table_name", "tablestatus_id") VALUES ('L-1',2),('L-2',4),('L-3',6),('L-4',2),('L-5',1),('L-6',4),('G-1',2),('G-2',3),('G-3',6),('G-4',2),('G-5',2),('G-6',7),('PDR',4),('P-1-1',4),('P-1-2',3),('P-1-3',2),('P-1-4',1),('P-1-5',6),('P-1-6',3),('P-1-7',2),('P-1-8',7),('P-1-9',6),('P-1-10',5),('P-1-11',5),('P-2-1',2),('P-2-2',6),('P-2-3',1),('P-2-4',1),('P-2-5',1),('P-2-6',1),('M-1',2),('M-2',7),('M-3',7),('M-4',1),('M-5',6),('M-6',3),('M-7',2),('M-8',1),('M-9',6);
INSERT INTO "usertypes" ("usertype_name") VALUES ('waiter'),('kitchen'),('barman'),('runner');
INSERT INTO "users" ("usertype_id", "username", "userpassword", "useremail") VALUES (1,'david','david123','david@gmail.com'),(1,'emilyG','0017','emilyLove@gmail.com'),(1,'helper','00913','manager@gmail.com'),(2,'chris','1134','christopher@gmail.com'),(2,'davidBowie','88212D','bowie@gmail.com'),(3,'kitchenStaff','kitchen123','kitchen@gmail.com'),(4,'barStaff','barMain11','mainbar@gmail.com'),(1,'george','george123','geroge@gmail.com'),(1,'dejan','dejan123','dejan@gmail.com'),(1,'orwa','orwa123','orwa@gmail.com');
INSERT INTO "orderstatus" ("orderstatus_name") VALUES ('ordered'),('in progress'),('ready'),('served'),('rejected'),('cancelled'),('failed');
INSERT INTO "orders" VALUES (1,1,10,1),(2,5,10,4),(3,2,8,7),(4,4,8,10),(5,6,8,11),(6,3,9,16),(7,7,9,20),(8,1,9,25),(9,1,2,31),(10,2,1,37);
INSERT INTO "categories" ("category_name", "parent_id") VALUES ('Appetizers',NULL),('Soups/Salads',NULL),('Entrees/Main',NULL),('Pasta/Noodles',NULL),('Seafood',NULL),('Beef/Pork',NULL),('Vegetarian/Vegan',NULL),('Desserts',NULL),('kidsMenu',NULL),('Beverages',NULL),('nonAlcoholic',10),('alcoholic',10);
INSERT INTO "stations" ("station_name") VALUES ('Cocktails-Station/Bar'),('Coffee-Station/Bar'),('Cold-Side/Kitchen'),('Hot-Side/Kitchen'),('Pizza-side/Kitchen'),('Runner/Bar');
INSERT INTO "menuitems" ("item_name", "price", "category_id", "station_id") VALUES ('Loaded Nachos',10.00,1,2),('Vegetable Spring Rolls',10.00,1,1),('Tomato Bruschetta',12.00,1,2),('Creamy Tomato Soup',9.00,2,1),('Classic Caesar Salad',8.00,2,1),('Miso Soup',9.00,2,1),('Grilled Salmon',15.00,3,2),('Beef Stew',20.00,3,2),('Vegetable Curry',15.00,3,2),('Spaghetti Carbonara',11.00,4,2),('Pad Thai',14.00,4,2),('Vegetable Lasagna',13.00,4,2),('Grilled Halibut',17.00,5,2),('Shrimp Scampi',14.00,5,1),('Fish Tacos',14.00,5,2),('Filet Mignon',25.00,6,2),('BBQ Pork Ribs',21.00,6,2),('Sautéed Beef and Broccoli',23.00,6,2),('Vegetable Stir-Fry',14.00,7,2),('Lentil Curry',13.00,7,2),('Creme Brulee',12.00,8,1),('Apple Pie',6.00,8,1),('Chocolate Lava Cake',10.00,8,1),('Tiramisu',5.00,8,1),('Pizza Margarita',6.00,9,3),('Pizza capricciosa',10.00,9,3),('French fries',5.00,9,2),('Chiken fingers',6.00,9,2),('Coca-Cola',3.00,11,6),('Fanta',3.00,11,6),('Sprite',3.00,11,6),('Dr.Pepper',3.00,11,6),('Orange Juice',3.00,11,6),('Fresh',5.00,11,4),('Apple Juice',3.00,11,6),('Cranberry Juice',3.00,11,6),('Espresso',2.00,11,5),('macchiato',3.00,11,5),('late macchiato',4.00,11,5),('Cappuccino',3.00,11,5),('Mocha',4.00,11,5),('Cold Brew',3.00,11,5),('Margarita',5.00,12,4),('Mojito',5.00,12,4),('Old Fashioned',6.00,12,4),('Cosmopolitan',6.00,12,4),('Daiquiri',6.00,12,4),('Manhattan',6.00,12,4);
INSERT INTO "orderitems" ("order_id", "item_id", "quantity", "order_time", "served_time") VALUES (1,44,1,'2023-01-12 21:14:31',NULL),(1,29,3,'2023-01-12 21:15:00',NULL),(1,34,1,'2023-01-12 21:15:30',NULL),(1,15,2,'2023-01-12 21:24:31',NULL),(1,22,1,'2023-01-12 21:25:00',NULL),(1,5,2,'2023-01-12 21:25:11',NULL),(1,27,2,'2023-01-12 21:25:21',NULL),(1,28,3,'2023-01-12 22:15:21',NULL),(1,24,1,'2023-01-12 22:15:59',NULL),(2,31,1,'2023-01-12 20:14:31',NULL),(2,29,1,'2023-01-12 20:15:00',NULL),(2,17,1,'2023-01-12 20:20:05',NULL),(2,16,1,'2023-01-12 20:20:35',NULL),(2,31,1,'2023-01-12 20:44:11',NULL),(3,32,1,'2023-01-12 20:12:31',NULL),(3,33,3,'2023-01-12 20:12:15',NULL),(3,3,1,'2023-01-12 20:13:55',NULL),(3,13,1,'2023-01-12 20:14:22',NULL),(3,20,2,'2023-01-12 20:15:22',NULL),(3,23,1,'2023-01-12 20:55:11',NULL),(3,21,3,'2023-01-12 20:55:55',NULL),(4,44,2,'2023-01-12 20:30:15',NULL),(4,44,1,'2023-01-12 20:34:15',NULL),(4,47,4,'2023-01-12 22:32:31',NULL),(5,29,1,'2023-01-12 20:30:15',NULL),(5,30,2,'2023-01-12 22:31:31',NULL),(5,31,1,'2023-01-12 20:31:55',NULL),(5,10,3,'2023-01-12 23:00:31',NULL),(5,11,1,'2023-01-12 23:31:55',NULL),(5,21,1,'2023-01-12 23:41:55',NULL),(5,37,4,'2023-01-12 23:43:55',NULL),(6,39,1,'2023-01-12 20:30:15',NULL),(6,34,2,'2023-01-12 22:31:31',NULL),(6,35,1,'2023-01-12 20:31:55',NULL),(6,4,1,'2023-01-12 20:35:15',NULL),(6,8,2,'2023-01-12 20:35:35',NULL),(6,16,1,'2023-01-12 20:35:55',NULL),(6,24,4,'2023-01-12 21:25:55',NULL),(6,29,2,'2023-01-12 21:26:15',NULL),(7,39,1,'2023-01-12 20:30:15',NULL),(7,34,2,'2023-01-12 22:31:31',NULL),(7,35,1,'2023-01-12 20:31:55',NULL),(7,26,12,'2023-01-12 20:36:55',NULL),(7,17,5,'2023-01-12 20:37:25',NULL),(7,39,3,'2023-01-12 23:46:15',NULL),(7,26,10,'2023-01-12 23:46:55',NULL),(8,37,4,'2023-01-12 21:23:15',NULL),(8,47,2,'2023-01-12 22:14:51',NULL),(8,43,4,'2023-01-12 22:42:55',NULL),(8,12,1,'2023-01-12 22:43:55',NULL),(8,1,3,'2023-01-12 22:44:12',NULL),(8,6,3,'2023-01-12 22:46:12',NULL),(8,26,3,'2023-01-12 23:14:42',NULL),(8,25,2,'2023-01-12 23:14:52',NULL),(8,44,2,'2023-01-12 23:15:22',NULL),(9,34,2,'2023-01-12 19:23:15',NULL),(9,29,2,'2023-01-12 19:34:51',NULL),(9,29,10,'2023-01-12 19:36:55',NULL),(9,34,4,'2023-01-12 19:37:15',NULL),(9,26,8,'2023-01-12 20:00:15',NULL),(9,27,3,'2023-01-12 20:01:25',NULL),(9,13,2,'2023-01-12 20:01:55',NULL),(9,19,2,'2023-01-12 20:02:25',NULL),(9,35,5,'2023-01-12 20:42:25',NULL),(9,34,4,'2023-01-12 20:42:25',NULL),(9,36,2,'2023-01-12 20:42:45',NULL),(10,40,4,'2023-01-12 18:23:15',NULL),(10,8,1,'2023-01-12 18:33:15',NULL),(10,13,1,'2023-01-12 18:33:45',NULL),(10,21,2,'2023-01-12 18:34:15',NULL),(10,23,4,'2023-01-12 18:55:15',NULL),(10,34,2,'2023-01-12 19:14:27',NULL),(10,29,2,'2023-01-12 19:14:37',NULL);
