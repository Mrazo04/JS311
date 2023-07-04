//import express framework
let express = require("express");

//creat our application object
let app = express();
 
//utilizing static file=making connection
app.use(express.static("public"));

//make sure our application can parse json
app.use(express.json());

//define the port that the app will listen on
let PORT = 9091;

//bring in the routes functions to GET,POST,PUT, and DELETE
const router = require("./src/routes");

//utilizing routers=making connection
app.use(router);

//start our application on a port
app.listen(PORT, function () {
  console.log("Application started on port", PORT);
});
