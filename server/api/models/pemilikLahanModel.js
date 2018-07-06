'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userModel');

var PemilikLahan = new Schema({
        ukuran_lahan: {
            type: Number
        }
    });

module.exports = User.discriminator('lahan', PemilikLahan);