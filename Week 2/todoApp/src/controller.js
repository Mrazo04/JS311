//database of todo entries
let db = [];

//bring the utils function to generate a random Id
let f = require("./utils")


let createTodo = function (req, res) {
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
        id: f.generateRandomInteger()
    }; 

    //add the entry to the db array
    db.push(newEntry);

    // instead of adding an object to the db array
    // we should execute an "insert into..." query again the database
    res.json(newEntry);
};

let showSummary = function (req, res) {
    //1. loop through the db array and create a new array of objects that do not 
    //have the details

    let summaries = db.map(function(element){
        let summary = {};
        summary.title = element.title;
        summary.done = element.done;
        summary.id = element.id;
        return summary;
    })

    //instead of getting the info from the db array
    //we want to execute a "select id, title, done from entries" against our database

    res.json(summaries);
    
};

let oneSummary = function (req, res) {

    let id = req.params.id;

    let found = db.find(function (element){
        if(element.id == id){
            return true;
        }else {
            return false; 
        }
    });

    //instead of looking for an entry in our db array 
    // we execute the sql: 

  res.json(found);
};

let deleteSummary = function (req, res) {

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
};

let updateSummary = function (req, res) {
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
    });

    // instead of updating an entry object in our db array
    //we send the sql comman "update entries set ......."

    //update the entry if we found one that matches
    if(found){
        found.title = title;
        found.notes = notes; 
        found.done = done; 
        res.sendStatus(204);
    } else {
        //return an error message if no match is found
        res.sendStatus(404);
    };

};

module.exports = {
    createTodo,
    showSummary,
    oneSummary,
    deleteSummary,
    updateSummary
}