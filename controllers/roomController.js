const {
    v4: uuidv4
} = require("uuid");

const responseHelpers = require('../helpers/response.helpers');
exports.createRoomId = function(req, res) {
    res.redirect(`/users/room/${uuidv4()}`);
};

exports.uploadCallRecording = function(req, res) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'cat.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) responseHelpers.errorMessage(err, res, 400);
        responseHelpers.successMessage(result, res, 200, `File uploaded successfully. ${data.Location}`);
    });
};