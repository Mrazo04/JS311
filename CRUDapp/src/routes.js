 let express = require("express");

let router = express.Router();

//importing data from contoller file
let controller = require("./controller");

// route to get all the activities available based on city 
//for now I am only doing Austin, TX
router.get("/activities", controller.listActivities);

// route to get an item by id
router.get("/activities/:id", controller.getActivity);

//route to update an activity 
router.put("/activities/:id", controller.updateActivity);

//route to add a new activity
router.post("/activities", controller.addActivity);

//route to delete an activity
router.delete("/activities/:id", controller.deleteActivity)

//export router methods to input into main.js file
module.exports = router;

