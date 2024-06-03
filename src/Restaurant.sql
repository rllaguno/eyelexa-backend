DROP DATABASE IF EXISTS eyelexa;

CREATE DATABASE eyelexa;

use eyelexa;

create table restaurant(
	id int primary key auto_increment,
    restaurant_name varchar(50),
    menu TEXT
);
    
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Chilaquiles Tec', 'Chilaquiles Rojos o Verdes, Media orden $50, Orden completa $75');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Little Caesars Pizza', 'Pizza Pepperoni $99, Pizza Queso $89, Crazy Bread $34');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Carls Jr', 'Famous Star, Western Bacon, Chicken Sandwich, Sin combo $100, Con combo $150');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Super Salads', 'Ensalada Buffalo Tender $130, Ensalada Cesar $120, Torta Bacon Chicken $140');

SELECT * FROM restaurant;