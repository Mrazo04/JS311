let db = require("../../model/db");

let argon = require("argon2");

//accept the email and password
//store email and hash
let registerUser = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  //make sure email is truthy
  if (!email) {
    res.status(400).json("Email is required");
    return;
  }

  //converting password given to a hash
  // must label function "async" when using "await"
  let hash;
  try {
    hash = await argon.hash(password);
  } catch (err) {
    //if for some reason the conversion fails,
    //log the error, and response with a 500 code
    console.log("Failed to hash password", err);
    res.sendStatus(500);
    return;
  }

  //at this point I have the hash and the email
  let sql = "insert into todo_users (email, hash) values (?, ?)";
  let params = [email, hash];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to register", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

let loginUser = function (req, res) {
  //check notes in notes.txt file for steps

  let email = req.body.email;
  let password = req.body.password;

  let sql = "select hash from todo_users where email = ?";
  let params = [email];

  db.query(sql, params, async function (err, results) {
    let storedHash;

    if (err) {
      console.log("Failed to fetch hash for user", err);
    } else if (results.length > 1) {
      console.log("Returned more than 1 user for the email", email);
    } else if (results.length == 1) {
      storedHash = results[0].hash;
    } else if (results.length == 0) {
      console.log("Did not find a user for email", email);
    }

    try {
      let pass = await argon.verify(storedHash, password);
      if (pass) {
        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.log("Failed when verifying the hash", err);
      res.sendStatus(401);
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
};