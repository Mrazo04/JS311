let contactsList = require('../data/contacts');

let counter = 1;

let listContacts = function (req, res) {
  let summaries = contactsList.map(function (element) {
    let summary = {};
    summary._id = element._id;
    summary.name = element.name;
    summary.occupation = element.occupation;
    summary.avatar = element.avatar;
    return summary;
  });

  res.json(summaries);
};

let showContacts = function (req, res) {
  let id = req.params.id;

  let found = contactsList.find(function (element) {
    if (element._id == id) {
      return true;
    } else {
      return false;
    }
  });

  res.json(found);
};

let createContacts = function (req, res) {
  let n = req.body.name;
  let o = req.body.occupation;
  let a = req.body.avatar;

  let newContact = {
    postId: counter,
    name: n,
    occupation: o,
    avatar: a,
  };

  counter++;

  contactsList.push(newContact);
  res.json(newContact);
};

module.exports = {
  listContacts,
  showContacts,
  createContacts,
};
