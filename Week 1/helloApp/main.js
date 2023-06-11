
// brings in the express module
let express = require("express");

// create the application object 
let app = express()

//need to parse the data out of the body to enable the function
app.use(express.json());


// this is a route
// 
app.get("/", function(req, res){

    res.send("hello");

})

// a route that returns a hello message, using the name passed in on the query parameters
app.get("/hello", function(req, res){

    let name = req.query.name;
    //lets pretend we can get the name out of the request

    res.send(`Hello ${name}, how are you? `)
})

// a route that returns a hello message using the name passed in as a route(path) parameters
app.get("/:greeting/:name", function(req, res){

    let name = req.params.name;
    //lets pretend we can get the name out of the request

    let greeting = req.params.greeting;

    res.send(`${greeting} ${name}, how are you? `)
})

//passing data with body's -- can only be used with POST and PUT
app.post("/hello", function(req, res){

    let greeting = req.body.greeting; //get the greeting from the req body
    let name = req.body.name; //get the name from the req body

    res.send(`${greeting} ${name}, how are you? `)
})

app.listen(9001, function(){
    console.log("Application started!");
})


