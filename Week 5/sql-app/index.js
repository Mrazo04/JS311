console.log("hello sql app");

let mysql = require("mysql");

let connection = mysql.createConnection({
    user: "admin",
    password: "vdsGo0fw!04",
    host: "database-1.ciqvdsqtx565.us-east-2.rds.amazonaws.com",
    port: 3306,
    database: "todoapp"
});

connection.connect();

let sql = "select now();"

connection.query(sql, function(err, results){
    //what to do when the query results come back?
    if(err){
        console.log("Running the quesry failed.", err)
    } else{
        console.log("The query was succesful. => \n", results);
    }
});

connection.end();