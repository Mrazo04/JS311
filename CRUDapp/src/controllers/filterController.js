let db = require("../../model/db");

let filterByZip = function (req, res) {
  //should return all activities within the zipcode being searched

  let zipcode = req.params.zipcode;
  let sql = "select * from activities where zipcode = ?";
  let params = [zipcode];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to query database", err);
      res.sendStatus(500);
    } else {
      if (results.length == 0) {
        res.sendStatus(404);
      } else {
        res.json(results);
      }
    }
  });
};

let filterByCity = function (req, res, next) {
  //should return all activities within the zipcode being searched

  let city = req.params.city;
  let sql = "select * from activities where city = ?";
  let params = [city];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to query database", err);
      res.sendStatus(500);
    } else {
      if (results.length == 0) {
        res.sendStatus(404);
      } else {
        res.json(results);
      }
    }
  });
};

let filterByAge = function (req, res) {
  //should return all activities within the age group being searched

  let ageMin = req.params.ageMin;
  let sql = "select * from activities where ageMin = ?";
  let params = [ageMin];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to query database", err);
      res.sendStatus(500);
    } else {
      if (results.length == 0) {
        res.sendStatus(404);
      } else {
        res.json(results);
      }
    }
  });
};

module.exports = {
  filterByZip,
  filterByCity,
  filterByAge,
};
