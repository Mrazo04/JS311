let express = require("express");

let app = express();

app.use(express.json());

let PORT = 9091;

let inventorylist = [];

let counter = 1;

//we are going to add items to the inventory list 

app.post("/inventory", function(req, res){
    let item = req.body.item;
    let notes = req.body.notes;

    let newEntry = {
        item: item,
        notes: notes, 
        id: counter
    };

    counter ++

    inventorylist.push(newEntry);
    res.json(newEntry)
});

//we are going to get the inventory list 

app.get("/inventory", function(req, res){
    let summaries = inventorylist.map(function(element){
        let summary = {};
        summary.item = element.item;
        summary.done = element.done;
        summary.id = element.id; 
        return summary;
    });

    res.json(summaries);
})

//we are going to get the details of one item 

app.get("/inventory/:id", function(req, res){
    let id = req.params.id;

    let found = inventorylist.find(function(element){
        if (element.id == id){
            return true;
        } else {
            return false;
        }
    });

    res.json(found);
})

//we are going to update an item 

app.put("/inventory/:id", function(req, res){
    let id = req.params.id; 

    let item = req.body.item;
    let notes = req.body.notes;
    let done = req.body.done;

    let found = inventorylist.find(function(element){
        if(element.id == id){
            return true;
        }else{
            return false; 
        }
    });

    if(found){
        found.item = item;
        found.notes = notes;
        found.done = done;
    }else{
        res.sendStatus(404);
    }
});

//we are going to delete an item from the list 

app.delete("/inventory/:id", function(req, res){
    let id= req.params.id;

    let indexToDelete = inventorylist.findIndex(function(element){
        if(element.id == id){
            return true;
        }else {
            return false;
        }
    })

    if(indexToDelete > -1){
        inventorylist.splice(indexToDelete, 1);
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
})

app.listen(PORT, function(){
    console.log("Application has started on port", PORT);
})