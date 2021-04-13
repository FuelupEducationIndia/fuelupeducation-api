var formidable = require("formidable");
util = require("util");

const app = require("./config/express");

const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
  port: 3030,
});

// Call response mondule
//const responseHelpers = require('../helpers/response.helpers');
// s3 call
const AWS = require("aws-sdk");
const ID = process.env.AWS_KEY;
const SECRET = process.env.AWS_SECRET;
// The name of the bucket that you have created
const BUCKET_NAME = "videocall-record";
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});
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
require("dotenv").config();
// connect to mongo DB
mongoose
  .connect("mongodb://localhost/fuelueducation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => {
    console.error("Could not connected to MongoDB.");
  });
// const params = {
// app.post("/uploadRecording", function(req, res) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         if (err) responseHelpers.errorMessage(err, res, 400);
//         const params = {
//             Bucket: BUCKET_NAME,
//             Key: fields.videoFilename, // File name you want to save as in S3
//             Body: files.videoData.path,
//         };
//         // Uploading files to the bucket
//         s3.upload(params, function(err, data) {
//             if (err) responseHelpers.errorMessage(err, res, 400);
//             responseHelpers.successMessage(data, res, 200, `Call record uploaded successfully.Url: ${data.Location}`);
//         });
//     });
// });

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
