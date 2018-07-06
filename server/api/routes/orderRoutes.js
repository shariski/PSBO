'use strict';
var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
    var orderCtrl = require('../controllers/orderController');

    app.route('/orders')
        .get(checkAuth, orderCtrl.get_user_orders);

    app.route('/orders')
        .post(checkAuth, orderCtrl.create_order);

    app.route('/orders/:orderId')
        .delete(checkAuth, orderCtrl.delete_order);
};