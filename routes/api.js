const express = require('express');

const router = express.Router();

const User = require('../models/user-schema')

// Routes
//Users
router.route('/users').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.post('/users/save',(req, res) => {
    const data = req.body;

    const newUser = new User(data);
    newUser.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        return res.json({
            msg: 'Your data has been saved'
        });
    });
})
router.post('/users/a',(req, res) => {
   User.find({email:req.email})
   .then(model=>{
       res.json(model)
   })
   .catch(error =>{
       res.json(error)
   })
})

module.exports = router;