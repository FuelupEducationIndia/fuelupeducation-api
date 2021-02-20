const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const {
    User
} = require("./models/user.model");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
//const routeConfig = require('./config/express');
const groupsRoute = require('./routes/groups');
const {
    ValidationError
} = require('express-validation');
// const route = require("./routes");
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {
    ExpressPeerServer
} = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
    port: 3030,
});
const {
    v4: uuidV4
} = require('uuid');

//app.use(routeConfig);
app.use('/peerjs', peerServer);

app.set('view engine', 'ejs');
app.use(express.static('public'));

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

//use route for api
//app.use("/api/", route);
app.use("/api/", groupsRoute);
//
app.use(function(err, req, res, next) {

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    } else {
        return res.status(500).json(err)
    }

});

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get('/leave', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:room', (req, res) => {
    res.render('room', {
        roomId: req.params.room
    });
});

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        // messages
        socket.on('message', (message) => {
            //send message to the same room
            io.to(roomId).emit('createMessage', message);
        });

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});

server.listen(process.env.PORT || port);