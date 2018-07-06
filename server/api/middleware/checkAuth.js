const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("header token", req.headers.authorization);
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decode = jwt.verify(token, "rahasia");
        req.userData = decode; //
        next(); // success auth
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};