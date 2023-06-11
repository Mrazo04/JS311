//import express framework
let express = require("express");


//creat our application object
let app = express();

app.use(express.static("public"));
//make sure our application can parse json
app.use(express.json());

//define the port that the app will listen on
let PORT = 9091;

let db = [];

let counter = 1;

// we have 5 different routes that we need to define, and implement
//define a route that will add an entry

app.post("/todos", function (req, res) {
    //1. read the title from the request body
    let t = req.body.title; 

    //2. read the notes from the request body
    let n = req.body.notes;

    //3. create a new object
    //4. set the title and the notes of the new object, using 1 and 2
    //5. give the new object an id
    let newEntry = {
        title: t,
        notes: n,
        id: counter
    }; 

    counter ++

    //add the entry to the db array
    db.push(newEntry);
    res.json(newEntry);

});

//define a route that will list the summary of all the entries

app.get("/todos", function (req, res) {
    //1. loop through the db array and create a new array of objects that do not 
    //have the details

    let summaries = db.map(function(element){
        let summary = {};
        summary.title = element.title;
        summary.done = element.done;
        summary.id = element.id;
        return summary;
    })

    res.json(summaries);
    
});

//define a route that will get the details of a single entry

app.get("/todos/:id", function (req, res) {

    let id = req.params.id;

    let found = db.find(function (element){
        if(element.id == id){
            return true;
        }else {
            return false; 
        }
    })

  res.json(found);
});

//define a route that will delete an entry

app.delete("/todos/:id", function (req, res) {

    let id = req.params.id;

    let indexToDelete = db.findIndex(function(element){
        if(element.id == id){
            return true; 
        }else {
            return false;
        }
    });
    
    if(indexToDelete > -1){
    db.splice(indexToDelete, 1);
    res.sendStatus(204);
    } else {
        res.sendStatus(404);
        }
});
//define a route that will update an entry

app.put("/todos/:id", function (req, res) {
    //get id from the route
    let id = req.params.id;

    //get the info from the request body
    let title = req.body.title;
    let notes = req.body.notes;
    let done = req.body.done == true; 

    //find the entry we want to update
    let found = db.find(function(element){
        if(element.id == id){
            return true; 
        } else {
            return false; 
        }
    })

    //update the entry if we found one that matches
    if(found){
        found.title = title;
        found.notes = notes; 
        found.done = done; 
        res.sendStatus(204);
    } else {
        //return an error message if no match is found
        res.sendStatus(404);
    }

});

//start our application on a port
app.listen(PORT, function () {
  console.log("Application started on port", PORT);
});
