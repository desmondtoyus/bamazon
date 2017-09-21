DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(item_id integer(10) auto_increment NOT NULL,
product_name VARCHAR(224) NOT NULL,
department_id integer NOT NULL,
price INTEGER (10) NOT NULL,
stock_quantity  INTEGER (10) NOT NULL,
product_sales  INTEGER (10) default 0 NULL,
primary key(item_id));

insert into products (product_name,  department_id, price, stock_quantity) Values('Iphone 5','2', 600, 5);
insert into products (product_name, department_id, price, stock_quantity) Values('Iphone 6', '2',650, 5);
insert into products (product_name,  department_id, price, stock_quantity) Values('Iphone 7', '2',700, 5);
insert into products (product_name, department_id, price, stock_quantity) Values('Iphone', '2', 999, 5);

insert into products (product_name,  department_id, price, stock_quantity) Values('Slippers','3', 10, 20);
insert into products (product_name, department_id, price, stock_quantity) Values('Shoes', '3', 12, 20);
insert into products (product_name, department_id, price, stock_quantity) Values('Shirt', '3', 50, 11);

insert into products (product_name, department_id, price, stock_quantity) Values('TV','1', 100, 3);
insert into products (product_name, department_id, price, stock_quantity) Values( 'VCD', '1', 40, 7);
insert into products (product_name, department_id, price, stock_quantity) Values( 'Radio','1', 50, 4);

select * FROM products;



CREATE table departments(
department_id integer(10) auto_increment not null,
department_name varchar(225) not null,
over_head_costs integer(225) default 0 not null,
product_sales integer(225) default 0,
primary key(department_id)
);

insert into departments (department_name, over_head_costs) Values('Electronics', 2000);
insert into departments (department_name, over_head_costs) Values('IT', 1200);
insert into departments (department_name, over_head_costs) Values('Wears',200);
insert into departments (department_name, over_head_costs) Values('Household', 450);