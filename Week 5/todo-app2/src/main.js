let express = require("express");
let app = express();

//variables stored with information
require("dotenv").config();

// parse json data
app.use(express.json());

//routes defined in another file that we can use with our app
let routes = require("./routes");
app.use(routes);

//if veriable is defined use defined port, otherwise use 9005
let PORT = process.env.PORT || 9005;

app.listen(PORT, function () {
  console.log("todo app start on port", PORT);
});
