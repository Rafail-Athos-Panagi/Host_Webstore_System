-- January 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('10', 'waiting', 100.00, '2023-01-01'),
('11', 'ready', 50.00, '2023-01-02'),
('3', 'in Progress', 150.00, '2023-01-05');

-- February 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('4', 'waiting', 250.00, '2023-02-05');

-- March 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('12', 'waiting', 80.00, '2023-03-01'),
('11', 'ready', 70.00, '2023-03-02'),
('5', 'cancelled', 90.00, '2023-03-03'),
('6', 'ready', 150.00, '2023-03-04');

-- April 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('7', 'ready', 60.00, '2023-04-01'),
('8', 'waiting', 80.00, '2023-04-05');

-- May 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('9', 'in Progress', 300.00, '2023-05-05');

-- June 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('10', 'in Progress', 50.00, '2023-06-01'),
('11', 'ready', 90.00, '2023-06-02'),
('3', 'in Progress', 300.00, '2023-06-05');

-- July 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('10', 'waiting', 50.00, '2023-07-01'),
('5', 'ready', 90.00, '2023-07-02'),
('6', 'cancelled', 120.00, '2023-07-03'),
('7', 'ready', 250.00, '2023-07-04'),
('8', 'in Progress', 300.00, '2023-07-05');

-- August 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('12', 'waiting', 50.00, '2023-08-01'),
('5', 'ready', 90.00, '2023-08-02'),
('3', 'in Progress', 300.00, '2023-08-05');

-- September 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('4', 'in Progress', 50.00, '2023-09-01'),
('8', 'ready', 90.00, '2023-09-02'),
('9', 'cancelled', 120.00, '2023-09-03'),
('10', 'ready', 250.00, '2023-09-04'),
('7', 'in Progress', 300.00, '2023-09-05');

-- October 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('7', 'in Progress', 50.00, '2023-10-01'),
('7', 'ready', 90.00, '2023-10-02'),
('9', 'cancelled', 120.00, '2023-10-03'),
('4', 'ready', 250.00, '2023-10-04'),
('3', 'in Progress', 300.00, '2023-10-05');

-- November 2023
INSERT INTO orders (userID, orderStatus, orderPrice, orderDate) VALUES
('6', 'in Progress', 50.00, '2023-11-01'),
('8', 'cancelled', 120.00, '2023-11-03'),
('9', 'ready', 250.00, '2023-11-04'),
('10', 'in Progress', 300.00, '2023-11-05');

select * 
from orders;

select email , firstName , lastName , streetName , houseNumber , city , area , postalCode , buildingName , orderStatus , orderPrice , orderDate , orderID
from users natural join customers natural join address natural join orders;
