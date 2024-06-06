CREATE DATABASE eyelexa;

use eyelexa;

create table restaurant(
	id int primary key auto_increment,
    restaurant_name varchar(50),
    menu TEXT
);
    
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Chilaquiles Tec', 'Chilaquiles rojos o verdes, media orden 50 pesos, orden completa 75 pesos');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Little Caesars Pizza', 'Pizza pepperoni 99 pesos, pizza queso 89 pesos, crazy bread 34 pesos');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Carls Junior', 'Famous star, western bacon, chicken sandwich, sin combo 100 pesos, con combo 150 pesos');
INSERT INTO restaurant (restaurant_name, menu) VALUES ('Super Salads', 'Ensalada buffalo tender 130 pesos, ensalada cesar 120 pesos, torta bacon chicken 140 pesos');

SELECT * FROM restaurant;