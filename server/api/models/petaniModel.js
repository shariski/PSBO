'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userModel');

var Petani = new Schema({
        spesialisasi: {
            type: String
        },
        harga: {
            type: Number
        }
    });

module.exports = User.discriminator('petani', Petani);