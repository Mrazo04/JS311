let db = require("./db");

let listEntries = function (req, res) {
  // should return of all the entries in the database

  let sql = "select id, title, done from entries;";

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

    let id = req.params.id;

    let sql = "select * entries wher id = ?"
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
let deleteEntry = function () {};


// insert into entries (title, notes) values (?, ?)
let addEntry = function () {};

// update into set title =?, notes = ?, done = ? whre id = ?
let updateEntry = function () {};

module.exports = {
  listEntries,
  getEntry,
  deleteEntry,
  addEntry,
  updateEntry,
};
