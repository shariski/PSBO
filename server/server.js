var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    Petani = require('./api/models/petaniModel'),
    PemilikLahan = require('./api/models/pemilikLahanModel'),
    Admin = require('./api/models/adminModel'),
    Order = require('./api/models/orderModel')
    bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/agri');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userRoutes = require('./api/routes/userRoutes');
var orderRoutes = require('./api/routes/orderRoutes');
userRoutes(app); 
orderRoutes(app);

app.listen(port);

console.log('AgriSearch RESTful API server started on: ' + port);