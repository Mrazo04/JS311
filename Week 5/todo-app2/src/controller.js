let db = require("./db");

let listEntries = function (req, res) {
  // should return of all the entries in the database

  // the sql query that we want to send to the database server
  // that will respond 

  let sql = "select id, title, done from entries";

  db.query(sql, function (err, results) {
    if (err) {
      console.log("failed to query database", err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};

let getEntry = function (req, res){
    //we want to get the id from the request's path param
    //then we want to execute the sql statement to get the info for an entry from the database, only for that id

    let id = req.params.id;//will always be a string

    let sql = "select * from entries where id = ?"//query we are writing
    let params = [id]

    db.query(sql, params, function(err, results){
        if(err){
            console.log("failed to query database", err);
            res.sendStatus(500);
        } else {
            if(results.length == 0){
                res.sendStatus(404);
            } else {
                res.json(results[0]);
            }
        }

    })

};

// delete from entries where id = ?
let deleteEntry = function (req, res) {
  //we want to accept an id from the request
  // we want to delete the row with the matching id 

  let id = req.params.id;

  let sql = "delete from entries where id = ?"
  let params = [id];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("delete query failed", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);// i have no data for you, but everything is okay
    }
  });

};


// insert into entries (title, notes) values (?, ?)
let addEntry = function (req, res) {
  //read some data from the request(title, notes) from todo list
  // execute the query that will insert data into database

  let title = req.body.title;
  let notes = req.body.notes;

  // you can write some code here, to do some checks
  // if the checks fail, you can send back a 400; 

  if(!title){
    res.status(400).json("Title is required");
    return;
  };


  let sql = "insert into entries (title, notes) values (?, ?);"
  let params = [title, notes];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("failed to insert into database", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

// update into set title =?, notes = ?, done = ? where id = ?
let updateEntry = function (req, res) {

  //get the id from the req path param (like delete and get)
  // we will get the rest of the info from the request body (like the post)

  let id = req.params.id; 
  let title = req.body.title;
  let notes = req.body.notes; 
  let done = req.body.done;

  if(!title){
  res.status(400).json("Title is required");
  return;
  }; 

  let doneTwo = false;

  if(done == true){
  doneTwo = true;
  };

  let sql = "update entries set title = ?, notes = ?, done = ? where id = ?";
  let params = [title, notes, doneTwo, id];

  db.query(sql, params, function(err, results) {
    if(err){
      console.log("failed to update database", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });

};

let patchEntry = function(req, res) {

  let id = req.params.id;
  let body = req.body;

  let updateTitle = false; 
  let updateNotes = false; 
  let updateDone = false; 

  let snippets = [];
  let params = [];

  if(body.hasOwnProperty('title')){
    updateTitle = true; 
    snippets.push("title = ?")
    params.push(body.title);
  };

  if(body.hasOwnProperty('notes')){
    updateNotes = true;
    snippets.push("notes = ?");
    params.push(body.notes);
  };

  if(body.hasOwnProperty('done')){
    updateDone = true; 
    snippets.push("done = ?")
    
    let doneTwo = false;
    if(body.done == true){
      doneTwo = true;
    };

    params.push(body.doneTwo);
  };

  if(params.length == 0){
    res.status(400).json("You must include at least 1 attribute to update");
    return;
  };

  let sql = "update entries set"+ snippets.join("","") + "where id = ?";
  params.push(id);

  db.query(sql, params, function(err, results){
    if(err){
      console.log("Failed to patch the entry", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

module.exports = {
  listEntries,
  getEntry,
  deleteEntry,
  addEntry,
  updateEntry,
  patchEntry
};
