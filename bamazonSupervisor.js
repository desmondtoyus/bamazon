var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'desmond',
    password: 'desmond$$41',
    database: 'bamazon'
});
//page starts here
inquirer.prompt([{
    type: 'list',
    name: 'toDo',
    message: 'Select an action',
    choices: ['View Product Sales by Department', 'Create New Department']
}]).then(function (answer) {
    if (answer.toDo === 'Create New Department') {
        createDept();

    } else {
        view();
    }
})
// this function creates a new department
function createDept() {
    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Department Name'
        },
        {
            type: 'input',
            name: 'overHead',
            message: 'Over Head Cost'
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?", {

            department_name: answer.name,
            over_head_costs: answer.overHead
        }, function (error, results) {
            if (error) {
                console.log(error);
            } else {


                connection.query('SELECT * FROM departments', function (err, res) {
                    if (err) {
                        console.log('Error retrieving departments table');
                    } else {
                        console.log(results.affectedRows + " Record(s) added");
                        console.log("============================================================");
                        for (var i = 0; i < res.length; i++) {
                            console.log("Department id: " + res[i].department_id);
                            console.log("Department Name: " + res[i].department_name);
                            console.log("Over Head Cost" + res[i].over_head_costs);
                            console.log("============================================================");
                        }
                        connection.destroy();
                    }


                })
            }

        })

    })

}
// view all products by departments
function view() {
    console.log()
    let myQuery = "SELECT *, SUM(products.product_sales) sumproduct_sales FROM departments INNER JOIN products ON departments.department_id = products.department_id GROUP BY departments.department_id";
    connection.query(myQuery, function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            for (var index = 0; index < results.length; index++) {
                let total_profit = parseFloat(results[index].sumproduct_sales) - parseFloat(results[index].over_head_costs);
                console.log("Department ID: " + results[index].department_id);
                console.log("Department Name: " + results[index].department_name);
                console.log("Over Head Cost: " + results[index].over_head_costs);
                console.log("Total Sales: " + results[index].sumproduct_sales);
                console.log("Profit: " + total_profit);
                console.log("================================================");
            }
            connection.destroy();
        }

    })
}