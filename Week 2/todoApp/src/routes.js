let express = require("express");

//defining router variable
const router = express.Router()

//bring in POST, GET, DELETE, etc. functions
let controller = require("./controller")

// we have 5 different routes that we need to define, and implement
//define a route that will add an entry
router.post("/todos", controller.createTodo)

//define a route that will list the summary of all the entries

router.get("/todos", controller.showSummary);

//define a route that will get the details of a single entry

router.get("/todos/:id", controller.oneSummary);

//define a route that will delete an entry

router.delete("/todos/:id", controller.deleteSummary);
//define a route that will update an entry

router.put("/todos/:id", controller.updateSummary);

//exported routers
module.exports = router;