let express = require("express");

let app = express();

app.use(express.json());

app.get("/add", function (req, res) {
  let num1 = parseInt(req.query.num1);
  let num2 = parseInt(req.query.num2);

  let sum = num1 + num2;
  res.send(`${sum}`);
});


app.get("/negate/:number", function(req, res){
    let negate = req.params.negate;
    let number = parseInt(req.params.number);

    let opposite = -(number);

    res.send(`${opposite}`)

})

app.post("/multiply", function(req, res){

    let num1 = parseInt(req.body.num1);
    let num2 = parseInt(req.body.num2);

    let result = num1*num2

    res.send(`${result}`)
});

app.listen(9001, function(){
    console.log("Application started!");
});
