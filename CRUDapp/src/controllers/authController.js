let db = require("../../model/db");

//library that converts password to hash
let argon = require("argon2");

//library that allows the generation of tokens
let jwt = require("jsonwebtoken");

//asynchronous function because we use await
let registerUser = async function (req, res) {
    //we need email and hash(password converted to hash)
    let email = req.body.email;
    let password = req.body.password;

    //we must first check that an email was inserted
    if(!email){
        res.status(400).json("Please enter email");
        //if there is no email, exit function
        return;
    };

    //create variable that will store password converted to hash
    let hash; 
    try{
        //this converts password to hash and is stored as variable hash
        //we must wait for this to be completed before moving forward
        hash = await argon.hash(password);
    } catch(err){
        //show error message if has conversion fails
        console.log("Failed to hash password", err);
        res.sendStatus(500);
        return;
    };

    //if conversion is successfull, we store email and hash in fleisure_users table
    let sql = "insert into fleisure_users (email, hash) values (?, ?)";
    let params = [email, hash];

    db.query(sql, params, function(err, results){
        if(err){
            console.log("Unable to register", err);
            res.sendStatus(500);
        } else{
            res.sendStatus(204); //email and hash were successfully stored
        };
    });
};

let loginUser = function(req, res){
    //we must look at the email the user is attempting to login with 
    //we first check if the email is registered and if there is a hash atatched to email
    //if password used to login matches the hash we have stored, user can login
    //if password used to login does not match, user can not login
    let email = req.body.email; 
    let password = req.body.password;

    //this will look check to see if the email provided is in the db
    //and it will return the id and has we have stored with that email
    let sql = "select id, hash from fleisure_users where email = ?";
    let params = [email];

    db.query(sql, params, async function(err, results) {
        let storedHash;
        let storedId; 

        if(err){
            //query failed
            console.log("Failed to fetch hash for user", err);
            //check to see if email is duplicated in db
        } else if (results.length > 1) {
            console.log("Returned more than 1 user for the email", email);
            //email is found
        } else if(results.length == 1){
            //store the id and hash returned into storedHash and storedId
            storedHash = results[0].hash;
            storedId = results[0].id;
            //if email is not found in db
        } else if(results.length == 0){
            console.log("Email not found", email);
        };

        try{
            //verify() checks that the password used to login is the same as the hash stored
            //by converting the password to a hash and comparing both hashes
            let pass = await argon.verify(storedHash, password);
            //if both hashes are the same
            if(pass){
            //generate token and send it back
            let token = {
                id: storedId,
                email: email
            };

            //this signs the token we created so that we know if they attempted to change it 
            //we store secret signature in .env file and import it here
            let signedToken = jwt.sign(token, process.env.JWT_SECRET, {expiresIn: 86400});
            //user needs to provide this signed token to us so that we know it is 
            //truly them attempting to login
            res.json(signedToken);
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            console.log("Failed when verifying the hash", err);
            res.sendStatus(401); //forbidden
        };
    });
};

module.exports = {
    registerUser,
    loginUser
};