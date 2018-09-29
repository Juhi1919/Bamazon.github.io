
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
  allMenu();
}); 

function allMenu() {
    inquirer.prompt ([
      {
        type: "list",
        name: "allMenu",
        message: "Which you like to do?",
        choices: ['Product for Sale', 'Low Inventory', 'Add to Inventory', 'Add New Product']
      }])
      .then(function(answer) {
       if (answer.allMenu === 'Product for Sale'){
         allInventory();
       } else if (answer.allMenu === 'Low Inventory'){
         LowInventory();
       } else if (answer.allMenu === 'Add to Inventory') {
         addInventory();
       } else {
         addProduct();
       }
      });
    }

    function allInventory() {
        connection.query("Select * FROM products", function (err,res) {
          if(err) throw err;
          for ( var i = 0; i < res.length; i++) {
            console.log("|| id: " + res[i].id + " || product name: " + res[i].product_name + " || price: " + res[i].sale_price + " || quantity: " + res[i].stock_quantity + " ||");
          } 
          connection.end();
        });
     }

     function LowInventory() {
        connection.query("Select * FROM products WHERE stock_quantity < 25", function (err,res) {
          if(err) throw err;
          for ( var i = 0; i < res.length; i++) {
            console.log("|| id: " + res[i].id + " || product name: " + res[i].product_name + " || price: " + res[i].sale_price + " || quantity: " + res[i].stock_quantity + " ||");
          } 
          connection.end();
        });
      }
    
      function addInventory() {

        connection.query("SELECT * FROM products" , function(err, res) {
          if (err) throw err;
           inquirer
            .prompt([
              {
                type: "input",
                message: "What is id of the product?",
                name: "product_id"
              },
              {
                type: "input",
                message: "How much units would you like to add?",
                name:"stockquantity"
              }
            ])
            .then(function(answer){ 
            
              var productid = parseInt(answer.productid);
              var stockquantity = parseInt(answer.stock_quantity);
               var newStock = res[productid - 1].stock_quantity + stockquantity;
              var sql = "Update products Set stock_quantity = ? Where id = ?"
              var stock = res[id - 1].id;
              connection.query(sql, stock, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "update stock");
              }); 
              connection.end();
          });
    
    
        });
       
      }
    