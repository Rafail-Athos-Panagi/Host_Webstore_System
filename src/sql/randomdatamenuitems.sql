INSERT INTO `menuitems` (`itemName`, `itemImage`, `itemPrice`, `itemCategory`, `itemDescription`, `itemIngredients`, `itemStatus`, `itemDiscountPrice`, `itemTimeOfDay`)
VALUES 
('Classic Burger', 'classic_burger.jpg', 10.99, 'Burgers', 'Juicy beef patty with lettuce, tomato and pickles on a toasted bun.', 'Beef patty, lettuce, tomato, pickles, bun', 1, NULL, 'Day'),
('Veggie Burger', 'veggie_burger.jpg', 9.99, 'Burgers', 'Grilled vegetable patty with avocado and sprouts on a whole grain bun.', 'Grilled vegetable patty, avocado, sprouts, whole grain bun', 1, NULL, 'Day'),

('Caesar Salad', 'caesar_salad.jpg', 8.99, 'Salads', 'Fresh romaine lettuce with garlic croutons and grated parmesan cheese, tossed in a tangy Caesar dressing.', 'Romaine lettuce, garlic croutons, parmesan cheese, Caesar dressing', 1, NULL, 'Night'),
('Greek Salad', 'greek_salad.jpg', 9.99, 'Salads', 'Crisp lettuce, juicy tomatoes, cucumbers, red onions, and feta cheese in a lemon-herb dressing.', 'Lettuce, tomatoes, cucumbers, red onions, feta cheese, lemon-herb dressing', 1, NULL, 'Night'),

('Grilled Chicken', 'grilled_chicken.jpg', 12.99, 'Hot Dishes', 'Tender grilled chicken breast served with roasted vegetables and garlic mashed potatoes.', 'Chicken breast, roasted vegetables, mashed potatoes', 1, NULL, 'Day'),
('Beef Stroganoff', 'beef_stroganoff.jpg', 16.99, 'Hot Dishes', 'Tender beef strips in a creamy mushroom sauce served over egg noodles.', 'Beef strips, mushrooms, cream sauce, egg noodles', 1, NULL, 'Day'),

('Fish and Chips', 'fish_and_chips.jpg', 14.99, 'Dishes Of The Day', 'Crispy battered cod fillets served with a side of French fries and tartar sauce.', 'Cod fillets, batter, French fries, tartar sauce', 1, NULL, 'Night'),
('Meatloaf', 'meatloaf.jpg', 13.99, 'Dishes Of The Day', 'Homestyle meatloaf served with mashed potatoes and gravy.', 'Ground beef, breadcrumbs, onions, ketchup, mashed potatoes, gravy', 1, NULL, 'Night'),

('French Fries', 'french_fries.jpg', 4.99, 'Sides', 'Crispy golden French fries sprinkled with sea salt.', 'Potatoes, salt, oil', 1, NULL, 'Day'),
('Onion Rings', 'onion_rings.jpg', 6.99, 'Sides', 'Crunchy breaded onion rings served with a zesty dipping sauce.', 'Onions, flour, breadcrumbs, egg, oil, sauce', 1, NULL, 'Night'),

('Chicken Caesar Wrap', 'chicken_caesar_wrap.jpg', 8.99, 'A la carte', 'Grilled chicken with romaine lettuce, parmesan cheese, and Caesar dressing wrapped in a flour tortilla.', 'Grilled chicken, romaine lettuce, parmesan cheese, Caesar dressing, flour tortilla', 1, NULL, 'Day'),
('Steak Fajitas', 'steak_fajitas.jpg', 15.99, 'A la carte', 'Grilled steak strips with bell peppers and onions, served with warm tortillas, sour cream, and guacamole.', 'Steak strips, bell peppers, onions, tortillas, sour cream, guacamole', 1, NULL, 'Night'),

('Chicken Noodle Soup', 'chicken_noodle_soup.jpg', 6.99, 'Dishes Of The Day', 'Classic chicken noodle soup with tender chicken and noodles in a rich broth.', 'Chicken, noodles, vegetables, broth', 1, NULL, 'Day'),
('Beef Chili', 'beef_chili.jpg', 8.99, 'Dishes Of The Day', 'Hearty beef chili with beans and spices, topped with cheddar cheese and sour cream.', 'Ground beef, beans, tomatoes, spices, cheddar cheese, sour cream', 1, NULL, 'Night'),

('Grilled Shrimp Salad', 'grilled_shrimp_salad.jpg', 12.99, 'Salads', 'Grilled shrimp served on a bed of mixed greens with cherry tomatoes, cucumbers, and balsamic vinaigrette.', 'Grilled shrimp, mixed greens, cherry tomatoes, cucumbers, balsamic vinaigrette', 1, NULL, 'Day'),
('Caprese Salad', 'caprese_salad.jpg', 9.99, 'Salads', 'Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with olive oil and balsamic glaze.', 'Fresh mozzarella, tomatoes, basil, olive oil, balsamic glaze', 1, NULL, 'Night'),

('Grilled Salmon', 'grilled_salmon.jpg', 17.99, 'Hot Dishes', 'Flaky grilled salmon served with roasted vegetables and a side of quinoa.', 'Salmon fillet, vegetables, quinoa', 1, NULL, 'Day'),
('Pork Tenderloin', 'pork_tenderloin.jpg', 14.99, 'Hot Dishes', 'Tender pork tenderloin with roasted apples and sweet potato mash.', 'Pork tenderloin, apples, sweet potato, butter, brown sugar', 1, NULL, 'Night'),

('Sweet Potato Fries', 'sweet_potato_fries.jpg', 5.99, 'Sides', 'Crispy sweet potato fries dusted with cinnamon and served with honey mustard dipping sauce.', 'Sweet potatoes, cinnamon, oil, honey mustard sauce', 1, NULL, 'Day'),
('Garlic Bread', 'garlic_bread.jpg', 3.99, 'Sides', 'Warm garlic bread brushed with butter and sprinkled with parsley.', 'French bread, butter, garlic, parsley', 1, NULL, 'Night');
select *
from menuitems
where itemTimeOfDay = "Day";

--  INTO `host_website`.`menuitems` (`itemID`, `itemName`, `itemImage`, `itemPrice`, `itemCategory`, `itemDescription`, `itemIngredients`, `itemStatus`, `itemDiscountPrice`, `itemTimeOfDay`) VALUES ('7', 'Hulk Burger', 'burger.jpg', '12.2', 'Burger', 'It is a fucking burger and it sucks ass!!', 'beef patty, tomato, lollo letuce, onion rings, bacon, egg, mayonaise', '0', '1','Day');