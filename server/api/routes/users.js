const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/checkauth');

const User = require('../models/user');
const decode = require('jwt-decode');


//-----------Sign Up-----------//

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err    
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            address: req.body.address,
                            phone_number: req.body.phone_number,
                            spesialisasi: req.body.spesialisasi,
                            harga: req.body.harga,
                            role:req.body.role
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                    user
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        });
});

//-----------Sign In-----------//
router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role
                    }, 
                    "rahasia", 
                    {
                        expiresIn: "1h"    
                    },
                );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        userId: decode(token).userId,
                        role: decode(token).role
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// router.get('/login', function(req, res, next) {

//     //here it is
//     var user = req.user;

//     //you probably also want to pass this to your view
//     res.render('profile', { title: 'profile', user: user });
// });


//-----------USERS CRUD-----------//

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(res => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/search", (req, res, next) => {
    User.find({ role: req.body.role, spesialisasi: req.body.spesialisasi })
        .exec()
        .then(user => {
            if(user.length > 0) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({
                    message: "Petani not found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;