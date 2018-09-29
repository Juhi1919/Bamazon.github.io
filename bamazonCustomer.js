
var inquirer = require("inquirer");
var mysql = require('mysql');
var connection = mysql.createConnection ({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "juhi@1919",
  database: "bamazon_db"
});
//Check connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  allProduct();
}); 
function allProduct() {
  connection.query("SELECT * FROM products", function (err, res) {
    if(err) throw err;
      console.log("********************** Products For Sell **********************\n");
    for (var i = 0; i < res.length; i++) {
      console.log("item id = " + res[i].id + " || product: " + res[i].product_name + " || price: " + res[i].sale_price);
    }
    console.log("*****************************************************");
    displayProduct();
  });
}

function displayProduct() {
  var query = "SELECT * FROM bamazon.products";
  connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
             // console.log("\n Item ID: " + res[i].id + " " + "\n Name: "  + res[i].product_name + " " + "\n Price: $" + res[i].price);
      }
      inquirer.prompt([
          {
          name: "item",
          type: "input",
          message: "select the id which product you want.",
          
      },
      {
          name: "quantity",
          type: "input",
          message: "How many quantity you purchase?"
      }

      ]).then(function(product) {
          //CHECK Quanttity
          for(i = 0; i < 10; i++) {
              if(product.item == res[i].id && product.quantity > res[i].stock_quantity) 
              {
                  console.log("Not  available!");
                 
              }
              else if(product.item == res[i].id && product.quantity <= res[i].stock_quantity) 
              {
                  console.log("Order Placed!");
                  //SHOW PRICE
                  console.log("Your total Amount is" + " $" + product.quantity * res[i].sale_price);
                  newStockQuantity = res[i].stock_quantity - product.quantity;
                  //UPDATE DATABASE
                  connection.query("UPDATE products SET ? WHERE ?", [
                      {
                          stock_quantity:  newStockQuantity
                      },
                      {
                          item_id: product.item 
                      }
                  ], function(err) {
                      if(err) throw err;
                      console.log("come again!");
                       });
                      }
              else {
                console.log("Not Working loopin!");

                 }
          }
  
          
          
  
      })

  });

}