-- CreateTable
CREATE TABLE `categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(30) NOT NULL,
    `parent_id` INTEGER NULL,

    UNIQUE INDEX `category_name`(`category_name`),
    INDEX `parent_id`(`parent_id`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menuitems` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(50) NOT NULL,
    `price` DECIMAL(7, 2) NULL,
    `category_id` INTEGER NOT NULL,
    `station_id` INTEGER NOT NULL,

    UNIQUE INDEX `item_name`(`item_name`),
    INDEX `category_id`(`category_id`),
    INDEX `station_id`(`station_id`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderitems` (
    `orderitems_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `order_time` DATETIME(0) NOT NULL,
    `served_time` DATETIME(0) NULL,

    INDEX `item_id`(`item_id`),
    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`orderitems_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderstatus_id` INTEGER NOT NULL,
    `waiter_id` INTEGER NOT NULL,
    `table_id` INTEGER NOT NULL,

    INDEX `orderstatus_id`(`orderstatus_id`),
    INDEX `table_id`(`table_id`),
    INDEX `waiter_id`(`waiter_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderstatus` (
    `orderstatus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderstatus_name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `orderstatus_name`(`orderstatus_name`),
    PRIMARY KEY (`orderstatus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stations` (
    `station_id` INTEGER NOT NULL AUTO_INCREMENT,
    `station_name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `station_name`(`station_name`),
    PRIMARY KEY (`station_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tables` (
    `table_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(30) NOT NULL,
    `tablestatus_id` INTEGER NOT NULL,

    UNIQUE INDEX `table_name`(`table_name`),
    INDEX `tablestatus_id`(`tablestatus_id`),
    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tablestatus` (
    `tablestatus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tablestatus_name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tablestatus_name`(`tablestatus_name`),
    PRIMARY KEY (`tablestatus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usertype_id` INTEGER NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `userpassword` VARCHAR(255) NOT NULL,
    `useremail` VARCHAR(50) NOT NULL,

    INDEX `usertype_id`(`usertype_id`),
    UNIQUE INDEX `UC_User`(`username`, `useremail`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usertypes` (
    `usertype_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usertype_name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `usertype_name`(`usertype_name`),
    PRIMARY KEY (`usertype_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menuitems` ADD CONSTRAINT `menuitems_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menuitems` ADD CONSTRAINT `menuitems_ibfk_2` FOREIGN KEY (`station_id`) REFERENCES `stations`(`station_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderitems` ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderitems` ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `menuitems`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`orderstatus_id`) REFERENCES `orderstatus`(`orderstatus_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`waiter_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`table_id`) REFERENCES `tables`(`table_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tables` ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`tablestatus_id`) REFERENCES `tablestatus`(`tablestatus_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`usertype_id`) REFERENCES `usertypes`(`usertype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

