'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Petani = require('../models/petaniModel'),
    PemilikLahan = require('../models/pemilikLahanModel'),
    Admin = require('../models/adminModel'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    checkAuth = require('../middleware/checkAuth'),
    decode = require('jwt-decode');
    

exports.signup_petani = function (req, res, next) {
    Petani.find({email: req.body.email})
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
                        const user = new Petani({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            address: req.body.address,
                            phone_number: req.body.phone_number,
                            spesialisasi: req.body.spesialisasi,
                            harga: req.body.harga
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Petani created',
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
};

exports.signup_pemilikLahan = function (req, res, next) {
    PemilikLahan.find({email: req.body.email})
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
                        const user = new PemilikLahan({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            address: req.body.address,
                            phone_number: req.body.phone_number,
                            ukuran_lahan: req.body.ukuran_lahan
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Pemilik Lahan created',
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
};

exports.signup_admin = function (req, res, next) {
    Admin.find({email: req.body.email})
        .exec()
        .then(userMail => {
            if (userMail.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                Admin.find({username: req.body.username})
                .exec()
                .then(user => {
                    if (user.length >= 1){
                        return res.status(409).json({
                            message: 'Username exists'
                        });
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if(err) {
                                return res.status(500).json({
                                    error: err    
                                });
                            } else {
                                const user = new Admin({
                                    _id: new mongoose.Types.ObjectId(),
                                    email: req.body.email,
                                    password: hash,
                                    name: req.body.name,
                                    address: req.body.address,
                                    phone_number: req.body.phone_number,
                                    username: req.body.username
                                });
                                user.save()
                                    .then(result => {
                                        console.log(result);
                                        res.status(201).json({
                                            message: 'Admin created',
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
                })
                
            }
        });
};

exports.login_user = function(req, res, next) {
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
};

exports.get_user = function(req, res) {
    var token = req.headers.authorization.split(" ")[1];
    var decode = jwt.verify(token, "rahasia");
    var userId = decode.userId;
      User.find({_id : userId})
            .exec()
            .then(user => {
                console.log(user);
                res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
    });  
};

exports.search_user = function (req, res, next) {
    User.find({ role: req.body.role, spesialisasi: req.body.spesialisasi, address: req.body.lokasi })
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
};