const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts')
//retreving data
router.get('/contact', (req, res, next) => {
    // res.send('Retriving the contact list');
    Contact.find(function (err, contacts) {
        res.json(contacts);
    })
});
//add contact
router.post('/contact', (req, res, next) => {
    console.log(req.body)
    //logic to add contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });
    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'failed to add contact' });
        }
        else {
            res.json({ msg: 'contact added succesfully' });
        }
    });
});
//deleting contact
router.delete('/contact/:id', (req, res, next) => {
    //logic to delete contact
    Contact.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json({ msg: 'failed to delete contact' });
        } else {
            res.json(result);
        }
    });
});
//updating contacts
router.put('/contact/:id', (req, res, next) => {
    //logic to delete contact
    Contact.update({ _id: req.params.id }, {$set: req.body}, function (err, data) {
        if (err) {
            res.json({ msg: 'failed to update contact' });
        } else {
            res.json(data);
        }
    });
})
module.exports = router;