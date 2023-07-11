let express = require("express");

let app = express();

let PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hey there!");
});

app.listen(PORT, function () {
  console.log("App started on the port", PORT);
});
