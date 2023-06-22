INSERT INTO `users` (`userID`, `email`, `password`) VALUES
(3, 'john@example.com', SHA2("password2",0)),    -- password2
(4, 'user5@example.com', SHA2("password3",0)),
(5, 'bob@example.com', SHA2("password4",0)),
(6, 'amy@example.com', SHA2("password5",0)),
(7, 'mike@example.com', SHA2("password6",0)),
(8, 'jane@example.com', SHA2("password7",0)),
(9, 'user1@example.com', SHA2("password8",0)),
(10, 'user2@example.com', SHA2("password9",0)),
(11, 'user3@example.com', SHA2("password10",0)),
(12, 'user4@example.com', SHA2("password11",0));

select *
from users;

update users set password = SHA2("password2",0) where userID = 3;