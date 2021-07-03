const express = require('express');
const bodyParse = require('body-parser');
const jwt = require("jsonwebtoken");
// require("dotenv").config('./.env');
const {
    ValidationError
} = require('express-validation');
const userRoutes = require('../server/routes/users');
const assignmentRoute = require('../server/routes/assignment')
const studentAssignmentRoute = require('../server/routes/studentAssignment')
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

app.use(userRoutes);
app.use(assignmentRoute)
app.use(studentAssignmentRoute)





const boardUniversityRoutes = require('../server/routes/boardUniversityRoutes')
const courseRoutes = require('../server/routes/courseRoutes')
const languageRoutes = require('../server/routes/languageRoutes')
const sectionRoutes = require('../server/routes/sectionRoutes')
const questionRoutes = require('../server/routes/questionRoutes')

app.use('/api', boardUniversityRoutes)
app.use('/api', courseRoutes)
app.use('/api', languageRoutes)
app.use('/api', sectionRoutes)
app.use('/api', questionRoutes)

module.exports = app;