'use strict';
var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
    var userCtrl = require('../controllers/userController');

    app.route('/users')
        .get(checkAuth, userCtrl.get_user);

    app.route('/users')
        .post(checkAuth, userCtrl.search_user);

    app.route('/users/signup/petani')
        .post(userCtrl.signup_petani);

    app.route('/users/signup/pemilik_lahan')
        .post(userCtrl.signup_pemilikLahan);

    app.route('/users/signup/admin')
        .post(userCtrl.signup_admin);

    app.route('/users/login') 
        .post(userCtrl.login_user);
};