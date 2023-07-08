let express = require('express');

let router = express.Router();

let controller = require("./controller");

//route to get all the todo items
router.get ("/todos", controller.listEntries);

// route to get an item by id
router.get("/todos/:id", controller.getEntry);

// route to delete an item by id

router.delete("/todos/:id", controller.deleteEntry);

router.post("/todos", controller.addEntry);

router.put("/todos/:id", controller.updateEntry);


router.patch("/todos/:id", controller.patchEntry);

module.exports = router;