let inquirer = require('inquirer');
let mysql = require('mysql');
let quantity = 0;
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'desmond',
    password: 'desmond$$41',
    database: 'bamazon'

})
// page starts here
inquirer.prompt([{
    type: "list",
    name: "doingWhat",
    message: "What do you want to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}]).then(function (answer) {
    switch (answer.doingWhat) {
        case 'View Products for Sale':
            viewProduct();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addProduct();
            break;
    }
});
//this function displays all from each department
function viewProduct() {
    var myQuery = "SELECT * FROM products INNER JOIN departments WHERE products.department_id= departments.department_id";
    connection.query(myQuery, function (error, results) {
        if (error) throw error;
        for (var index = 0; index < results.length; index++) {
            console.log("Item Number: " + results[index].item_id);
            console.log("Product Name: " + results[index].product_name);
            console.log("Department: " + results[index].department_name);
            console.log("Price: " + results[index].price);
            console.log("Quantity in Stock: " + results[index].stock_quantity);
            console.log("=====================================================");


        }
        connection.destroy();
    })

}
// this function returns product with stock quantity less that 3
function lowInventory() {
    var myQuery = "SELECT * FROM products INNER JOIN departments where products.department_id=departments.department_id AND stock_quantity < 3";
    connection.query(myQuery, function (error, results) {
        if (error) throw error;
        for (var index = 0; index < results.length; index++) {
            console.log("Item Number: " + results[index].item_id);
            console.log("Product Name: " + results[index].product_name);
            console.log("Department: " + results[index].department_name);
            console.log("Price: " + results[index].price);
            console.log("Quantity in Stock: " + results[index].stock_quantity);
            console.log("=======================================================");
        }
        connection.destroy();
    })
}
//this function is used to add new products to the inventory
function addInventory() {
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
        message: "What is the quantity you want to Add?"
    }]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: answer.item
        }, function (err, res) {

            quantity = res[0].stock_quantity;
            quantity = parseFloat(quantity) + parseFloat(answer.qty);
            connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: quantity
                    },
                    {
                        item_id: answer.item
                    }
                ],
                function (error) {
                    if (error) {
                        console.log('Update Error!');
                    } else {
                        console.log("Update Successful");
                    }
                    connection.destroy();
                })
        })
    })
}
//adding new products
function addProduct() {
    inquirer.prompt([

        {
            type: "input",
            name: "product_name",
            message: "Product name?"
        },
        {
            type: "input",
            name: "department_id",
            message: "Department ID?"
        },
        {
            type: "input",
            name: "price",
            message: "Price?"
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "Stock Quantity?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.product_name,
            department_id: answer.department_id,
            price: answer.price,
            stock_quantity: answer.stock_quantity
        }, function (error, results) {
            if (error) {
                console.log(error);

            } else {
                console.log(results.affectedRows + " New product inserted successfully")
            }
            connection.destroy();

        })

    })
}