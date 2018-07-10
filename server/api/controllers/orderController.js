var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Order = require('../models/orderModel');
var jwt = require('jsonwebtoken');

Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

exports.get_user_orders = function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "rahasia");
    const userId = decode.userId
      Order.find({userId : userId})
          .select('userIdPetani lokasi luas tanggal_dibuat tanggal harga status')
          .populate('userIdPetani')
          .populate('userId')
          .sort({tanggal_dibuat: -1})
          .exec()
          .then(docs => {
              res.status(200).json(docs);
          })
          .catch(err => {
              res.status(500).json({
                  error: err
              });
          });
  };

exports.create_order = function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "rahasia");
        const order = new Order ({
            _id: mongoose.Types.ObjectId(),
            tanggal_dibuat : new Date().addHours(7),
            tanggal : req.body.tanggal,
            lokasi: req.body.lokasi,
            luas : req.body.luas,
            harga: req.body.harga,
            status: req.body.status,
            userIdPetani: req.body.userIdPetani,
            userId : decode.userId
        });         
        order.save()
          .then(result => {
              res.status(201).json({
                  message: "Order stored",
                  createdOrder: {
                  tanggal_dibuat: result.tanggal_dibuat,
                  tanggal: result.tanggal,
                  lokasi: result.lokasi,
                  luas: result.luas,
                  harga: result.harga,
                  status: result.status,
                  _id: result._id,
                  userIdPetani: result.userIdPetani,
                  userId: result.userId,
                  },
                  request: {
                      type : "GET",
                      url: 'http://localhost:3000/orders/' + result._id
                  }
              });
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  error: err
              });
          });
  };

exports.delete_order = function (req, res, next) {
    Order.remove({ _id: req.params.orderId })
    .exec()
        .then(result => {
            res.status(200).json({
                message: "Order Deleted",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: "ID", quantity: "Number" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};