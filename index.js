const config = require("config");
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const {
    User
} = require("./models/user.model");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const route = require("./routes/users.route");

const app = express();
// live video chat
const server = require("http").Server(app);
const io = require('socket.io')(server);
const {
    ExpressPeerServer
} = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))
app.use('/peerjs', peerServer);

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

//use users route for api/users
app.use("/api/users", route);

app.get('/users/room/:room', (req, res) => {
    res.render('room', {
        roomId: req.params.room
    })
})


// socket connecntion 
io.on('connection', socket => {
    console.log('ssssssssssss')
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

    });

    socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });

});
app.listen(port, () => {
    console.log(`This server run at  ${port}...`);
});