let express = require("express");

let router = express.Router();

let authsMiddleware = require("../middleware/auth")

//importing data from contoller file
let controller = require("../controllers/controller");

//route will get all activities input into the database by company/organization
router.get("/activities", authsMiddleware.checkJWT, controller.listActivities);

// route to get an item by id
router.get("/activities/:activity_id", controller.getActivity);

//route to update an activity 
router.put("/activities/:activity_id", controller.updateActivity);

//route to add a new activity
router.post("/activities", controller.addActivity);

//route to delete an activity
router.delete("/activities/:activity_id", controller.deleteActivity)

//export router methods to input into main.js file
module.exports = router;

