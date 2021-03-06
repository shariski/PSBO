'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        tanggal_dibuat : {
            type: Date
        },
        tanggal : {
            type: Date
        },
        lokasi: {
            type: String
        },
        luas: {
            type: String
        },
        harga: {
            type: Number
        },
        status: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
          },
        userIdPetani: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
        }
});

module.exports = mongoose.model('Order', OrderSchema);