const express = require("express");

const router = express.Router();

let contactsList = require("../data/contacts");

let vehicleList = require("../data/vehicles")

router.get("/contacts", function(req, res){

    let summaries = contactsList.map(function(element){
        let summary = {};
        summary._id = element.id;
        summary.name = element.name;
        summary.occupation = element.occupation;
        summary.avatar = element.avatar;
        return summary
    });
    
    res.json(summaries);
});

router.get("/vehicles", function(req, res){
    res.json();
})

router.get("/contacts/:id", function(req, res){
    let id = req.params.id;

    let found = 
    res.json();
})

router.get("/vehicles/:id", function(req, res){
    let id = req.params.id;


    res.json();
})