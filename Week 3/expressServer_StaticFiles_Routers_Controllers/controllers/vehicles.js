let vehicleList = require("../data/vehicles");

let counter = 1;

let listVehicles = function (req, res) {

  let summaries = vehicleList.map(function (element) {
    let summary = {};
    summary._id = element._id;
    summary.year = element.year;
    summary.make = element.make;
    summary.model = element.model;
    return summary;
  });

  res.json(summaries);
};

let showVehicles = function (req, res) {

  let id = req.params.id;

  let found = vehicleList.find(function (element) {
    if (element._id == id) {
      return true;
    } else {
      return false;
    }
  });

  res.json(found);
};

let createVehicles = function (req, res) {

  let y = req.body.year;
  let m = req.body.make;
  let md = req.body.model;
  let p = req.body.price;

  let newVehicle = {
    postId: counter,
    year: y,
    make: m,
    model: md,
    price: p,
  };

  counter++;

  vehicleList.push(newVehicle);
  res.json(newVehicle);
};

module.exports = {
    listVehicles,
    showVehicles,
    createVehicles
};