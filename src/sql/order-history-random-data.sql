USE host_website;

INSERT INTO users (userID,email,password) Values
(DEFAULT,'email@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'); -- frist column match match second column of table orders

INSERT INTO users (userID,email,password) Values
(DEFAULT,'test@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'); -- frist column match match second column of table orders

-- INSERT INTO users (userID,email,password) Values
-- (DEFAULT,'Rmail@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'); 



INSERT INTO orders (orderID,userID,orderStatus,orderPrice,orderDate) Values
(DEFAULT,1, 'pending', 10.00, '2023-01-02');  

INSERT INTO orders (orderID,userID,orderStatus,orderPrice,orderDate) Values
(DEFAULT,2, 'pending', 10.00, '2023-01-02');

INSERT INTO orders (orderID,userID,orderStatus,orderPrice,orderDate) Values
(DEFAULT,3, 'pending', 10.00, '2023-01-02');

INSERT INTO offers (offerID,offerPrice,startDate,expiryDate) VALUES
(DEFAULT,3,'2023-01-01','2023-01-02');

INSERT INTO offers (offerID,offerPrice,startDate,expiryDate) VALUES
(DEFAULT,4,'2023-01-03','2023-01-05'); -- offerID must match itemID in menuitems table 

INSERT INTO menuitems (itemID,itemName,itemImage,itemPrice,itemCategory,itemDescription,itemIngredients,itemStatus,itemDiscountPrice) VALUES
(DEFAULT,'ff','aaa',33,'ffew','fwqfr','ferf',true,3);

INSERT INTO menuitems (itemID,itemName,itemImage,itemPrice,itemCategory,itemDescription,itemIngredients,itemStatus,itemDiscountPrice) VALUES
(DEFAULT,'frrf','aaffa',33,'ffrtew','fwffqfr','feffrf',true,4);


INSERT INTO offeritems (offerID,itemID) VALUES
(1,1);

INSERT INTO offeritems (offerID,itemID) VALUES
(2,2); -- itemID with ItemID of orderdetails must match

INSERT INTO orderdetails (orderID,itemID,itemPrice,quantity) Values
(1,1,3,4);

INSERT INTO orderdetails (orderID,itemID,itemPrice,quantity) Values
(1,2,3,4);

select * 
from orders ;

select *
from orderdetails
where email="email@gmail.com";

select *
from menuitems;


select *
from orders 
where email="email@gmail.com";

