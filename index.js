const config = require("config");
const express = require("express");
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/user.model')
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const route = require("./routes/users.route");
const app = express();

require("dotenv").config();

// connect to mongo DB
mongoose
    .connect("mongodb://localhost/fuelueducation", {
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDB."))
    .catch((err) => {
        console.error("Could not connected to MongoDB.");
    });

app.use(express.json());
app.use(async(req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];

        const {
            userId,
            exp
        } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        res.send(process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one"
            });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    } else {
        next();
    }
});

//use users route for api/users
app.use("/api/users", route);

app.listen(port, () => {
    console.log(`This server run at  ${port}...`);
});