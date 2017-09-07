// Run the bamazon.sql file to set up the required database and tables.
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'desmond',
    password: 'desmond$$41',
    database: 'bamazon'
});
//this function display all products
function displayAll() {
    var myQuery = "SELECT * FROM products INNER JOIN departments WHERE products.department_id = departments.department_id";
    connection.query(myQuery, function (error, results) {
        if (error) throw error;
        for (var index = 0; index < results.length; index++) {

            console.log("Item Number: " + results[index].item_id);
            console.log("Product Name: " + results[index].product_name);
            console.log(" Department: " + results[index].department_name);
            console.log("Price: " + results[index].price);
            console.log("Quantity in Stock: " + results[index].stock_quantity);
            console.log("===========================================");

        }
    })
}
displayAll();
buy();
// this function enables user to buy product from the available product lists.
function buy() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Select product id",
        validate: function (value) {
            value = parseFloat(value);
            if (typeof value === 'number') {
                return true;
            } else

                return false;
        }
    }, {
        name: "qty",
        type: "input",
        message: "What is the quantity you want to buy?"
    }]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: answer.item
        }, function (err, res) {
            if (err) {
                console.log("Invalid product ID. Please try again");
                buy();
            } else {
                if (answer.qty <= res[0].stock_quantity) {
                    let remaining = res[0].stock_quantity - answer.qty;
                    let total_sales = res[0].product_sales + res[0].price * answer.qty;
                    console.log("The quantity of " + res[0].product_name + " you requested is in stock");
                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: remaining,
                            product_sales: total_sales
                        }, {
                            item_id: answer.item
                        }],
                        function (error, results) {
                            if (error) {
                                console.log(error);
                            } else {
                                let yourPrice = answer.qty * res[0].price;
                                console.log("Your total Price for " + answer.qty + " " + res[0].product_name + " is " + yourPrice);

                            }

                        })
                } else {
                    console.log("Insufficient quantity!");
                }
            }
        })
        // connection.destroy();
    })

}