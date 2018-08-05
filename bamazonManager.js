
var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'juhi@1919',
	database: 'Bamazon'
});

//ManagerAction present menu options to the manager 
function managerAction() {
	
	// manager to select an option
	inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'Please select an option Below:',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			filter: function (val) {
				if (val === 'View Products for Sale') {
					return 'sale';
				} else if (val === 'View Low Inventory') {
					return 'lowInventory';
				} else if (val === 'Add to Inventory') {
					return 'addInventory';
				} else if (val === 'Add New Product') {
					return 'newProduct';
				} else {
					
					console.log('ERROR: Unsupported operation!');
					exit(1);
				}
			}
		}
	]).then(function(input) {
		
		//  the appropriate action based on the user input
		if (input.option ==='sale') {
			displayInventory();
		} else if (input.option === 'lowInventory') {
			displayLowInventory();
		} else if (input.option === 'addInventory') {
			addInventory();
		} else if (input.option === 'newProduct') {
			createNewProduct();
		} else {
			
			console.log('ERROR: Unsupported operation!');
			exit(1);
		}
	})
}

// displayInventory will retrieve the current inventory from  database 
function displayInventory() {

	// The db query string
	queryStr = 'SELECT * FROM products';

	
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('&-&-&-&-&-&-&-&-&-&-& \n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  /-/  ';
			strOut += 'Product Name: ' + data[i].product_name + '  /-/  ';
			strOut += 'Department: ' + data[i].department_name + '  /-/  ';
			strOut += 'Price: $' + data[i].price + '  /-/  ';
			strOut += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

		
		connection.end();
	})
}

// displayLowInventory is display a list of products with the available quantity below 100
function displayLowInventory() {
	
	// The db query string
	queryStr = 'SELECT * FROM products WHERE stock_quantity < 100';

	
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Low Inventory Items (below 100): ');
		console.log('_-_-_-_-_-_-_-_-_-_-_-_-_ \n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '  //  ';
			strOut += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

		connection.end();
	})
}

// validateInteger makes sure that the user is enter only positive integers for inputs
function validateInteger(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// validateNumeric makes sure that the user is enter only positive numbers for inputs
function validateNumeric(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

// addInventory a user can adding additional quantity to an existing item
function addInventory() {
	
	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID for stock_count Adding.',
			validate: validateInteger,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
			validate: validateInteger,
			filter: Number
		}
	]).then(function(input) {
		
		var item = input.item_id;
		var addQuantity = input.quantity;

		
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				addInventory();

			} else {
				var productData = data[0];

				console.log('Updating Inventory...');

				// The updating query string
				var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;
				
				// Update the inventory
				connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					
					connection.end();
				})
			}
		})
	})
}

// createNewProduct will guide the user for adding a new product to the database
function createNewProduct() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
			validate: validateNumeric
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
			validate: validateInteger
		}
	]).then(function(input) {

		console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +  
									   '    department_name = ' + input.department_name + '\n' +  
									   '    price = ' + input.price + '\n' +  
									   '    stock_quantity = ' + input.stock_quantity);

	
		var queryStr = 'INSERT INTO products SET ?';

		// Add new product into db
		connection.query(queryStr, input, function (error, results, fields) {
			if (error) throw error;

			console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

			connection.end();
		});
	})
}


function runBamazon() {

    managerAction();
}

runBamazon();
