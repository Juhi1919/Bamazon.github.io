
USE bamazon_DB;


INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Shampoo", "Beauty", 10.10, 20);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Conditinor", "Beauty", 10.20, 20);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Jeans", "Clothes", 20.20, 20);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Tshirt", "Clothes", 10.20, 20);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Dresses", "Clothes", 20.20, 20);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Shoes", "Footware", 50.20, 30);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Earing", "Jwellery", 50.20, 40);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Nackless", "Jwellery", 50.20, 50);

INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES ("Ring", "Jwellery", 20.10, 50);


select * from products;