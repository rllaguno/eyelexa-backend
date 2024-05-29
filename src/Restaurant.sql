DROP DATABASE IF EXISTS eyelexa;

CREATE DATABASE eyelexa;

use eyelexa;

create table restaurant(
	id int primary key auto_increment,
    restaurant_name varchar(50),
    menu TEXT
);
    
INSERT INTO restaurant (restaurant_name, menu) VALUES ('McDonalds', 'Big Mac $120, Papas $50, Coca Cola $40');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Burger King', 'Whopper $110, Papas $50, Coca Cola $30');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('KFC', 'Pollo $130, Papas $40, Coca Cola $35');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Pizza Hut', 'Pizza $150, Coca Cola $40');

SELECT * FROM restaurant;