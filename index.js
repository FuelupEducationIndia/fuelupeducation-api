var formidable = require("formidable");
util = require("util");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParse = require('body-parser');
const app = express();
const {
    User
} = require("./models/user.model");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const route = require("./routes/users.route");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {
    ExpressPeerServer
} = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
    port: 3030,
});
const {
    v4: uuidV4
} = require("uuid");

// s3 call
const AWS = require("aws-sdk");
const ID = "AKIAIEZ6T76AJ5VM2T6Q";
const SECRET = "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";
// The name of the bucket that you have created
const BUCKET_NAME = "videocall-record";
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});
// const params = {
//     Bucket: BUCKET_NAME,
//     CreateBucketConfiguration: {
//         // Set your region here
//         LocationConstraint: "eu-west-1",
//     },
// };
// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log("Bucket Created Successfully", data.Location);
// });
app.use("/peerjs", peerServer);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParse.json({
    extended: true
}));
app.use(bodyParse.urlencoded({
    extended: true
}));


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
app.post("/uploadRecording", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err.message);
        }
        const params = {
            Bucket: BUCKET_NAME,
            Key: fields.videoFilename, // File name you want to save as in S3
            Body: files.videoData.path,
        };
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            res.send(`Call record uploaded successfully.Url: ${data.Location}`);
        });
    });
});

//use users route for api/users
app.use("/api/users", route);

app.get("/", (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get("/leave", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/:room", (req, res) => {
    res.render("room", {
        roomId: req.params.room,
    });
});

io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("user-connected", userId);
        // messages
        socket.on("message", (message) => {
            //send message to the same room
            io.to(roomId).emit("createMessage", message, userId);
        });

        socket.on("disconnect", () => {
            socket.to(roomId).broadcast.emit("user-disconnected", userId);
        });
    });
});

server.listen(process.env.PORT || port);