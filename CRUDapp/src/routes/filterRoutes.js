

//These routes are going to be for filtering search for those looking for an activity

let express = require("express");

let router = express.Router();

let controller = require("../controllers/filterController");


//this route will do a filtered search based on zipcode and will bring all activities with 
//the same zipcode being searched
router.get("/zipcode/:zipcode", controller.filterByZip);

//this route will do a filtered search based on city and will bring all the activities
//with the same city being searched
router.get("/city/:city", controller.filterByCity);

//this route will do a filtered search based on age group and will bring all the activities 
//with the age group being searched
router.get("/age/:ageMin", controller.filterByAge);

module.exports = router;
