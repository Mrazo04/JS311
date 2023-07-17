let express = require("express");
let app = express();

//inserting data from .env file
require("dotenv").config();

//parsing JSON data
app.use(express.json());

//register and login route
let authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

//inserting routes 
let routes = require("./routes/routes");
app.use(routes);

//port listening to app
let PORT = process.env.PORT || 9095; 

app.listen(PORT, function(){
    console.log("fleisure app start on port", PORT);
});