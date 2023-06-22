CREATE DATABASE IF NOT EXISTS host_website;
USE host_website;

CREATE TABLE IF NOT EXISTS `users`(
	`userID` INT AUTO_INCREMENT,
    `email` VARCHAR(60),
    `password` VARCHAR(256),
    PRIMARY KEY (`userID`),
    CONSTRAINT unique_email UNIQUE (`email`)
);

CREATE TABLE IF NOT EXISTS `customers`(
    `userID` INT,
    `firstName` VARCHAR(25),
    `lastName` VARCHAR(25),
    `dateCreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(`userID`) REFERENCES `users`(`userID`)
);

CREATE TABLE IF NOT EXISTS `address`(
    `userID` INT,
    `streetName` TINYTEXT,
    `houseNumber` INT,
    `city` VARCHAR(15),
    `area` VARCHAR(30),
    `postalCode` INT,
    `phoneNumber` INT,
    `buildingName` TINYTEXT,
    `flatNumber` VARCHAR(8),
    `specialInstructions` TINYTEXT,
    FOREIGN KEY(`userID`) REFERENCES `users`(`userID`)
);

CREATE TABLE IF NOT EXISTS `admins`(
	`userID` INT,
	FOREIGN KEY(`userID`) REFERENCES `users`(`userID`)
);

CREATE TABLE IF NOT EXISTS `menu`(
	`menuversion` int
);

CREATE TABLE IF NOT EXISTS `menuitems`(
    `itemID` INT AUTO_INCREMENT,
    `itemName` VARCHAR(60),
    `itemImage` TINYTEXT,
    `itemPrice` FLOAT,
    `itemCategory` varchar(20),
    `itemDescription` TINYTEXT,
    `itemIngredients` TEXT,
    `itemStatus` boolean,
    `itemTimeOfDay` varchar(5),
    `itemAllergens` varchar(20),
    PRIMARY KEY (itemID)
);

CREATE TABLE IF NOT EXISTS `menuRepeatDays`(
	`itemID` INT,
    `dayOfTheWeek` VARCHAR(10),
    FOREIGN KEY(`itemID`) REFERENCES menuitems(`itemID`)
);

CREATE TABLE IF NOT EXISTS `menuExtraItems`(
	`extraItemName`VARCHAR(20) NOT NULL,
    `extraItemPrice` float NOT NULL,
    `itemID`INT,
    `extraItemStatus` boolean,
    PRIMARY KEY(`itemID`,`extraItemName`),
    FOREIGN KEY (`itemID`) REFERENCES `menuitems`(`itemID`)
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS `orders`(
    `orderID` INT AUTO_INCREMENT,
    `userID` INT,
    `orderStatus` VARCHAR(15),
    `orderPrice` FLOAT,
    `orderDate` DATE,
    `orderTimeOfStatus` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `orderFirstTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`orderID`),
    FOREIGN KEY (`userID`) REFERENCES `users`(`userID`)
);


CREATE TABLE IF NOT EXISTS `orderdetails`(
	`orderedItemID` INT NOT NULL auto_increment,
    `orderID` INT NOT NULL,
    `itemID` INT NOT NULL,
    `itemPrice` FLOAT,
    `quantity` INT,
    `comment` TINYTEXT,
    PRIMARY KEY(`orderedItemID`),
    FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`),
    FOREIGN KEY (`itemID`) REFERENCES `menuitems`(`itemID`)
);

CREATE TABLE IF NOT EXISTS `extraItemsOrderDetails` (
	`orderID` INT NOT NULL,
    `itemID` INT NOT NULL,
	`extraItemName` VARCHAR(20) NOT NULL,
    `extraItemPrice` float NOT NULL,
    `orderedQuantity` INT NOT NULL,
    `orderedItemID` INT NOT NULL,
     FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`),
	 FOREIGN KEY (`itemID`) REFERENCES `menuitems`(`itemID`),
     FOREIGN KEY (`orderedItemID`) REFERENCES `orderdetails`(`orderedItemID`)
);

CREATE TABLE IF NOT EXISTS `customerMessages`(
    `messageID` INT AUTO_INCREMENT,
    `email` VARCHAR(60),
    `reason` VARCHAR(20),
    `message` VARCHAR(500),
    `messageDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`messageID`)
);

CREATE TABLE IF NOT EXISTS `restaurant`(
    `open` BOOLEAN
);

INSERT INTO `restaurant` values(1);

INSERT INTO users VALUES (DEFAULT, "superuser@host.com",SHA2("superuser",0));
INSERT INTO admins VALUES (1);

INSERT INTO users VALUES (DEFAULT, "worker@host.com",SHA2("worker",0));
INSERT INTO admins VALUES (2);