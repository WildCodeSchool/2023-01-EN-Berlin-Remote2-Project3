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
INSERT INTO "tablestatus" VALUES (1,'available'),(6,'cleanRequired'),(7,'connected'),(2,'occupied'),(5,'out of service'),(4,'requested'),(3,'reserved');
INSERT INTO "tables" VALUES (1,'L-1',2),(2,'L-2',4),(3,'L-3',6),(4,'L-4',2),(5,'L-5',1),(6,'L-6',4),(7,'G-1',2),(8,'G-2',3),(9,'G-3',6),(10,'G-4',2),(11,'G-5',2),(12,'G-6',7),(13,'PDR',4),(14,'P-1-1',4),(15,'P-1-2',3),(16,'P-1-3',2),(17,'P-1-4',1),(18,'P-1-5',6),(19,'P-1-6',3),(20,'P-1-7',2),(21,'P-1-8',7),(22,'P-1-9',6),(23,'P-1-10',5),(24,'P-1-11',5),(25,'P-2-1',2),(26,'P-2-2',6),(27,'P-2-3',1),(28,'P-2-4',1),(29,'P-2-5',1),(30,'P-2-6',1),(31,'M-1',2),(32,'M-2',7),(33,'M-3',7),(34,'M-4',1),(35,'M-5',6),(36,'M-6',3),(37,'M-7',2),(38,'M-8',1),(39,'M-9',6);
INSERT INTO "usertypes" VALUES (4,'barman'),(2,'foodRunner'),(3,'kitchen'),(1,'waiter');
INSERT INTO "users" VALUES (1,1,'david','david123','david@gmail.com'),(2,1,'emilyG','0017','emilyLove@gmail.com'),(3,1,'helper','00913','manager@gmail.com'),(4,2,'chris','1134','christopher@gmail.com'),(5,2,'davidBowie','88212D','bowie@gmail.com'),(6,3,'kitchenStaff','kitchen123','kitchen@gmail.com'),(7,4,'barStaff','barMain11','mainbar@gmail.com'),(8,1,'george','george123','geroge@gmail.com'),(9,1,'dejan','dejan123','dejan@gmail.com'),(10,1,'orwa','orwa123','orwa@gmail.com');
INSERT INTO "orderstatus" VALUES (4,'cancelled'),(3,'completed'),(7,'failed'),(1,'in progress'),(5,'on hold'),(2,'ready'),(6,'refunded');
INSERT INTO "orders" VALUES (1,1,10,1),(2,5,10,4),(3,2,8,7),(4,4,8,10),(5,6,8,11),(6,3,9,16),(7,7,9,20),(8,1,9,25),(9,1,2,31),(10,2,1,37);
INSERT INTO "categories" VALUES (1,'Appetizers',NULL),(2,'Soups/Salads',NULL),(3,'Entrees/Main',NULL),(4,'Pasta/Noodles',NULL),(5,'Seafood',NULL),(6,'Beef/Pork',NULL),(7,'Vegetarian/Vegan',NULL),(8,'Desserts',NULL),(9,'kidsMenu',NULL),(10,'Beverages',NULL),(11,'nonAlcoholic',10),(12,'alcoholic',10);
INSERT INTO "stations" VALUES (4,'Cocktails-Station/Bar'),(5,'Coffee-Station/Bar'),(1,'Cold-Side/Kitchen'),(2,'Hot-Side/Kitchen'),(3,'Pizza-side/Kitchen'),(6,'Runner/Bar');
INSERT INTO "menuitems" VALUES (1,'Loaded Nachos',10.00,1,2),(2,'Vegetable Spring Rolls',10.00,1,1),(3,'Tomato Bruschetta',12.00,1,2),(4,'Creamy Tomato Soup',9.00,2,1),(5,'Classic Caesar Salad',8.00,2,1),(6,'Miso Soup',9.00,2,1),(7,'Grilled Salmon',15.00,3,2),(8,'Beef Stew',20.00,3,2),(9,'Vegetable Curry',15.00,3,2),(10,'Spaghetti Carbonara',11.00,4,2),(11,'Pad Thai',14.00,4,2),(12,'Vegetable Lasagna',13.00,4,2),(13,'Grilled Halibut',17.00,5,2),(14,'Shrimp Scampi',14.00,5,1),(15,'Fish Tacos',14.00,5,2),(16,'Filet Mignon',25.00,6,2),(17,'BBQ Pork Ribs',21.00,6,2),(18,'Sautéed Beef and Broccoli',23.00,6,2),(19,'Vegetable Stir-Fry',14.00,7,2),(20,'Lentil Curry',13.00,7,2),(21,'Creme Brulee',12.00,8,1),(22,'Apple Pie',6.00,8,1),(23,'Chocolate Lava Cake',10.00,8,1),(24,'Tiramisu',5.00,8,1),(25,'Pizza Margarita',6.00,9,3),(26,'Pizza capricciosa',10.00,9,3),(27,'French fries',5.00,9,2),(28,'Chiken fingers',6.00,9,2),(29,'Coca-Cola',3.00,11,6),(30,'Fanta',3.00,11,6),(31,'Sprite',3.00,11,6),(32,'Dr.Pepper',3.00,11,6),(33,'Orange Juice',3.00,11,6),(34,'Fresh',5.00,11,4),(35,'Apple Juice',3.00,11,6),(36,'Cranberry Juice',3.00,11,6),(37,'Espresso',2.00,11,5),(38,'macchiato',3.00,11,5),(39,'late macchiato',4.00,11,5),(40,'Cappuccino',3.00,11,5),(41,'Mocha',4.00,11,5),(42,'Cold Brew',3.00,11,5),(43,'Margarita',5.00,12,4),(44,'Mojito',5.00,12,4),(45,'Old Fashioned',6.00,12,4),(46,'Cosmopolitan',6.00,12,4),(47,'Daiquiri',6.00,12,4),(48,'Manhattan',6.00,12,4);
INSERT INTO "orderitems" VALUES (1,1,44,1,'2023-01-12 21:14:31',NULL),(2,1,29,3,'2023-01-12 21:15:00',NULL),(3,1,34,1,'2023-01-12 21:15:30',NULL),(4,1,15,2,'2023-01-12 21:24:31',NULL),(5,1,22,1,'2023-01-12 21:25:00',NULL),(6,1,5,2,'2023-01-12 21:25:11',NULL),(7,1,27,2,'2023-01-12 21:25:21',NULL),(8,1,28,3,'2023-01-12 22:15:21',NULL),(9,1,24,1,'2023-01-12 22:15:59',NULL),(10,2,31,1,'2023-01-12 20:14:31',NULL),(11,2,29,1,'2023-01-12 20:15:00',NULL),(12,2,17,1,'2023-01-12 20:20:05',NULL),(13,2,16,1,'2023-01-12 20:20:35',NULL),(14,2,31,1,'2023-01-12 20:44:11',NULL),(15,3,32,1,'2023-01-12 20:12:31',NULL),(16,3,33,3,'2023-01-12 20:12:15',NULL),(17,3,3,1,'2023-01-12 20:13:55',NULL),(18,3,13,1,'2023-01-12 20:14:22',NULL),(19,3,20,2,'2023-01-12 20:15:22',NULL),(20,3,23,1,'2023-01-12 20:55:11',NULL),(21,3,21,3,'2023-01-12 20:55:55',NULL),(22,4,44,2,'2023-01-12 20:30:15',NULL),(23,4,44,1,'2023-01-12 20:34:15',NULL),(24,4,47,4,'2023-01-12 22:32:31',NULL),(25,5,29,1,'2023-01-12 20:30:15',NULL),(26,5,30,2,'2023-01-12 22:31:31',NULL),(27,5,31,1,'2023-01-12 20:31:55',NULL),(28,5,10,3,'2023-01-12 23:00:31',NULL),(29,5,11,1,'2023-01-12 23:31:55',NULL),(30,5,21,1,'2023-01-12 23:41:55',NULL),(31,5,37,4,'2023-01-12 23:43:55',NULL),(32,6,39,1,'2023-01-12 20:30:15',NULL),(33,6,34,2,'2023-01-12 22:31:31',NULL),(34,6,35,1,'2023-01-12 20:31:55',NULL),(35,6,4,1,'2023-01-12 20:35:15',NULL),(36,6,8,2,'2023-01-12 20:35:35',NULL),(37,6,16,1,'2023-01-12 20:35:55',NULL),(38,6,24,4,'2023-01-12 21:25:55',NULL),(39,6,29,2,'2023-01-12 21:26:15',NULL),(40,7,39,1,'2023-01-12 20:30:15',NULL),(41,7,34,2,'2023-01-12 22:31:31',NULL),(42,7,35,1,'2023-01-12 20:31:55',NULL),(43,7,26,12,'2023-01-12 20:36:55',NULL),(44,7,17,5,'2023-01-12 20:37:25',NULL),(45,7,39,3,'2023-01-12 23:46:15',NULL),(46,7,26,10,'2023-01-12 23:46:55',NULL),(47,8,37,4,'2023-01-12 21:23:15',NULL),(48,8,47,2,'2023-01-12 22:14:51',NULL),(49,8,43,4,'2023-01-12 22:42:55',NULL),(50,8,12,1,'2023-01-12 22:43:55',NULL),(51,8,1,3,'2023-01-12 22:44:12',NULL),(52,8,6,3,'2023-01-12 22:46:12',NULL),(53,8,26,3,'2023-01-12 23:14:42',NULL),(54,8,25,2,'2023-01-12 23:14:52',NULL),(55,8,44,2,'2023-01-12 23:15:22',NULL),(56,9,34,2,'2023-01-12 19:23:15',NULL),(57,9,29,2,'2023-01-12 19:34:51',NULL),(58,9,29,10,'2023-01-12 19:36:55',NULL),(59,9,34,4,'2023-01-12 19:37:15',NULL),(60,9,26,8,'2023-01-12 20:00:15',NULL),(61,9,27,3,'2023-01-12 20:01:25',NULL),(62,9,13,2,'2023-01-12 20:01:55',NULL),(63,9,19,2,'2023-01-12 20:02:25',NULL),(64,9,35,5,'2023-01-12 20:42:25',NULL),(65,9,34,4,'2023-01-12 20:42:25',NULL),(66,9,36,2,'2023-01-12 20:42:45',NULL),(67,10,40,4,'2023-01-12 18:23:15',NULL),(68,10,8,1,'2023-01-12 18:33:15',NULL),(69,10,13,1,'2023-01-12 18:33:45',NULL),(70,10,21,2,'2023-01-12 18:34:15',NULL),(71,10,23,4,'2023-01-12 18:55:15',NULL),(72,10,34,2,'2023-01-12 19:14:27',NULL),(73,10,29,2,'2023-01-12 19:14:37',NULL);
