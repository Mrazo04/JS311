const express = require("express");

const vehicles = require('./routes/vehicles')

const contacts = require('./routes/contacts')

const app = express();

app.use(express.json());

app.use(express.static("./public"));

const port = process.env.PORT || 4001;

app.use(contacts);

app.use(vehicles);

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
