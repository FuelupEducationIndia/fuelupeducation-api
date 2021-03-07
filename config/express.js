const express = require('express');
const bodyParse = require('body-parser');
const jwt = require("jsonwebtoken");
const {
    ValidationError
} = require('express-validation');
const routes = require('../server/routes');
const {
    User
} = require("../server/models/user.model");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParse.json({
    extended: true
}));
app.use(bodyParse.urlencoded({
    extended: true
}));


app.use(express.json());
app.use(async(req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const {
            email,
            exp
        } = await jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one",
            });
        }
        res.locals.loggedInUser = await User.findOne({
            email,
        });
        next();
    } else {
        next();
    }
});

app.use(function(err, req, res, next) {

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    } else {
        return res.status(500).json(err)
    }

});


app.use('/api/', routes);

module.exports = app;