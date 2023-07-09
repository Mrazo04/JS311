let express = require("express");
let app = express();

//inserting data from .env file
require("dotenv").config();

//parsing JSON data
app.use(express.json());

//inserting routes 
let routes = require("./routes");
app.use(routes);

//port listening to app
let PORT = process.env.PORT || 9095; 

app.listen(PORT, function(){
    console.log("fleisure app start on port", PORT);
});