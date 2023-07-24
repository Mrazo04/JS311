 
//making connection swith database
let db = require("../../model/db");

let listActivities = function(req, res){
    //should return all activities input into database by company/organization
    let sql = "select activity_id, activity_name, ageMin, price, city, state from activities";

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
    
    let activity_id = req.params.activity_id;
    let sql = "select * from activities where activity_id = ?"
    let params = [activity_id]

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

    let activity_id = req.params.activity_id;
    let activity_name = req.body.activity_name;
    let ageMin = req.body.ageMin;
    let ageMax = req.body.ageMax;
    let activity_type = req.body.activity_type;
    let price = req.body.price;
    let street_address = req.body.street_address;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;


    //require activity input
    if(!activity_name){
        res.status(400).json("Activity name is required");
        return;
    };
     
    //require price
    if(!price){
        res.status(400).json("Price is required");
        return;
    };
    
    //require streetAddress
    if(!street_address){
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

    let sql = "update activities set activity_name = ?, ageMin = ?, ageMax = ?, activity_type = ?, price =? , street_address = ?, city = ?, state = ?, zipcode = ? where activity_id = ?";
    let params = [activity_name, ageMin, ageMax, activity_type, price, street_address, city, state, zipcode, activity_id];

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

    let activity_id = req.params.activity_id;
    let activity_name = req.body.activity_name;
    let ageMin = req.body.ageMin;
    let ageMax = req.body.ageMax;
    let activity_type = req.body.activity_type;
    let price = req.body.price;
    let street_address = req.body.street_address;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;

    //require activity input
    if(!activity_name){
        res.status(400).json("Activity name is required");
        return;
    };
     
    //require price
    if(!price){
        res.status(400).json("Price is required");
        return;
    };

    //require streetAddress
    if(!street_address){
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

    let sql = "insert into activities (activity_name, ageMin, ageMax, activity_type, price, street_address, city, state, zipcode) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let params =  [activity_name, ageMin, ageMax, activity_type, price, street_address, city, state, zipcode, activity_id];

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
};