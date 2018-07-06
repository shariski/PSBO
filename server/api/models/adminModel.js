'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userModel');

var Admin = new Schema({
        username: {
            type: String
        }
    });

module.exports = User.discriminator('admin', Admin);