-- Create a database called 'Bamazon'--
CREATE DATABASE Bamazon;

USE Bamazon;

-- Create a table called 'products'--
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL
);

--Insert data into 'products' Table--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Dove Shampoo', 'Beauty', 5.75, 50),
		('Dove Conditioner', 'Beauty', 6.25, 50),
        ('Charcoal Mask', 'Beauty', 4.45, 50),
		('Ziplock Bag', 'Grocery', 5.99, 90),
		('Paper Towels', 'Grocery', 4.20, 40),
        ('Orange Juice', 'Grocery', 4.45, 60),
		('Apples', 'Produce', 1, 100),
		('Bannana', 'Produce', 1, 100),
        ('Avacado', 'Produce', 1, 60),
		('Pensil', 'School Tool', 0.90, 80),
		('Eraser', 'School Tool', 0.90, 90);

select * from products;