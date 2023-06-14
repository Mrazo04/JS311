const express = require("express");

let contactsList = require("./data/contacts");

let vehicleList = require("./data/vehicles");

const app = express();

app.use(express.json());

app.use(express.static("./public"));

const port = process.env.PORT || 4001;

let counter = 1;


app.get("/contacts", function (req, res) {
  let summaries = contactsList.map(function (element) {
    let summary = {};
    summary._id = element._id;
    summary.name = element.name;
    summary.occupation = element.occupation;
    summary.avatar = element.avatar;
    return summary;
  });

  res.json(summaries);
});

app.get("/vehicles", function (req, res) {
  let summaries = vehicleList.map(function (element) {
    let summary = {};
    summary._id = element._id;
    summary.year = element.year;
    summary.make = element.make;
    summary.model = element.model;
    return summary;
  });

  res.json(summaries);
});

app.get("/contacts/:id", function (req, res ){
    let id = req.params.id;

    let found = contactsList.find(function(element){
        if(element._id == id){
            return true; 
        } else {
            return false;
        }
    });

    res.json(found);
});

app.get("/vehicles/:id", function (req, res){
    let id = req.params.id;

    let found = vehicleList.find(function(element){
        if (element._id == id){
            return true;
        } else {
            return false;
        }
    });

    res.json(found);
});


app.post("/contacts", function(req, res){
    let n = req.body.name;
    let o = req.body.occupation;
    let a = req.body.avatar;

    let newContact = {
        _id: _id,
        postId: counter,
        name: n,
        occupation: o,
        avatar: a,
    }

    counter ++
    newId ++

    contactsList.push(newContact);
    res.json(newContact)
})

app.post("/vehicles", function (req, res){
    let y = req.body.year;
    let m = req.body.make;
    let md = req.body.model;
    let p = req.body.price; 
    
    let newVehicle= {
        _id: _id,
        postId: counter,
        year: y,
        make: m, 
        model: md,
        price: p
    }

    _id ++
    counter ++

    vehicleList.push(newVehicle);
    res.json(newVehicle);
})
//const router = require("./src/routes");

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
