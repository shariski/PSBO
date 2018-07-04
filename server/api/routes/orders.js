// Ganti - ganti aja, sesuain aja

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');   //Generate ID
const checkAuth = require('../middleware/checkauth');

const Order = require('../models/order');
const jwt = require('jsonwebtoken');
// const Product = require('../models/products');
// Routesnya /orders

Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

router.get('/', checkAuth, (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "rahasia");
    const userId = decode.userId
      Order.find({userId : userId})
          .select('userIdPetani lokasi luas tanggal_dibuat tanggal harga status')
          .populate('userIdPetani')
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
  });

router.post('/', checkAuth, (req, res, next) => {
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
  });

router.get('/:orderId', checkAuth, (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product', 'name')
        .exec()
        .then(order => {
            if(!order) {
                return res.status(404).json({
                    message: "Order tidak ada"
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
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
});


module.exports = router;