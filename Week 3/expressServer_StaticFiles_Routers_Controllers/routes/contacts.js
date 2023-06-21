const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts')

router.get('/contacts', contactsController.listContacts);

router.get('/contacts/:id', contactsController.showContacts);

router.post('/contacts', contactsController.createContacts);

module.exports = router;