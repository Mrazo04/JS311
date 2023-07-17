
//making connection swith database
let db = require("../../model/db");

let listActivities = function(req, res){
    //should return all activities based on city and state or zip code
    let sql = "select id, activity, ageGroup, price, city, state from activities";

    db.query(sql, function(err, results){
        if(err){
            console.log("failed to query database", err);
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    });
};

let getActivity = function(req, res){
    //should return one single activity by the id
    //need id from param
    
    let id = req.params.id;
    let sql = "select * from activities where id = ?"
    let params = [id]

    db.query (sql, params, function(err, results){
        if(err){
            console.log("failed to query database", err);
            res.sendStatus(500);
        } else {
            //we need to first make sure there is an id that matches 
            if(results.length == 0){
                //not found status
                res.sendStatus(404);
            } else {
                res.json(results[0]);
            }
        };
    });

};

//update table set activity = ?, ageGroup = ?, actType = ?, price =? , summary = ?,
// streetAddress = ?, city = ?, state = ?, zipcode = ? where id = ?
let updateActivity = function(req, res){
    //update a single activity

    let id = req.params.id;
    let activity = req.body.activity;
    let ageGroup = req.body.ageGroup;
    let actType = req.body.actType;
    let price = req.body.price;
    let summary = req.body.summary;
    let streetAddress = req.body.streetAddress;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;


    //require activity input
    if(!activity){
        res.status(400).json("Activity name is required");
        return;
    };
     
    //require price
    if(!price){
        res.status(400).json("Price is required");
        return;
    };
    
    //require streetAddress
    if(!streetAddress){
        res.status(400).json("Street address is required");
        return;
    };

    //require city
    if(!city){
        res.status(400).json("City is required");
        return;
    };

    //require state
    if(!state){
        res.status(400).json("State is required");
        return;
    };

    //require zipcode
    if(!zipcode){
        res.status(400).json("Zipcode is required");
        return;
    };

    let sql = "update activities set activity = ?, ageGroup = ?, actType = ?, price =? , summary = ?, streetAddress = ?, city = ?, state = ?, zipcode = ? where id = ?";
    let params = [activity, ageGroup, actType, price, summary, streetAddress, city, state, zipcode, id];

    db.query(sql, params, function(err, results) {

        if(err){
            console.log("Unable to update activity info", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        };
    });

};

//insert into activities (activity, ageGroup, actType, price, summary, streetAddress, city, state, zipcode)
// values (?,?,?,?,?,?,?,?,?)
let addActivity = function(req, res){
    //add activity to activity db based on city and state or zip code

    let activity = req.body.activity;
    let ageGroup = req.body.ageGroup;
    let actType = req.body.actType;
    let price = req.body.price;
    let summary = req.body.summary;
    let streetAddress = req.body.streetAddress;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;

    //require activity input
    if(!activity){
        res.status(400).json("Activity name is required");
        return;
    };
     
    //require price
    if(!price){
        res.status(400).json("Price is required");
        return;
    };

    //require streetAddress
    if(!streetAddress){
        res.status(400).json("Street address is required");
        return;
    };

    //require city
    if(!city){
        res.status(400).json("City is required");
        return;
    };

    //require state
    if(!state){
        res.status(400).json("State is required");
        return;
    };

    //require zipcode
    if(!zipcode){
        res.status(400).json("Zipcode is required");
        return;
    };

    let sql = "insert into activities (activity, ageGroup, actType, price, summary, streetAddress, city, state, zipcode) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let params = [activity, ageGroup, actType, price, summary, streetAddress, city, state, zipcode];

    db.query(sql, params, function(err, results) {

        if(err){
            console.log("Unable to insert activity into database", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        };
    });

};

//delete from activities where id = ?
let deleteActivity = function(req, res){
    //delete a single activity from db
    //get id from list of activities

    let id = req.params.id;

    let sql = "delete from activities where id = ?";
    let params = [id];

    db.query(sql, params, function(err, results) {

        if(err){
            console.log("Unable to delete activity from database", err)
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        };
    });
};

module.exports = {
    listActivities,
    getActivity,
    updateActivity,
    addActivity,
    deleteActivity
}