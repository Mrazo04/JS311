//connecting db library
let mysql = require("mysql");

//using secured information from .env file
let pool = mysql.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
}); 

module.exports = pool;