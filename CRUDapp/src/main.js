let express = require("express");
let app = express();

//utilizing static file-making connection
app.use(express.static("public"));

//inserting data from .env file
require("dotenv").config();

//parsing JSON data
app.use(express.json());

//search filters routes
let filterRoutes = require("./routes/filterRoutes");
app.use(filterRoutes);

//register and login route
let authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

//inserting routes 
let routes = require("./routes/routes");
app.use(routes);

//port listening to app
let PORT = process.env.PORT || 3000; 

app.listen(PORT, function(){
    console.log("fleisure app start on port", PORT);
});