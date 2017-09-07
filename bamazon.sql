CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(item_id integer(10) auto_increment NOT NULL,
product_name VARCHAR(224) NOT NULL,
department_name VARCHAR(224) NOT NULL,
price INTEGER (10) NOT NULL,
stock_quantity  INTEGER (10)NOT NULL,
primary key(item_id));

insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Iphone 5', 'IT','2', 600, 5);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Iphone 6', 'IT', '2',650, 5);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Iphone 7', 'IT', '2',700, 5);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Iphone', 'IT', '2', 999, 5);

insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Slippers', 'Wears','3', 10, 20);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Shoes', 'Wears', '3', 12, 20);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values('Shirt', 'Wears', '3', 50, 11);

insert into products (product_name, department_name, department_id, price, stock_quantity) Values('TV','Electronic','1', 100, 3);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values( 'VCD','Electronic', '1', 40, 7);
insert into products (product_name, department_name, department_id, price, stock_quantity) Values( 'Radio', 'Electronic','1', 50, 4);

select * FROM products;



CREATE table departments(
department_id integer(10) auto_increment not null,
department_name varchar(225) not null,
over_head_costs integer(225) not null,
primary key(department_id)
);

ALTER TABLE products drop department_name;
ALTER TABLE departments modify over_head_costs integer default 0;
select * FROM departments;